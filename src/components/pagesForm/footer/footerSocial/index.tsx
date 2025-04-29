'use client'

import { useCallback, useState, useEffect } from 'react'
import { Controller, useForm } from "react-hook-form"
import { TextField } from "@mui/material"
import { toast } from 'react-toastify'
import { LoadingButton } from "@mui/lab"

import styles from './styles.module.css'
import BASE_URL_V2 from '@/lib/axios_v2'
import FooterSocialTable from './table'
import InputImage from '@/components/inputImage'

export interface IFooterSocial {
  id: string
  icon: string
  href: string  
}

export default function FooterSocial () {
  const [loading, setLoading] = useState(false)
  const [enableForm, setEnableForm] = useState(false)
  const [bannersEdit, setBannersEdit] = useState<IFooterSocial>()
  const [rows, setRows] = useState<IFooterSocial[]>([])

  const { control, handleSubmit, setValue, reset, formState: {errors, isSubmitted} } = useForm<IFooterSocial>()

  const getData = () => {
    BASE_URL_V2.get<IFooterSocial[] | []>('/get-footer-social')
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
      setValue('href', bannersEdit?.href)
      setValue('icon', bannersEdit?.icon)
    } else {
      reset()
    }
  }, [bannersEdit, reset])

  const onSubmit = useCallback((data: IFooterSocial) => {
    setLoading(true)

    if(!bannersEdit) {
      toast.info('Adicionando inforções, aguarde', {
        position: "top-right",
        pauseOnHover: false,
        autoClose: false,
      });

      BASE_URL_V2.post('/register-footer-social', {
        ...data,
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

      BASE_URL_V2.put(`/edit-footer-social/${data.id}`, data)
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
              <Controller
                name="icon"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Esse campo é necessario'
                  }
                }}
                render={({field: {value, onChange}}) => (
                  <InputImage
                    errors={errors.icon?.message}
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
      
      <FooterSocialTable
        enableForm={enableForm}
        setEnableForm={setEnableForm}
        setBannersEdit={setBannersEdit}
        getData={getData}
        rows={rows}
      />
    </form>
  )
}