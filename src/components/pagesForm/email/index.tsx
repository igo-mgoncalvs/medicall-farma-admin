'use client'

import { useState, useCallback } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { IContact, IContactEmail } from '@/utils/interfaces'
import { TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { toast } from 'react-toastify'

import BASE_URL from '@/lib/axios'

import styles from './styles.module.css'
import BASE_URL_V2 from '@/lib/axios_v2'

export default function ContactEmailForm () {
  const [loading, setLoading] = useState<boolean>(false)
  const [addForm, setAddForm] = useState<boolean>(false)

  const { control, handleSubmit } = useForm<IContactEmail | FieldValues>({
    defaultValues: async () => {
      return await BASE_URL_V2.get<IContactEmail>('/get-contact-email')
      .then(({data}) => data)
      .catch(() => setAddForm(true))
      .finally(() => {
        toast.dismiss()
      })
    },
  })

  const onSubmit = useCallback((data: IContactEmail | FieldValues) => {
    setLoading(true)
    toast.info('Adicionando inforções, aguarde', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });
    if(addForm) {
      BASE_URL_V2.post('/register-contact-email', data)
        .then(() => {
          toast.dismiss()
          toast.success('Adicionado com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
          setAddForm(false)
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
        BASE_URL_V2.put(`/edit-contact-email/${data.id}`, data)
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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Esse campo é necessario'
          }
        }}
        render={({field: { onChange, value }, fieldState: { error }}) => (
          <TextField
            label='E-mail de contato'
            onChange={onChange}
            value={value}
            error={!!error}
            className={styles.inputText}
            helperText={error?.message}
            defaultValue={' '}
          />
        )}
      />

      <LoadingButton
        variant='contained'
        color='info'
        type='submit'
        loading={loading}
        className={styles.button}
      >
        Salvar
      </LoadingButton>
    </form>
  )
}