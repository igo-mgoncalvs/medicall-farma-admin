'use client'

import { useCallback, useState, useEffect } from 'react'
import { Controller, useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { LoadingButton } from "@mui/lab"

import styles from './styles.module.css'
import InputImage from '@/components/inputImage'
import BASE_URL_V2 from '@/lib/axios_v2'
import OurSpaceImagesTable from './table'
import ValuesFormTable from './table'
import { TextField } from '@mui/material'

export interface IValuesForm {
  id: string
  order: number
  icon: string | ArrayBuffer
  title: string
  description: string
}

export default function ValuesForm () {
  const [loading, setLoading] = useState(false)
  const [enableForm, setEnableForm] = useState(false)
  const [bannersEdit, setBannersEdit] = useState<IValuesForm>()
  const [rows, setRows] = useState<IValuesForm[]>([])

  const { control, handleSubmit, setValue, reset, formState: { isSubmitted, errors } } = useForm<IValuesForm>()

  const getData = () => {
    BASE_URL_V2.get<IValuesForm[] | []>('/get-values')
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
      setValue('description', bannersEdit?.description)
      setValue('order', bannersEdit?.order)
      setValue('icon', bannersEdit?.icon)
      setValue('title', bannersEdit?.title)
    } else {
      reset()
    }
  }, [bannersEdit, reset])

  const onSubmit = useCallback((data: IValuesForm) => {
    setLoading(true)

    if(!bannersEdit) {
      toast.info('Adicionando inforções, aguarde', {
        position: "top-right",
        pauseOnHover: false,
        autoClose: false,
      });

      BASE_URL_V2.post('/register-values', {
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

      BASE_URL_V2.put(`/edit-values/${data.id}`, data)
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
                    id='imageOurSpace'
                    backgroundColor={'#dfdfdf'}
                    src={value}
                    onChange={({src}) => {
                      onChange(src)
                    }}    
                  />
                )}
              />

              <Controller
                name="title"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Esse campo é necessario'
                  }
                }}
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

              <Controller
                name="description"
                control={control}
                render={({field: { onChange, value }, fieldState: { error }}) => (
                  <TextField
                    label='Descrição'
                    onChange={onChange}
                    value={value}
                    rows={5}
                    multiline
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
      
      <ValuesFormTable
        enableForm={enableForm}
        setEnableForm={setEnableForm}
        setBannersEdit={setBannersEdit}
        getData={getData}
        rows={rows}
      />
    </form>
  )
}