'use client'

import { useCallback, useState, useEffect, ChangeEvent } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import type { DropResult } from '@hello-pangea/dnd';
import LoadingButton from '@mui/lab/LoadingButton';
import Image from 'next/image';
import { IAboutUs_Banners, IPostImage } from '@/utils/interfaces';
import DeleteIcon from '@mui/icons-material/Delete';

import BASE_URL from '@/lib/axios';

import styles from './styles.module.css'
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';

export default function AboutUsBannersSpace () {
  const [list, setList] = useState<IAboutUs_Banners[]>([])
  const [disabledSave, setDisabledSave] = useState<boolean>(false)
  const [disabledAdd, setDisabledAdd] = useState<boolean>(false)
  const [disabledRemove, setDisabledRemove] = useState<boolean>(false)
  const [orderChange, setOrderChange] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [deleteState, setDeleteState] = useState<boolean>(false)

  const imageController = useForm()

  const getData = () => {
    BASE_URL.get<IAboutUs_Banners[]>('/about-us-space-banners')
      .then(({data}) => {
        setList(data)
      })
  }

  useEffect(() => {
    getData()
  }, [])


  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = useCallback((result: DropResult) => {
    if(!result.destination) {
      return
    } else if (result.source.index === result.destination?.index) {
      return
    } else {
      const items = reorder(list, result.source.index, result.destination.index)
  
      setList(items)
      setOrderChange(false)
      setDisabledAdd(true)
      setDisabledRemove(true)
    }

  }, [list])

  const handleDelete = useCallback(() => {
    setDeleteState(!deleteState)
    setDisabledSave(!disabledSave)
    setDisabledAdd(!disabledAdd)
  }, [deleteState, disabledSave, disabledAdd])

  const handleInputFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget
    setDisabledAdd(true)
    setDisabledRemove(true)
    
    toast.info('Publicando imagem, aguarde', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    if(!files) {
      return ""
    }

    const selectedFile = files[0]

    const data = new FormData()

    data.append('file', selectedFile)

    const uploadImage = await BASE_URL.post<IPostImage>('/upload-image', data)
      .then(({ data }) => {
        return ({
        image: data.link,
        imageId: data.file_name
      })})
      .catch((error) => {
        toast.dismiss()
        toast.error('Erro ao publicar a imagem', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
    
    BASE_URL.post('/add-about-us-space-banners', [uploadImage])
      .then(async () => {
        getData()

        toast.dismiss()
        toast.success('Imagem publicada com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
      .catch((error) => {
        toast.dismiss()
        toast.error('Erro ao publicar a imagem', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
      .finally(() => {
        imageController.resetField("imageFile")
        setDisabledAdd(false)
        setDisabledRemove(false)
      })
  }

  const handleDeleteImage = (image: IAboutUs_Banners) => {
    toast.info('Deletando imagem, aguarde', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    BASE_URL.post(`/about-us-delete-space-banner/${image.imageId}`, {
      imageId: image.imageId
    })
      .then(async () => {
        toast.dismiss()
        toast.success('Imagem excluida com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
      .catch((error) => {
        toast.dismiss()
        toast.error('Erro ao excluir a imagem', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
      .finally(() => {
        getData()
      })
  }

  const handleUpdateImageList = useCallback(() => {
    setLoading(true)
    toast.info('Deletando imagem, aguarde', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    BASE_URL.put('/about-us-update-space-banners', list)
      .then(() => {
        toast.dismiss()
        toast.success('Imagens atualizadas com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
      .catch(() => {
        toast.error('Erro ao atualizar as imagens', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
      .finally(() => {
        setDisabledAdd(false)
        setDisabledRemove(false)
        setOrderChange(true)
        setLoading(false)
      })
  }, [list])

  return (
    <div className={styles.container}>
      <div className={styles.addImageContainer}>
        <div className={styles.buttonsContainer}>

          <label
            htmlFor='inputImageSpace'
            className={`${styles.inputLabel} ${disabledAdd && styles.inputLabel_disabled}`}
          >
            Adicone uma imagem
          </label>
          
          <Controller
            name='imageFile'
            control={imageController.control}
            render={({field: { onChange, value }}) => (
              <input
                type="file"
                id='inputImageSpace'
                accept="image/*"
                disabled={disabledAdd}
                value={value || ''}
                className={styles.inputFile}
                onChange={(e) => {
                  onChange(e)
                  handleInputFile(e)
                }}
              />
            )}
          />

          <LoadingButton
            variant='contained'
            loading={loading}
            disabled={disabledRemove || list.length === 0}
            className={styles.buttonRemove}
            color={deleteState ? 'info' : 'error'}
            type='submit'
            onClick={handleDelete}
          >
            {!deleteState && <DeleteIcon fontSize="small" />}
           {deleteState ? 'Habilitar Edição' : 'Remover Imagens'}
          </LoadingButton>
        </div>
        
        {list.length > 2 && (
          <LoadingButton
            variant='contained'
            className={styles.button}
            loading={loading}
            disabled={orderChange || disabledSave}
            type='submit'
            onClick={handleUpdateImageList}
          >
            Salvar
          </LoadingButton>
        )}
      </div>
      
      {list.length > 0 && (
        <div className={styles.container_images}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="banners"
              type="list"
              direction="horizontal"
            >
              {(provider) => (
                <div
                  style={{display: 'flex', gap: '10px'}}
                  ref={provider.innerRef}
                  {...provider.droppableProps}
                >
                  {list.map((item, index) => (
                    <Draggable
                      key={item.id}
                      index={index}
                      draggableId={`banner-${item.id}`}
                    >
                      {(provider) => (
                        <div                       
                          ref={provider.innerRef}
                          {...provider.dragHandleProps}
                          {...provider.draggableProps}
                          onClick={() => handleDeleteImage(item)}
                        >
                          <div
                            style={{
                              backgroundImage: `url(${item.image})`,
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                              width: '500px',
                              height: '200px'
                            }}
                            className={`${deleteState && styles.image_delete_active}`}
                          />
                          {deleteState && (
                            <DeleteIcon
                              fontSize="large"
                              className={styles.deleteIcon}
                            />
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provider.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </div>
  )
}