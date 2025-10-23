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

interface IHomeCatalogForm {
  title: string
  titleColor: string
  description: string
  buttonText: string
  catalogLink: string
  image: string | ArrayBuffer
  imageMobile: string | ArrayBuffer
}

export default function CatalogForm () {
  const [loading, setLoading] = useState<boolean>(false)
  const [editForm, setEditForm] = useState<boolean>(true)
  
  const { control, handleSubmit, formState: { errors, isSubmitted } } = useForm<IHomeCatalogForm | FieldValues>({
    defaultValues: async () => {
      return await BASE_URL_V2.get<IHomeCatalogForm>('/get-home-catalog')
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

  const onSubmit = useCallback((data: IHomeCatalogForm | FieldValues) => {
    setLoading(true)

    if(editForm) {
      BASE_URL_V2.put('/edit-home-catalog', {
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
        BASE_URL_V2.post('/register-home-catalog', {
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
        <div className={styles.banners}>
          <Controller
            name="image"
            control={control}
            render={({field: {value, onChange}}) => (
              <InputImage
                id="image_catalog"
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
            name="imageMobile"
            control={control}
            render={({field: {value, onChange}}) => (
              <InputImage
                errors={errors.imageMobile?.message?.toString()}
                id="imageMobile_catalog"
                src={value}
                isSubmitted={isSubmitted}
                onChange={({src}) => {
                  onChange(src)
                }}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="catalogLink"
          render={({field: { onChange, value }, fieldState: { error }}) => (
            <TextField
              label='Link do botão'
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