'use client'

import { useState, useCallback } from 'react'
import { IGroup } from "@/utils/interfaces"
import { TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import BASE_URL from '@/lib/axios';

import styles from './styles.module.css'

export default function GroupForm ({ id }: { id?: string }) {
  const [loading, setLoading] = useState<boolean>(false)

  const { control, handleSubmit } = useForm<IGroup>({
    defaultValues: async () => {
      return await BASE_URL.get<IGroup>(`/find-group/${id}`)
        .then(({data}) => ({
          ...data, 
        }))
        .finally(() => {
          toast.dismiss()
        })
    }, 
  })

  const navigation = useRouter()

  const onSubmit = useCallback((data: IGroup) => {
    setLoading(true)

    if(!id) {
      BASE_URL.post('/add-group', data)
        .then(() => {
          toast.dismiss()
          toast.success('Imagem publicada com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
          navigation.back()
        })
      .catch(() => {
        toast.dismiss()
        toast.error('Erro ao publicar a imagem', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
      .finally(() => {
        setLoading(false)
      })
    } else {
      BASE_URL.put(`/edit-group/${id}`, data)
        .then(() => {
          toast.dismiss()
          toast.success('Grupo editado com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
          navigation.back()
        })
      .catch(() => {
        toast.dismiss()
        toast.error('Erro ao editar grupo', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
      .finally(() => {
        setLoading(false)
      })

    }
  }, [id])

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <Controller
          control={control}
          name="group_name"
          rules={{
            required: {
              value: true,
              message: 'Esse campo é necessario'
            }
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label='Nome do cliente'
              onChange={onChange}
              value={value}
              error={!!error}
              helperText={error?.message}
              defaultValue={id ? ' ': ''}
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
      </form>
    </div>
  )
}