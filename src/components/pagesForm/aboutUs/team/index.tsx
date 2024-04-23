'use client'

import { useCallback, useState } from 'react'
import { Controller, FieldValues, useForm } from "react-hook-form"
import { TextField } from "@mui/material"
import { toast } from 'react-toastify'
import { LoadingButton } from "@mui/lab"

import { IAboutUs_Team } from "@/utils/interfaces"
import BASE_URL from '@/lib/axios'

import styles from './styles.module.css'
import InputImage from '@/components/inputImage'

export default function AboutUsTeam () {
  const [loading, setLoading] = useState(false)
  const [addForm, setAddForm] = useState(false)

  const { control, handleSubmit, watch, setValue, formState: { errors, isSubmitted } } = useForm<IAboutUs_Team | FieldValues>({
    defaultValues: async () => {
      return await BASE_URL.get<IAboutUs_Team>('/about-us-team')
      .then(({data}) => ({
        ...data, 
      }))
      .catch(() => setAddForm(true))
      .finally(() => {
        toast.dismiss()
      })
    },
  })

  const imageUrl = watch('image')
  const imageId = watch('imageId')

  const onSubmit = useCallback((data: IAboutUs_Team | FieldValues) => {
    setLoading(true)

    if(addForm) {
      toast.info('Adicionando inforções, aguarde', {
        position: "top-right",
        pauseOnHover: false,
        autoClose: false,
      });

      BASE_URL.post('/add-about-us-team', data)
        .then(() => {
          toast.dismiss()
          toast.success('Adicionado com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
        })
        .catch(() => {
          toast.dismiss()
          toast.error('Erro ao criar os campos', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      toast.info('Editando inforções, aguarde', {
        position: "top-right",
        pauseOnHover: false,
        autoClose: false,
      });

      BASE_URL.put('/edit-about-us-team', data)
        .then(() => {
          toast.dismiss()
          toast.success('Editado com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
        })
        .catch(() => {
          toast.dismiss()
          toast.error('Erro ao editar os campos', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [addForm])

  return (
    <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>
        <div className={styles.form_row}>
          <Controller
            name="title"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Esse campo é necessario'
              }
            }}
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
            name="text"
            control={control}
            render={({field: { onChange, value }, fieldState: { error }}) => (
              <TextField
                label='Descrição'
                onChange={onChange}
                value={value}
                rows={6}
                multiline
                error={!!error}
                className={styles.inputText}
                helperText={error?.message}
                defaultValue={' '}
              />
            )}
          />
        </div>

        <div className={styles.inputImage}>
          <InputImage
            imageUrl={imageUrl}
            imageId={imageId}
            isSubmitted={isSubmitted}
            setValue={({link, file_name}) => {
              setValue('image', link)
              setValue('imageId', file_name)
            }}    
          />
        </div>
      </div>

      <LoadingButton
        variant='contained'
        loading={loading}
        type='submit'
        className={styles.button}
      >
        Enviar
      </LoadingButton>
    </form>
  )
}