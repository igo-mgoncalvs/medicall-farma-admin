'use client'

import { useCallback, useState } from 'react'
import { Controller, FieldValues, useForm } from "react-hook-form"
import { TextField } from "@mui/material"
import { toast } from 'react-toastify'
import { LoadingButton } from "@mui/lab"

import { IHistory } from "@/utils/interfaces"
import BASE_URL from '@/lib/axios'

import styles from './styles.module.css'

export default function OurHistory () {
  const [loading, setLoading] = useState(false)
  const [addForm, setAddForm] = useState(false)

  const { control, handleSubmit } = useForm<IHistory | FieldValues>({
    defaultValues: async () => {
      return await BASE_URL.get<IHistory>('/about-us-history')
      .then(({data}) => ({
        ...data, 
      }))
      .catch(() => setAddForm(true))
      .finally(() => {
        toast.dismiss()
      })
    },
  })

  const onSubmit = useCallback((data: IHistory | FieldValues) => {
    if(addForm) {
      toast.info('Adicionando inforções, aguarde', {
        position: "top-right",
        pauseOnHover: false,
        autoClose: false,
      });

      BASE_URL.post('/add-about-us-history', data)
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
    } else {
      toast.info('Editando inforções, aguarde', {
        position: "top-right",
        pauseOnHover: false,
        autoClose: false,
      });

      BASE_URL.put('/edit-about-us-history', data)
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
    }
  }, [addForm])

  return (
    <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>
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