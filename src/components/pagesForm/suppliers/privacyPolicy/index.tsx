'use client'

import { useCallback, useState } from 'react'
import { Controller, FieldValues, useForm } from "react-hook-form"
import { FormControlLabel, Switch, TextField } from "@mui/material"
import { toast } from 'react-toastify'
import { LoadingButton } from "@mui/lab"

import { IPrivacyPolicy } from "@/utils/interfaces"
import BASE_URL from '@/lib/axios'

import styles from './styles.module.css'
import InputImage from '@/components/inputImage'
import BASE_URL_V2 from '@/lib/axios_v2'

export default function PrivacyPolicy () {
  const [loading, setLoading] = useState(false)
  const [addForm, setAddForm] = useState(false)

  const { control, handleSubmit, formState: { errors, isSubmitted } } = useForm<IPrivacyPolicy | FieldValues>({
    defaultValues: async () => {
      return await BASE_URL_V2.get<IPrivacyPolicy>('/get-privacy-policy')
      .then(({data}) => {
        return ({...data})
      })
      .catch(() => setAddForm(true))
      .finally(() => {
        toast.dismiss()
      })
    },
  })

  const onSubmit = useCallback((data: IPrivacyPolicy | FieldValues) => {
    setLoading(true)

    if(addForm) {
      toast.info('Adicionando inforções, aguarde', {
        position: "top-right",
        pauseOnHover: false,
        autoClose: false,
      });

      BASE_URL_V2.post('/register-privacy-policy', data)
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

      BASE_URL_V2.put('/edit-privacy-policy', data)
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
          name="image"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Esse campo é necessario'
            }
          }}
          render={({field: { onChange, value }}) => (
            <InputImage
              errors={errors.image?.message?.toString()}
              src={value}
              isSubmitted={isSubmitted}
              onChange={({src}) => {
                onChange(src)
              }}
            />
          )}
        />

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
              rows={15}
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