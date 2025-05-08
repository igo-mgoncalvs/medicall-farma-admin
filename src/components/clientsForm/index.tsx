'use client'

import { useCallback, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { TextField } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { IClient } from "@/utils/interfaces"

import InputImage from "../inputImage"

import styles from './styles.module.css'
import BASE_URL_V2 from "@/lib/axios_v2";

export default function ClientsForm ({ id }: { id?: string }) {
  const [loading, setLoading] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: {
      isSubmitted,
      errors
    }} = useForm<IClient>({
      defaultValues: async () => {
        return await BASE_URL_V2.get<IClient>(`/find-client/${id}`)
          .then(({data}) => ({
            ...data,
          }))
          .finally(() => {
            toast.dismiss()
          })
      }, 
    })


  const navigation = useRouter()

  const onSubmit = useCallback((data: IClient) => {
    setLoading(true)

    if(!id) {
      BASE_URL_V2.post('/register-client', {
          ...data,
      })
        .then(() => {
          toast.dismiss()
          toast.success('Fornecedor adicionado com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
          navigation.back()
        })
        .catch(() => {
          toast.dismiss()
          toast.error('Erro ao adicionar o fornecedor', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      BASE_URL_V2.put(`/edit-client/${id}`, {
          ...data,
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
  }, [id])

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="image"
        control={control}
        render={({field: {value, onChange}}) => (
          <InputImage
            src={value}
            isSubmitted={isSubmitted}
            errors={errors.image?.message}
            onChange={({src}) => {
              onChange(src)
            }}
          />
        )}
      />

      <Controller
        name="name"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Esse campo é necessario'
          }
        }}
        render={({field: { onChange, value }, fieldState: { error }}) => (
          <TextField
            value={value}
            error={!!error}
            helperText={error?.message}
            defaultValue={id ? ' ': ''}
            label='Nome do cliente'
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
        Salvar
      </LoadingButton>
    </form>
  )
}