'use client'

import { useCallback, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { TextField } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { ISupplier } from "@/utils/interfaces"
import BASE_URL from "@/lib/axios";

import InputImage from "../inputImage"

import styles from './styles.module.css'

export default function SupplierForm ({ id }: { id?: string }) {
  const [loading, setLoading] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: {
      isSubmitted,
      errors
    }} = useForm<ISupplier>({
      defaultValues: async () => {
        return await BASE_URL.get<ISupplier>(`/find-suppliers/${id}`)
          .then(({data}) => ({
            ...data,
          }))
          .finally(() => {
            toast.dismiss()
          })
      }, 
    })

  const imageUrl = watch('image')
  const imageId = watch('imageId')

  const navigation = useRouter()

  useEffect(() => {
    if(!imageUrl) {
      setError('image', {
        message: 'Esse campo é necessario'
      })
    } else {
      clearErrors('image')
    }
  }, [imageUrl])

  const onSubmit = useCallback((data: ISupplier) => {
    setLoading(true)

    if(!id) {
      BASE_URL.post('/add-suppliers', {
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
      BASE_URL.put(`/edit-suppliers/${id}`, {
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
      <InputImage
        imageUrl={imageUrl}
        isSubmitted={isSubmitted}
        errors={errors.image?.message}
        imageId={imageId}
        setValue={({link, file_name}) => {
          setValue('image', link)
          setValue('imageId', file_name)
        }}
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
            label='Nome do fornecedor'
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
        Enviar
      </LoadingButton>
    </form>
  )
}