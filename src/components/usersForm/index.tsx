'use client'

import { useState, useCallback } from 'react'
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'

import { IUsers } from "@/utils/interfaces";
import BASE_URL from "@/lib/axios";

import styles from './styles.module.css'

interface IProps {
  id?: string,
}

export default function UsersForm ({ id }: IProps) {
  const [loading, setLoadig] = useState<boolean>(false)

  const { control, handleSubmit } = useForm<IUsers>({
    defaultValues: async () => {
      return await BASE_URL.get<IUsers>(`/find-user/${id}`)
        .then(({data}) => data)
        .finally(() => {
          toast.dismiss()
        })
    }, 
  })

  const navigation = useRouter()

  const onSubmit = useCallback((data: IUsers) => {
    setLoadig(true)

    if(id) {
      BASE_URL.put(`/edit-user/${id}`, data)
        .then(() => {
          toast.dismiss()
          toast.success('Usuário editado com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
          navigation.back()
        })
        .catch(() => {
          toast.dismiss()
          toast.error('Erro ao ediar o usuário', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
        })
        .finally(() => {
          setLoadig(false)
        })
    } else {
      BASE_URL.post('/new-user', data)
        .then(() => {
          toast.dismiss()
          toast.success('Usuário adicionado com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
          navigation.back()
        })
        .catch(() => {
          toast.dismiss()
          toast.error('Erro ao adicionar o usuário', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
        })
        .finally(() => {
          setLoadig(false)
        })
    }
  }, [id])

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name='userName'
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label='Nome do usuário'
            value={value}
            error={!!error}
            helperText={error?.message}
            onChange={onChange}
            defaultValue={id ? ' ': ''}
          />
        )}
      />

      <Controller
        name='email'
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label='E-mail'
            value={value}
            error={!!error}
            helperText={error?.message}
            onChange={onChange}
            defaultValue={id ? ' ': ''}
          />
        )}
      />

      <Controller
        name='password'
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label={id ? 'Redefinir senha' : 'Senha'}
            value={value}
            error={!!error}
            helperText={error?.message}
            onChange={onChange}
          />
        )}
      />

      <LoadingButton
        variant="contained"
        className={styles.button}
        type="submit"
        loading={loading}
      >
        Enviar
      </LoadingButton>
    </form>
  )
}