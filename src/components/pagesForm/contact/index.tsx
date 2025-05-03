'use client'

import { useState, useCallback } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { IContact } from '@/utils/interfaces'
import { TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { toast } from 'react-toastify'

import BASE_URL from '@/lib/axios'

import styles from './styles.module.css'
import { PhoneMask } from '@/utils/phoneMask'
import BASE_URL_V2 from '@/lib/axios_v2'

export default function ContactForm () {
  const [loading, setLoading] = useState<boolean>(false)
  const [addForm, setAddForm] = useState<boolean>(false)

  const whatsBaseLink = 'https://api.whatsapp.com/send/?phone='

  const { control, handleSubmit } = useForm<IContact | FieldValues>({
    defaultValues: async () => {
      return await BASE_URL_V2.get<IContact>('/get-contact-phone')
      .then(({data}) => ({
        ...data
      }))
      .catch(() => setAddForm(true))
      .finally(() => {
        toast.dismiss()
      })
    },
  })

  const onSubmit = useCallback((data: IContact | FieldValues) => {
    console.log(data)
    const clearLink = data.phoneNumber.replace(/[^0-9]/g, '')


    toast.info('Adicionando inforções, aguarde', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });
    if(addForm) {
      BASE_URL_V2.post('/register-contact-phone', {
        phoneNumber: clearLink,
        link: `${whatsBaseLink}${clearLink}`
      })
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
        BASE_URL_V2.put(`/edit-contact-phone/${data.id}`, {
          phoneNumber: clearLink,
          link: `${whatsBaseLink}${clearLink}`
        })
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
            setLoading(false)
          })
    }
  }, [addForm])

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="phoneNumber"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Esse campo é necessario'
          }
        }}
        render={({field: { onChange, value }, fieldState: { error }}) => (
          <TextField
            label='Número do whatsapp'
            onChange={(e) => onChange(PhoneMask(e.target.value))}
            value={PhoneMask(value || '')}
            error={!!error}
            className={styles.inputText}
            helperText={error?.message}
            defaultValue={' '}
          />
        )}
      />

      <LoadingButton
        variant='contained'
        color='info'
        type='submit'
        loading={loading}
        className={styles.button}
      >
        Salvar
      </LoadingButton>
    </form>
  )
}