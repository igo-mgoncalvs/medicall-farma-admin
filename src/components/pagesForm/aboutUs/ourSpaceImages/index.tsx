'use client'

import { useCallback, useState, useEffect } from 'react'
import { Controller, useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { LoadingButton } from "@mui/lab"

import styles from './styles.module.css'
import InputImage from '@/components/inputImage'
import BASE_URL_V2 from '@/lib/axios_v2'
import OurSpaceImagesTable from './table'

export interface IOurSpaceImages {
  id: string
  image: string | ArrayBuffer
  order: number
}

export default function OurSpaceImages () {
  const [loading, setLoading] = useState(false)
  const [enableForm, setEnableForm] = useState(false)
  const [bannersEdit, setBannersEdit] = useState<IOurSpaceImages>()
  const [rows, setRows] = useState<IOurSpaceImages[]>([])

  const { control, handleSubmit, setValue, reset, formState: { isSubmitted, errors } } = useForm<IOurSpaceImages>()

  const getData = () => {
    BASE_URL_V2.get<IOurSpaceImages[] | []>('/get-our-space-images')
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
      setValue('image', bannersEdit?.image)
      setValue('order', bannersEdit?.order)
    } else {
      reset()
    }
  }, [bannersEdit, reset])

  const onSubmit = useCallback((data: IOurSpaceImages) => {
    setLoading(true)

    if(!bannersEdit) {
      toast.info('Adicionando inforções, aguarde', {
        position: "top-right",
        pauseOnHover: false,
        autoClose: false,
      });

      BASE_URL_V2.post('/register-our-space-image', {
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

      BASE_URL_V2.put(`/edit-our-space-image/${data.id}`, data)
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
                name="image"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Esse campo é necessario'
                  }
                }}
                render={({field: {value, onChange}}) => (
                  <InputImage
                    errors={errors.image?.message}
                    isSubmitted={isSubmitted}
                    id='imageOurSpace'
                    src={value}
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
                setBannersEdit(undefined)
              }}
              className={styles.button}
            >
              Cancelar
            </LoadingButton>
          </div>
        </>
      )}
      
      <OurSpaceImagesTable
        enableForm={enableForm}
        setEnableForm={setEnableForm}
        setBannersEdit={setBannersEdit}
        getData={getData}
        rows={rows}
      />
    </form>
  )
}