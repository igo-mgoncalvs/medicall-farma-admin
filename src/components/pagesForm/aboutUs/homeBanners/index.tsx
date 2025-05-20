'use client'

import { useCallback, useState, useEffect } from 'react'
import { Controller, useForm } from "react-hook-form"
import { Checkbox, FormControlLabel, TextField } from "@mui/material"
import { toast } from 'react-toastify'
import { LoadingButton } from "@mui/lab"

import styles from './styles.module.css'
import InputImage from '@/components/inputImage'
import HomeBannersTable from './table'
import BASE_URL_V2 from '@/lib/axios_v2'

export interface IHomeBanners {
  id: string
  src: string | ArrayBuffer
  srcMobile: string | ArrayBuffer
  alt: string
  order: number
  href: string
  external: boolean
}

export default function HomeBanners () {
  const [loading, setLoading] = useState(false)
  const [enableForm, setEnableForm] = useState(false)
  const [bannersEdit, setBannersEdit] = useState<IHomeBanners>()
  const [rows, setRows] = useState<IHomeBanners[]>([])

  const { control, handleSubmit, setValue, reset, formState: { isSubmitted, errors } } = useForm<IHomeBanners>()

  const getData = () => {
    BASE_URL_V2.get<IHomeBanners[] | []>('/get-home-banners')
      .then(({ data }) => {
        setRows(data)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if(bannersEdit) {
      setValue('id', bannersEdit?.id)
      setValue('src', bannersEdit?.src)
      setValue('href', bannersEdit?.href)
      setValue('alt', bannersEdit?.alt)
      setValue('external', bannersEdit?.external)
      setValue('srcMobile', bannersEdit?.srcMobile)
    } else {
      reset()
    }
  }, [bannersEdit, reset])

  const onSubmit = useCallback((data: IHomeBanners) => {
    setLoading(true)

    if(!bannersEdit) {
      toast.info('Adicionando inforções, aguarde', {
        position: "top-right",
        pauseOnHover: false,
        autoClose: false,
      });

      BASE_URL_V2.post('/register-banner', {
        ...data,
        alt: data.href,
      })
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
          getData()
          reset()
          setBannersEdit(undefined)
          setLoading(false)
          setEnableForm(false)
        })
    } else {
      toast.info('Editando inforções, aguarde', {
        position: "top-right",
        pauseOnHover: false,
        autoClose: false,
      });

      BASE_URL_V2.put(`/edit-banner/${data.id}`, data)
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
          getData()
          reset()
          setEnableForm(false)
          setBannersEdit(undefined)
          setLoading(false)
        })
    }
  }, [bannersEdit])

  return (
    <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
      {(enableForm || !!bannersEdit) && (
        <>
          <div className={styles.form}>
            <div className={styles.form_row}>
              <div
                className={styles.images}
              >
                <Controller
                  name="src"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Esse campo é necessario'
                    }
                  }}
                  render={({field: {value, onChange}}) => (
                    <InputImage
                      errors={errors.src?.message}
                      isSubmitted={isSubmitted}
                      id='valueImage'
                      src={value}
                      onChange={({src}) => {
                        onChange(src)
                      }}    
                    />
                  )}
                />
                
                <Controller
                  name="srcMobile"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Esse campo é necessario'
                    }
                  }}
                  render={({field: {value, onChange}}) => (
                    <InputImage
                      errors={errors.srcMobile?.message}
                      isSubmitted={isSubmitted}
                      description='mobile'
                      id='valueImageMobile'
                      src={value}
                      onChange={({src}) => {
                        onChange(src)
                      }}    
                    />
                  )}
                />
              </div>

              <Controller
                name="href"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Esse campo é necessario'
                  }
                }}
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

              <Controller
                name='external'
                control={control}
                render={({field: {value, onChange}}) => (
                  <FormControlLabel
                    control={<Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />}
                    label="É um link externo?"
                  />
                )}
              />
            </div>
          </div>

          <div className={styles.button_container}>
            <LoadingButton
              variant='contained'
              loading={loading}
              type='submit'
              className={styles.button}
            >
              Salvar
            </LoadingButton>
            <LoadingButton
              variant='contained'
              color='error'
              type='reset'
              onClick={() => {
                setEnableForm(false)
                setBannersEdit(undefined)
              }}
              className={styles.button}
            >
              Cancelar
            </LoadingButton>
          </div>
        </>
      )}
      
      <HomeBannersTable
        enableForm={enableForm}
        setEnableForm={setEnableForm}
        setBannersEdit={setBannersEdit}
        getData={getData}
        rows={rows}
      />
    </form>
  )
}