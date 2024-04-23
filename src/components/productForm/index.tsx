'use client'

import { useForm, Controller } from 'react-hook-form'
import ImageIcon from '@mui/icons-material/Image';
import styles from './styles.module.css'
import LoadingButton from '@mui/lab/LoadingButton';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import BASE_URL from '@/lib/axios'
import { IGroup } from '@/utils/interfaces'
import Image from 'next/image'
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';

interface IProductForm {
  id: string 
  productsGroupsId: string 
  image: string 
  imageId: string 
  name: string 
  summary: string 
  description: string 
  whatsapp: string 
  route: string 
  link: string 
}

interface IPostImage {
  link: string
  file_name: string
}

export default function ProductForm ({ id }: { id: string }) {
  const [groups, setGroups] = useState<IGroup[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const whatsappUrl = 'https://api.whatsapp.com/send/?phone=+5511930209934&text='

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { 
      errors,
      isSubmitted
    }} = useForm<IProductForm>({
    defaultValues: async () => {
      return await BASE_URL.get<IProductForm>(`/find-product/${id}`)
        .then(({data}) => ({
          ...data, 
          whatsapp: decodeURI(data?.whatsapp.replace(whatsappUrl, '')),
        }))
        .finally(() => {
          toast.dismiss()
        })
    }, 
  })

  const imageUrl = watch('image')
  const imageId = watch('imageId')
  const idEdit = watch('id')

  const errorMessageImage = errors.image && isSubmitted

  const navigation = useRouter()

  useEffect(() => {
    BASE_URL.get<IGroup[]>('/groups')
      .then(({ data }) => {
        setGroups(data)
      })

  }, [])

  useEffect(() => {
    if(id) {
      toast.info('Carregando as informações', {
        position: "top-right",
        pauseOnHover: false,
        autoClose: false,
      });
    }
  }, [id])

  useEffect(() => {
    if(!imageUrl) {
      setError('image', {
        message: 'Esse campo é necessario'
      })
    } else {
      clearErrors('image')
    }
  }, [imageUrl])

  const handleInputFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget

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

    BASE_URL.post<IPostImage>('/upload-image', data)
      .then(({data: { link, file_name }}) => {
        toast.dismiss()
        toast.success('Imagem publicada com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
        setValue('image', link)
        setValue('imageId', file_name)
      })
      .catch((error) => {
        toast.dismiss()
        toast.error('Erro ao publicar a imagem', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })

    if(imageUrl) {
      BASE_URL.delete<IPostImage>(`/delete-image/${imageId}`)
    }

  }, [imageUrl, setValue])

  const onSubmit = useCallback((data: IProductForm) => {
    setLoading(true)

    if(!id) {
      BASE_URL.post('/add-product', {
          ...data,
      })
        .then(() => {
          toast.dismiss()
          toast.success('Produto adicionado com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
          navigation.back()
        })
        .catch(() => {
          toast.dismiss()
          toast.error('Erro ao adicionar o produto', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      BASE_URL.put(`/edit-product/${idEdit}`, {
          ...data,
          route: `${data.name.replace(' ', '-')}`,
          whatsapp: `${whatsappUrl}${encodeURI(data.whatsapp)}`
      })
        .then(() => {
          toast.dismiss()
          toast.success('Produto editado com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
          navigation.back()
        })
        .catch(() => {
          toast.dismiss()
          toast.error('Erro ao editar o produto', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [idEdit, id])

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.forms_collumns}>
        <FormControl
          error={errors.image && isSubmitted}
        >
          <label
            htmlFor="video"
            className={`${styles.imageLabel} ${errorMessageImage && styles.imageError}`}
          >
            {imageUrl ? (
              <Image
                priority
                width={100}
                height={100}
                src={imageUrl}
                alt="Logo da Imgor branco"
              />
            ): (
              <div
                className={`${styles.icon_container} ${errorMessageImage && styles.icon_container_error}`}
              >
                <ImageIcon
                  className={`${styles.icon} ${errorMessageImage && styles.icon_error}`}
                />
                Selecione a imagem do produto
              </div>
            )}
          </label>
          
          <input
            type="file"
            id='video'
            accept="image/*"
            className={styles.inputFile}
            onChange={handleInputFile}
          />

          {errorMessageImage && (
            <FormHelperText>
              {errors.image?.message}
            </FormHelperText>
          )}
        </FormControl>

        <Controller
          name='productsGroupsId'
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Esse campo é necessario'
            }
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl
              error={!!error}
            >
              <InputLabel id="demo-simple-select-helper-label">Selecione o grupo</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Selecione o grupo"
                onChange={onChange}
                value={groups?.length > 0 ? value : ''}
              >
                <MenuItem
                  value={''}
                >
                  Selecione o grupo
                </MenuItem>
                {groups?.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                  >
                    {item.group_name}
                  </MenuItem>
                ))}
              </Select>
              {error && (
                <FormHelperText>
                  {error?.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          name='name'
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Esse campo é necessario'
            }
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label='Nome do produto'
                value={value}
                error={!!error}
                helperText={error?.message}
                aria-errormessage='teste'
                defaultValue={id ? ' ': ''}
                onChange={(e) => {
                  onChange(e)
                  setValue("whatsapp", `Olá gostaria de informações sobre o produto ${e.target.value || ''}`)
                  setValue("route", e.target.value.replace(' ', '-'))
                  clearErrors('whatsapp')
                }}
              />
          )}
        />

        <Controller
          name='summary'
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Esse campo é necessario'
            }
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label='Resumo'
              rows={3}
              value={value}
              error={!!error}
              helperText={error?.message}
              defaultValue={id ? ' ': ''}
              multiline
              onChange={onChange}
            />
          )}
        />
      </div>

      <div
        className={styles.forms_collumns}
      >
        <Controller
          name='description'
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Esse campo é necessario'
            }
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label='Descrição'
              rows={4}
              multiline
              error={!!error}
              helperText={error?.message}
              value={value}
              defaultValue={id ? ' ': ''}
              onChange={onChange}
            />
          )}
        />

        <Controller
          name='whatsapp'
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Esse campo é necessario'
            }
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label='Digite a mensagem de contato pelo WhatsApp'
              rows={4}
              value={value}
              defaultValue={' '}
              error={!!error}
              helperText={error?.message}
              multiline
              onChange={onChange}
            />
          )}
        />

        <Controller
          name='link'
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Esse campo é necessario'
            }
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              value={value}
              error={!!error}
              helperText={error?.message}
              defaultValue={id ? ' ': ''}
              label='Link do catalogo'
              onChange={onChange}
            />
          )}
        />

        <LoadingButton
          variant='contained'
          className={styles.button}
          loading={loading}
          type='submit'
        >
          Enviar
        </LoadingButton>
      </div>
    </form>
  )
}