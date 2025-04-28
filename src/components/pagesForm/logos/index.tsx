'use client'

import { useCallback, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { LoadingButton } from "@mui/lab"
import { toast } from 'react-toastify'

import InputImage from "@/components/inputImage"
import { ILogos } from "@/utils/interfaces"
import BASE_URL from "@/lib/axios"

import style from './styles.module.css'

export default function LogosForm () {
  const [loading, setLoading] = useState<boolean>(false)
  const [addForm, setAddForm] = useState<boolean>(false)

  const { handleSubmit, watch, setValue, control, formState: { isSubmitted, errors } } = useForm<ILogos>({
    defaultValues: async () => {
      return await BASE_URL.get<ILogos>('/logos')
      .then(({data}) => data)
      .finally(() => {
        toast.dismiss()
      })
    },
  })

  const logoColorId = watch('logoColorId')
  const logoColor = watch('logoColor')

  const logoWhiteId = watch('logoWhiteId')
  const logoWhite = watch('logoWhite')

  const onSubmit = useCallback((data: ILogos) => {
    toast.info('Adicionando inforções, aguarde', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });
    if(addForm) {
      BASE_URL.post('/add-logos', data)
        .then(() => {
          toast.dismiss()
          toast.success('Adicionado com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
          setAddForm(false)
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
          setLoading(false)
        })
    } else {
      BASE_URL.post('/edit-logos', data)
        .then(() => {
          toast.dismiss()
          toast.success('Editado com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
          setAddForm(false)
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
          setLoading(false)
        })
    }
  }, [addForm])

  return (
    <form
      className={style.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <p className={style.label}>Logo colorida</p>
        <Controller
          name="logoColor"
          control={control}
          render={({field: {value, onChange}}) => (
            <InputImage
              errors={errors.logoColor?.message?.toString()}
              src={value}
              isSubmitted={isSubmitted}
              onChange={({src}) => {
                onChange(src)
              }}
            />
          )}
        />
      </div>

      <div>
        <p className={style.label}>Logo branco</p>
        <Controller
          name="logoWhite"
          control={control}
          render={({field: {value, onChange}}) => (
            <InputImage
              errors={errors.logoWhite?.message?.toString()}
              src={value}
              isSubmitted={isSubmitted}
              onChange={({src}) => {
                onChange(src)
              }}
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