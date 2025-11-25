'use client'

import { useCallback, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form"
import { FormControlLabel, Switch, TextField } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton';
import BASE_URL from "@/lib/axios";
import { toast } from "react-toastify"

import InputImage from "@/components/inputImage"

import styles from './styles.module.css'
import { useRouter } from "next/navigation";

interface IHomeWelcomeForm {
  title: string
  title_color: string
  text: string
  button_text: string
  button_link: string
  image: string
  imageId: string
  enable: boolean
}

export default function HomeWelcomeForm () {
  const [editForm, setEditForm] = useState<boolean>(true)

  const { control, handleSubmit, setValue, watch, formState: { errors, isSubmitted } } = useForm<IHomeWelcomeForm | FieldValues>({
    defaultValues: async () => {
      return await BASE_URL.get<IHomeWelcomeForm>('/find-home-welcome')
      .then(({data}) => ({
        ...data, 
      }))
      .catch(() => setEditForm(false))
    },
  })

  const [loading, setLoading] = useState<boolean>(false)

  const image = watch('image')
  const imageId = watch('imageId')

  const navigation = useRouter()

  const onSubmit = useCallback((data: IHomeWelcomeForm | FieldValues) => {
    setLoading(true)
    
    if(editForm) {
      BASE_URL.put('/edit-home-welcome', {
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
      BASE_URL.post('/add-home-welcome', {
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
          toast.error('Erro ao criar o campo', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [editForm])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={styles.switch}
      >
        <Controller
          control={control}
          name="enable"
          render={({field: { onChange, value }}) => (
            <FormControlLabel
              label={`${value ? 'Desabilitar' : 'Habilitar' } sessão`}
              control={
                <Switch
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                />
              } 
            />
          )}
        />
      </div>
      <div className={styles.form}>
        <div className={styles.inputsText_container}>
          <Controller
            control={control}
            name="title"
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
            control={control}
            name="text"
            render={({field: { onChange, value }, fieldState: { error }}) => (
              <TextField
                label='Descrição'
                onChange={onChange}
                value={value}
                error={!!error}
                multiline
                rows={5}
                className={styles.inputText}
                helperText={error?.message}
                defaultValue={' '}
              />
            )}
          />
        </div>

        <div className={styles.inputsText_container}>
          <Controller
            control={control}
            name="title_color"
            render={({field: { onChange, value }, fieldState: { error }}) => (
              <TextField
                label='Subtitulo colorido'
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
            name="button_text"
            render={({field: { onChange, value }, fieldState: { error }}) => (
              <TextField
                label='Texto do botão'
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
            name="button_link"
            render={({field: { onChange, value }, fieldState: { error }}) => (
              <TextField
                label='Link do botão'
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
        
        <Controller
          name="image"
          control={control}
          render={({field: {value, onChange}}) => (
            <InputImage
              errors={errors.image?.message?.toString()}
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