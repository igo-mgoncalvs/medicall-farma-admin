'use client'

import { useCallback, useState, useEffect } from 'react'
import { Controller, useForm } from "react-hook-form"
import { TextField } from "@mui/material"
import { toast } from 'react-toastify'
import { LoadingButton } from "@mui/lab"

import { IHomeProductsList } from "@/utils/interfaces"
import BASE_URL from '@/lib/axios'

import styles from './styles.module.css'
import ValuesTable from './table'

export default function HomeProductsList () {
  const [loading, setLoading] = useState(false)
  const [enableForm, setEnableForm] = useState(false)
  const [valueEdit, setValueEdit] = useState<IHomeProductsList>()
  const [rows, setRows] = useState<IHomeProductsList[]>([])

  const { control, handleSubmit, setValue, reset } = useForm<IHomeProductsList>()

  const getData = () => {
    BASE_URL.get<IHomeProductsList[] | []>('/home-products-list')
      .then(({ data }) => {
        setRows(data)
      })
  }

  useEffect(() => {
    if(valueEdit) {
      setValue('id', valueEdit?.id)
      setValue('name', valueEdit?.name)
    } else {
      reset()
    }

    getData()
  }, [valueEdit, reset])

  const onSubmit = useCallback((data: IHomeProductsList) => {
    setLoading(true)

    if(!valueEdit) {
      toast.info('Adicionando inforções, aguarde', {
        position: "top-right",
        pauseOnHover: false,
        autoClose: false,
      });

      BASE_URL.post('/add-home-products-list', data)
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

      BASE_URL.put(`/edit-home-products-list/${data.id}`, data)
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
        <div className={styles.form}>
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

          <div className={styles.button_container}>
            <LoadingButton
              variant='contained'
              loading={loading}
              type='submit'
              className={styles.button}
            >
              Enviar
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
        </div>
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