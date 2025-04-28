'use client'

import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form"
import { Checkbox, FormControlLabel, Switch, TextField } from "@mui/material"
import { toast } from "react-toastify"
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from "next/navigation";

import InputImage from "@/components/inputImage"
import BASE_URL from "@/lib/axios"

import styles from './styles.module.css'
import BASE_URL_V2 from "@/lib/axios_v2";

export interface IAboutUsWellcome {
  image: string
  imageMobile: string
  title: string
  description: string
}

export default function Wellcome () {
  const [loading, setLoading] = useState<boolean>(false)
  const [editForm, setEditForm] = useState<boolean>(true)
  
  const { control, handleSubmit, formState: { isSubmitted, errors } } = useForm<IAboutUsWellcome | FieldValues>({
    defaultValues: async () => {
      return await BASE_URL_V2.get<IAboutUsWellcome>('/get-wellcome')
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

  const onSubmit = (data: IAboutUsWellcome | FieldValues) => {
    setLoading(true)
    if(editForm) {
      BASE_URL_V2.put('/edit-wellcome', {
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
        BASE_URL_V2.post('/register-wellcome', {
          ...data,
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
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.form}>
        <div
          className={styles.inputsText_container}
        >
          <div className={styles.spaceHorizontal}>
            <div>
              <Controller
                control={control}
                name='image'
                render={({field: { onChange, value }}) => (
                  <InputImage
                    errors={errors.image?.message?.toString()}
                    src={value}
                    id="imageWellcome"
                    isSubmitted={isSubmitted}
                    onChange={({src}) => {
                      onChange(src)
                    }}
                  />
                )}
              />
            </div>

            <div>
              <Controller
                control={control}
                name='imageMobile'
                render={({field: { onChange, value }}) => (
                  <InputImage
                    errors={errors.imageMobile?.message?.toString()}
                    src={value}
                    id='imageMobileWellcome'
                    description="mobile"
                    isSubmitted={isSubmitted}
                    onChange={({src}) => {
                      onChange(src)
                    }}
                  />
                )}
              />
            </div>
          </div>

          <Controller
            control={control}
            name='title'
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

          <div className={styles.spaceHorizontal}>
            <Controller
              control={control}
              name="description"
              render={({field: { onChange, value }, fieldState: { error }}) => (
                <TextField
                  label='Descrição'
                  onChange={onChange}
                  value={value}
                  multiline
                  rows={5}
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