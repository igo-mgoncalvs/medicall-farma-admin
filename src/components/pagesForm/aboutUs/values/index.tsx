'use client'

import { useCallback, useState, useEffect } from 'react'
import { Controller, FieldValues, useForm } from "react-hook-form"
import { TextField } from "@mui/material"
import { toast } from 'react-toastify'
import { LoadingButton } from "@mui/lab"

import { IAboutUs_Values } from "@/utils/interfaces"
import BASE_URL from '@/lib/axios'

import styles from './styles.module.css'
import InputImage from '@/components/inputImage'
import ValuesTable from './table'

export default function AboutUsValues () {
  const [loading, setLoading] = useState(false)
  const [enableForm, setEnableForm] = useState(false)
  const [valueEdit, setValueEdit] = useState<IAboutUs_Values>()
  const [rows, setRows] = useState<IAboutUs_Values[]>([])

  const { control, handleSubmit, watch, setValue, setError, reset, clearErrors, formState: { isSubmitted, errors } } = useForm<IAboutUs_Values>()

  const imageUrl = watch('image')
  const imageId = watch('imageId')


  const getData = () => {
    BASE_URL.get<IAboutUs_Values[] | []>('/about-us-values')
      .then(({ data }) => {
        setRows(data)
      })
  }

  useEffect(() => {
    if(!imageUrl) {
      setError('image', {
        message: 'Esse campo é necessario'
      })
    } else {
      clearErrors('image')
    }

    getData()
  }, [imageUrl])

  useEffect(() => {
    if(valueEdit) {
      setValue('id', valueEdit?.id)
      setValue('image', valueEdit?.image)
      setValue('imageId', valueEdit?.imageId)
      setValue('text', valueEdit?.text)
      setValue('title', valueEdit?.title)
    } else {
      reset()
    }
  }, [valueEdit, reset])

  const onSubmit = useCallback((data: IAboutUs_Values) => {
    setLoading(true)

    if(!valueEdit) {
      toast.info('Adicionando inforções, aguarde', {
        position: "top-right",
        pauseOnHover: false,
        autoClose: false,
      });

      BASE_URL.post('/about-us-add-value', data)
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
          setValueEdit(undefined)
          setLoading(false)
          setEnableForm(false)
        })
    } else {
      toast.info('Editando inforções, aguarde', {
        position: "top-right",
        pauseOnHover: false,
        autoClose: false,
      });

      BASE_URL.put(`about-us-edit-value/${data.id}`, data)
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
          setValueEdit(undefined)
          setLoading(false)
        })
    }
  }, [valueEdit])

  return (
    <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
      {(enableForm || !!valueEdit) && (
        <>
          <div className={styles.form}>
            <div className={styles.form_row}>
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

              <Controller
                name="text"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Esse campo é necessario'
                  }
                }}
                render={({field: { onChange, value }, fieldState: { error }}) => (
                  <TextField
                    label='Descrição'
                    onChange={onChange}
                    value={value}
                    rows={6}
                    multiline
                    error={!!error}
                    className={styles.inputText}
                    helperText={error?.message}
                    defaultValue={' '}
                  />
                )}
              />
            </div>

            <div className={styles.inputImage}>
              <Controller
                name='image'
                control={control}
                render={({field: {value,onChange}}) => (
                  <InputImage
                    src={value}
                    errors={errors.image?.message}
                    isSubmitted={isSubmitted}
                    id='valueImage'
                    onChange={({src}) => {
                      onChange(src)
                    }}    
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
                setValueEdit(undefined)
              }}
              className={styles.button}
            >
              Cancelar
            </LoadingButton>
          </div>
        </>
      )}

      
      <ValuesTable
        enableForm={enableForm}
        setEnableForm={setEnableForm}
        setValueEdit={setValueEdit}
        getData={getData}
        rows={rows}
      />
    </form>
  )
}