'use client'

import { useCallback, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form"
import { Checkbox, FormControlLabel, Switch, TextField } from "@mui/material"
import { toast } from "react-toastify"
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from "next/navigation";

import InputImage from "@/components/inputImage"
import BASE_URL from "@/lib/axios"

import styles from './styles.module.css'
import BASE_URL_V2 from "@/lib/axios_v2";

export interface IHomeGridBanners {
  id: string
  src: string
  alt: string
  href?: string
  fixed?: number
}

export default function GridBanners ({ fixed, id }: { fixed: number, id: string }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [editForm, setEditForm] = useState<boolean>(true)
  
  const { control, handleSubmit, formState: { errors, isSubmitted } } = useForm<IHomeGridBanners | FieldValues>({
    defaultValues: async () => {
      return await BASE_URL_V2.get<IHomeGridBanners>(`/find-grid-banner/${id}`)
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

  const onSubmit = useCallback((data: IHomeGridBanners | FieldValues) => {
    setLoading(true)
    if(editForm) {
      BASE_URL_V2.put(`/edit-grid-banners/${id}`, {
        ...data,
        href: data.href || '',
        alt: data.href || 'banner informativo',
        fixed
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
        BASE_URL_V2.post('/register-grid-banners', {
          ...data,
          alt: data.href || 'banner informativo',
          fixed
        })
          .then(() => {
            toast.dismiss()
            toast.success('Campo adicionado com sucesso!', {
              position: "top-right",
              pauseOnHover: false,
              autoClose: 5000
            });
            navigation.refresh()
          })
          .catch(() => {
            toast.dismiss()
            toast.error('Erro ao adicionar o campo', {
              position: "top-right",
              pauseOnHover: false,
              autoClose: 5000
            });
          })
          .finally(() => {
            setLoading(false)
          })
    }
  }, [fixed, id])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.main}
    >
      <div className={styles.form}>
        <div
          className={styles.inputsText_container}
        >
          <div className={styles.spaceHorizontal}>
            <Controller
              control={control}
              name="src"
              render={({field: { onChange, value }}) => (
                <InputImage
                  errors={errors.src?.message?.toString()}
                  id={`gridBanner-${fixed}`}
                  src={value}
                  isSubmitted={isSubmitted}
                  onChange={({src}) => {
                    onChange(src)
                  }}
                />
              )}
            />

            {fixed > 2 && (
              <Controller
                control={control}
                name='href'
                render={({field: { onChange, value }, fieldState: { error }}) => (
                  <TextField
                    label='Link'
                    onChange={onChange}
                    value={value}
                    error={!!error}
                    className={styles.inputText}
                    helperText={error?.message}
                    defaultValue={' '}
                  />
                )}
              />
            )}
          </div>
        </div>
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