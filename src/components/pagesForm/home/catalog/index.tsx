'use client'

import { useCallback, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form"
import { Checkbox, FormControlLabel, Switch, TextField } from "@mui/material"
import { toast } from "react-toastify"
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from "next/navigation";

import InputImage from "@/components/inputImage"
import BASE_URL from "@/lib/axios"

import styles from './styles.module.css'

interface IHomeCatalogForm {
  title: string
  text: string
  button_text: string
  button_link: string
  image: string
  imageId: string
}

export default function CatalogForm () {
  const [loading, setLoading] = useState<boolean>(false)
  const [editForm, setEditForm] = useState<boolean>(true)
  
  const { control, watch, handleSubmit, setValue, formState: { errors, isSubmitted } } = useForm<IHomeCatalogForm | FieldValues>({
    defaultValues: async () => {
      return await BASE_URL.get<IHomeCatalogForm>('/find-home-catalog')
      .then(({data}) => ({
        ...data, 
      }))
      .catch(() => setEditForm(false))
      .finally(() => {
        toast.dismiss()
      })
    },
  })
  
  const imageId = watch('imageId')
  const image = watch('image')
  const link = watch('button_link')
  
  const navigation = useRouter()

  const onSubmit = useCallback((data: IHomeCatalogForm | FieldValues) => {
    setLoading(true)

    if(editForm) {
      BASE_URL.put('/edit-home-catalog', {
        ...data,
      })
        .then(() => {
          toast.dismiss()
          toast.success('Campo editado com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
          navigation.refresh()
        })
        .catch(() => {
          toast.dismiss()
          toast.error('Erro ao editar o campo', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
        })
        .finally(() => {
          setLoading(false)
        })
      } else {
        BASE_URL.post('/add-home-catalog', {
          ...data,
        })
          .then(() => {
            toast.dismiss()
            toast.success('Campo editado com sucesso!', {
              position: "top-right",
              pauseOnHover: false,
              autoClose: 5000
            });
            navigation.refresh()
          })
          .catch(() => {
            toast.dismiss()
            toast.error('Erro ao editar o campo', {
              position: "top-right",
              pauseOnHover: false,
              autoClose: 5000
            });
          })
          .finally(() => {
            setLoading(false)
          })
    }
  }, [editForm])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={styles.switch}
      >
        <Controller
          control={control}
          name="enable"
          render={({field: { onChange, value }}) => (
            <FormControlLabel
              label={`${value ? 'Desabilitar' : 'Habilitar' } sessão`}
              control={
                <Switch
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                />
              } 
            />
          )}
        />
      </div>

      <div className={styles.form}>
        <div
          className={styles.inputsText_container}
        >
          <div className={styles.spaceHorizontal}>
            <Controller
              control={control}
              name='title'
              render={({field: { onChange, value }, fieldState: { error }}) => (
                <TextField
                  label='Título'
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  className={styles.inputText}
                  helperText={error?.message}
                  defaultValue={' '}
                />
              )}
            />

            <Controller
              control={control}
              name="button_text"
              render={({field: { onChange, value }, fieldState: { error }}) => (
                <TextField
                  label='Texto botão'
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  className={styles.inputText}
                  helperText={error?.message}
                  defaultValue={' '}
                />
              )}
            />
          </div>
          
          <div className={styles.spaceHorizontal}>
            <Controller
              control={control}
              name="text"
              render={({field: { onChange, value }, fieldState: { error }}) => (
                <TextField
                  label='Descrição'
                  onChange={onChange}
                  value={value}
                  multiline
                  rows={5}
                  error={!!error}
                  className={styles.inputText}
                  helperText={error?.message}
                  defaultValue={' '}
                />
              )}     
            />
            
            <div
              className={styles.inputText}
            >
              <Controller
                control={control}
                name="button_link"
                render={({field: { onChange, value }, fieldState: { error }}) => (
                  <TextField
                    label='Link do botão'
                    onChange={onChange}
                    value={value}
                    error={!!error}
                    className={styles.inputText}
                    helperText={error?.message}
                    defaultValue={' '}
                  />
                )}
              />
              <FormControlLabel
                label="Link interno do site"
                control={
                  <Checkbox
                    checked={!link?.includes('http')}
                  />
                }
              />
            </div>
          </div>
        </div>

        <InputImage
          errors={errors.image?.message?.toString()}
          imageId={imageId}
          id="catalogImageId"
          imageUrl={image}
          isSubmitted={isSubmitted}
          setValue={({link, file_name}) => {
            setValue('image', link)
            setValue('imageId', file_name)
          }}
        />
      </div>

      <LoadingButton
        variant='contained'
        loading={loading}
        type='submit'
      >
        Enviar
      </LoadingButton>
    </form>
  )
}