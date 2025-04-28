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
import MedicallAddressesTable from './table'

export interface IMedicallAddresses {
  id: string
  uf: string
  address: number
  state: string
  description: string
}

export default function MedicallAddresses () {
  const [loading, setLoading] = useState(false)
  const [enableForm, setEnableForm] = useState(false)
  const [bannersEdit, setBannersEdit] = useState<IMedicallAddresses>()
  const [rows, setRows] = useState<IMedicallAddresses[]>([])

  const { control, handleSubmit, setValue, reset } = useForm<IMedicallAddresses>()

  const getData = () => {
    BASE_URL_V2.get<IMedicallAddresses[] | []>('/get-addresses')
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
      setValue('address', bannersEdit?.address)
      setValue('description', bannersEdit?.description)
      setValue('state', bannersEdit?.state)
      setValue('uf', bannersEdit?.uf)
    } else {
      reset()
    }
  }, [bannersEdit, reset])

  const onSubmit = useCallback((data: IMedicallAddresses) => {
    setLoading(true)

    if(!bannersEdit) {
      toast.info('Adicionando inforções, aguarde', {
        position: "top-right",
        pauseOnHover: false,
        autoClose: false,
      });

      BASE_URL_V2.post('/register-addresses', {
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

      BASE_URL_V2.put(`/edit-addresses/${data.id}`, data)
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
                name="address"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Esse campo é necessario'
                  }
                }}
                render={({field: { onChange, value }, fieldState: { error }}) => (
                  <TextField
                    label='Endereço'
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
                name="uf"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Esse campo é necessario'
                  }
                }}
                render={({field: { onChange, value }, fieldState: { error }}) => (
                  <TextField
                    label='UF'
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

            <div className={styles.form_row}>
              <Controller
                name="state"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Esse campo é necessario'
                  }
                }}
                render={({field: { onChange, value }, fieldState: { error }}) => (
                  <TextField
                    label='Estado'
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
      
      <MedicallAddressesTable
        enableForm={enableForm}
        setEnableForm={setEnableForm}
        setBannersEdit={setBannersEdit}
        getData={getData}
        rows={rows}
      />
    </form>
  )
}