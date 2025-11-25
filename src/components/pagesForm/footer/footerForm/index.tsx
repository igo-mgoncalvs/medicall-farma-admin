'use client'

import { useCallback, useState } from 'react'
import { Controller, FieldValues, useForm } from "react-hook-form"
import { TextField } from "@mui/material"
import { toast } from 'react-toastify'
import { LoadingButton } from "@mui/lab"

import styles from './styles.module.css'
import BASE_URL_V2 from '@/lib/axios_v2'

export interface IFooter {
  phoneNumber: string
  sacEmail: string
  sacPhone: string
  description: string
}

export default function FooterForm () {
  const [loading, setLoading] = useState(false)
  const [addForm, setAddForm] = useState(false)

  const { control, handleSubmit } = useForm<IFooter | FieldValues>({
    defaultValues: async () => {
      return await BASE_URL_V2.get<IFooter>('/get-footer')
      .then(({data}) => {
        return ({...data})
      })
      .catch(() => setAddForm(true))
      .finally(() => {
        toast.dismiss()
      })
    },
  })

  const onSubmit = useCallback((data: IFooter | FieldValues) => {
    setLoading(true)

    if(addForm) {
      toast.info('Adicionando inforções, aguarde', {
        position: "top-right",
        pauseOnHover: false,
        autoClose: false,
      });

      BASE_URL_V2.post('/register-footer', data)
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

      BASE_URL_V2.put('/edit-footer', data)
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
        <Controller
          name="sacEmail"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Esse campo é necessario'
            }
          }}
          render={({field: { onChange, value }, fieldState: { error }}) => (
            <TextField
              label='E-mail SAC'
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
          name="sacPhone"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Esse campo é necessario'
            }
          }}
          render={({field: { onChange, value }, fieldState: { error }}) => (
            <TextField
              label='Número SAC'
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
          name="phoneNumber"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Esse campo é necessario'
            }
          }}
          render={({field: { onChange, value }, fieldState: { error }}) => (
            <TextField
              label='Número de Telefone'
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
          name="description"
          control={control}
          render={({field: { onChange, value }, fieldState: { error }}) => (
            <TextField
              label='Descrição'
              onChange={onChange}
              value={value}
              rows={5}
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
        Salvar
      </LoadingButton>
    </form>
  )
}