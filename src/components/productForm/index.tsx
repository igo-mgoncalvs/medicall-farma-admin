'use client'

import { useForm, Controller } from 'react-hook-form'
import ImageIcon from '@mui/icons-material/Image';
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from "react-toastify";
import { Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

import styles from './styles.module.css'
import { ICategories } from '@/utils/interfacesNew';
import BASE_URL_V2 from '@/lib/axios_v2';

interface IProductFormOld {
  id: string 
  productsGroupsId: string 
  image: string 
  imageId: string 
  name: string 
  summary: string
  subTitle: string
  description: string 
  whatsapp: string 
  route: string 
  link: string
  index: number
}

interface ISizes {
  key: number
  src: string | ArrayBuffer | null
  alt: string
  isMain: boolean
  size: string
}

interface IProductForm {
  id: string
  categoriesId: string
  name: string
  isTop: boolean,
  link: string
  shortDescription: string
  description: string
  contactLink: string
  groupName: string
  keyWords: string[]
  sizes: ISizes[]
}

interface IPostImage {
  link: string
  file_name: string
}

export default function ProductForm ({ id }: { id?: string }) {
  const [categories, setCategories] = useState<ICategories[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasSizes, setHasSizes] = useState<boolean>(false)
  
  const [selectedCategory, setSelectedCategory] = useState<ICategories>()
  const [base64, setBase64] = useState<ISizes[]>([])
  const sizesLength = [0, 1, 2]
  
  const whatsappUrl = 'https://api.whatsapp.com/send/?phone=+5511930209934&text='

  useEffect(() => {
    BASE_URL_V2.get<ICategories[]>('/list-categories')
      .then(({ data }) => {
        setCategories(data)
      })
  }, [])

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { 
      errors,
      isSubmitted
    }} = useForm<IProductForm>({
    defaultValues: async () => {
      return await BASE_URL_V2.get<IProductForm>(`/find-product/${id}`)
        .then(({data}) => {
          categories.find((item) => item.id === data.categoriesId)
          
          return ({
          ...data, 
        })})
        .finally(() => {
          toast.dismiss()
        })
    }, 
  })

  const sizes = watch('sizes') || []
  const idEdit = watch('id')

  const navigation = useRouter()

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
    base64.map((item) => {
      setValue(`sizes.${item.key}.src`, item.src)
    })
  }, [base64])

  const handleInputFile = useCallback((event: ChangeEvent<HTMLInputElement>, key: number) => {
    const { files } = event.currentTarget

    if(!files) {
      return ""
    }

    const selectedFile = files[0]

    const reader = new FileReader()

    reader.onloadend = () => {
      setBase64([
        ...base64,
        {
          key,
          src: reader.result,
          alt: '',
          isMain: false,
          size: 'teste'
        }
      ])
    }

    reader.readAsDataURL(selectedFile)

    if(key === 0){
      setValue('sizes.0.isMain', true)
    } else {
      setValue(`sizes.${key}.isMain`, false)
    }

  }, [setValue, base64])
  
  const onSubmit = useCallback((data: IProductForm) => {

    const sizesEdit = data.sizes.filter((s) => s.src)

    if(!id) {
      BASE_URL_V2.post('/register-product', {
        ...data,
        groupName: selectedCategory?.Gruop.groupName,
        contactLink: `${whatsappUrl}${encodeURI(data.contactLink)}`,
        link: `${selectedCategory?.categoryLink}/${data.name.replace(' ', '-')}`,
        isTop: false,
        sizes: sizesEdit
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
      BASE_URL_V2.put(`/edit-product/${idEdit}`, {
        ...data,
        groupName: selectedCategory?.Gruop.groupName || data.groupName,
        contactLink: `${whatsappUrl}${encodeURI(data.contactLink)}`,
        link: `${categories.find((item) => item.id === data.categoriesId)?.categoryLink}/${data.name.replace(' ', '-')}`,
        sizes: sizesEdit
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
  }, [idEdit, id, selectedCategory, categories])

  const handleCheckbox = useCallback(() => {
    setHasSizes(!hasSizes)
  }, [hasSizes])

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.forms_collumns}>
        {sizesLength.map((size, key) => (
          <div
            className={styles.sizesContainer}
          >
            <FormControl
              error={(!sizes[size]?.src && size === 0) && isSubmitted}
            >
              <label
                htmlFor={`image-${size}`}
                className={`${styles.imageLabel} ${(!sizes[size]?.src && size === 0)  && styles.imageError}`}
              >
                {(sizes.length > 0 && sizes[size]?.src) ? (
                  <Image
                    priority
                    width={100}
                    height={100}
                    src={sizes[size]?.src?.toString() || ''}
                    alt="Logo da Imgor branco"
                  />
                ): (
                  <div
                    className={`${styles.icon_container} ${(!sizes[size]?.src && size === 0)  && styles.icon_container_error}`}
                  >
                    <ImageIcon
                      className={`${styles.icon} ${(!sizes[size]?.src && size === 0)  && styles.icon_error}`}
                    />
                    {`Selecione a imagem do produto${key === 0 ? ' principal': ''}`}
                  </div>
                )}
              </label>
              
              <input
                type="file"
                id={`image-${size}`}
                accept="image/*"
                className={styles.inputFile}
                onChange={(event) => handleInputFile(event, key)}
              />

              {errors.sizes && (
                <FormHelperText>
                  {errors.sizes[size]?.size?.message}
                </FormHelperText>
              )}
            </FormControl>

            {size === 0 && (
              <FormControlLabel control={<Checkbox onClick={handleCheckbox} />} label="Possui tamanhos?" />
            )}

            <Controller
              name={`sizes.${size}.size`}
              control={control}
              rules={{
                required: {
                  value: hasSizes && !!sizes[size]?.src,
                  message: 'Esse campo é necessario'
                }
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label={`Digite o tamanho do produto ${key === 0 ? 'principal': ''}`}
                  value={value}
                  error={!!error}
                  helperText={error?.message}
                  aria-errormessage='teste'
                  defaultValue={id ? ' ': ''}
                  onChange={(e) => {
                    onChange(e)
                    setValue(`sizes.${size}.alt`, e.target.value)
                  }}
                />
              )}
            />
          </div>
        ))}
      </div>


      <div
        className={styles.forms_collumns}
      >
        <Controller
          name='categoriesId'
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
              <InputLabel id="demo-simple-select-helper-label">Selecione a categoria</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Selecione a categoria"
                onChange={(event) => {
                  onChange(event)
                  setSelectedCategory(categories.find((item) => item.id === event.target.value))
                }}
                value={categories?.length > 0 ? value : ''}
              >
                <MenuItem
                  value={''}
                >
                  Selecione a categoria
                </MenuItem>
                {categories?.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                  >
                    {`${item.Gruop.groupName} | ${item.categoryName}`}
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
                setValue("contactLink", `Olá gostaria de informações sobre o produto ${e.target.value || ''}`)
                setValue("link", `${selectedCategory?.categoryLink}/${e.target.value.replace(' ', '-')}`)
                clearErrors('contactLink')
              }}
            />
          )}
        />

        <Controller
          name='keyWords'
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Esse campo é necessario'
            }
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label='Palavras-chaves separadas por ;'
              value={value}
              error={!!error}
              helperText={error?.message}
              aria-errormessage='teste'
              defaultValue={id ? ' ': ''}
              onChange={onChange}
            />
          )}
        />

        <Controller
          name='shortDescription'
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Esse campo é necessario'
            }
          }}
          render={({ field: { onChange, value }, fieldState: { error }}) => (
            <TextField
              label='Subtítulo'
              value={value}
              error={!!error}
              helperText={error?.message}
              defaultValue={id ? ' ': ''}
              onChange={(e) => {
                onChange(e)
              }}
            />
          )}
        />

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
          name='contactLink'
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
              value={decodeURI(value?.replace(whatsappUrl, '') || '')}
              defaultValue={' '}
              error={!!error}
              helperText={error?.message}
              multiline
              onChange={(event) => onChange(event.target.value.replace(whatsappUrl, ''))}
            />
          )}
        />

        <LoadingButton
          variant='contained'
          className={styles.button}
          loading={loading}
          type='submit'
        >
          Salvar
        </LoadingButton>
      </div>
    </form>
  )
}