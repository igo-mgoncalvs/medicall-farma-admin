'use client'

import { useCallback, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form"
import { TextField } from "@mui/material"
import { toast } from "react-toastify"
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from "next/navigation";

import styles from './styles.module.css'
import BASE_URL_V2 from "@/lib/axios_v2";
import InputImage from "@/components/inputImage";

interface IAboutUsUnits {
  image: string
  title: string
  titleColor: string
}

export default function AboutUsUnits () {
  const [loading, setLoading] = useState<boolean>(false)
  const [editForm, setEditForm] = useState<boolean>(true)
  
  const { control, handleSubmit, formState: { errors, isSubmitted } } = useForm<IAboutUsUnits | FieldValues>({
    defaultValues: async () => {
      return await BASE_URL_V2.get<IAboutUsUnits>('/get-units')
      .then(({data}) => ({
        ...data, 
      }))
      .catch(() => setEditForm(false))
      .finally(() => {
        toast.dismiss()
      })
    },
  })
  
  const navigation = useRouter()

  const onSubmit = useCallback((data: IAboutUsUnits | FieldValues) => {
    setLoading(true)

    if(editForm) {
      BASE_URL_V2.put('/edit-units', {
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
        BASE_URL_V2.post('/register-units', {
          ...data,
        })
          .then(() => {
            toast.dismiss()
            toast.success('Campo criado com sucesso!', {
              position: "top-right",
              pauseOnHover: false,
              autoClose: 5000
            });
            navigation.refresh()
          })
          .catch(() => {
            toast.dismiss()
            toast.error('Erro ao criado o campo', {
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
      <div className={styles.form}>
        <Controller
          control={control}
          name='image'
          render={({field: { onChange, value }}) => (
            <InputImage
              errors={errors.image?.message?.toString()}
              src={value}
              id="imageUnits"
              isSubmitted={isSubmitted}
              onChange={({src}) => {
                onChange(src)
              }}
            />
          )}
        />

        <div
          className={styles.inputsText_container}
        >
          <div className={styles.spaceHorizontal}>
            <Controller
              control={control}
              name='title'
              render={({field: { onChange, value }, fieldState: { error }}) => (
                <TextField
                  label='Título com cor'
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
              name="titleColor"
              render={({field: { onChange, value }, fieldState: { error }}) => (
                <TextField
                  label='Titulo'
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
        </div>
      </div>

      <LoadingButton
        variant='contained'
        loading={loading}
        type='submit'
      >
        Salvar
      </LoadingButton>
    </form>
  )
}