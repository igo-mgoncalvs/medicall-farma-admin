'use client'

import { useState, useCallback, useEffect } from 'react'
import { IGroup } from "@/utils/interfaces"
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import BASE_URL from '@/lib/axios';

import styles from './styles.module.css'

export default function GroupForm ({ id }: { id?: string }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [index, setIndex] = useState<number[]>([])


  const { control, handleSubmit } = useForm<IGroup>({
    defaultValues: async () => {
      return await BASE_URL.get<IGroup>(`/find-group/${id}`)
        .then(({data}) => ({
          ...data, 
        }))
        .finally(() => {
          toast.dismiss()
        })
    }, 
  })

  const navigation = useRouter()

  useEffect(() => {
    BASE_URL.get<IGroup[]>('/groups')
      .then(({ data }) => {
        const list: number[] = []

        data.forEach((item) => {
          list.push(item.index)
        })
  
        setIndex(list)
      })
  }, [])

  const onSubmit = useCallback((data: IGroup) => {
    setLoading(true)

    if(!id) {
      BASE_URL.post('/add-group', {
        ...data,
        index: index.length
      })
        .then(() => {
          toast.dismiss()
          toast.success('Imagem publicada com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
          navigation.back()
        })
      .catch(() => {
        toast.dismiss()
        toast.error('Erro ao publicar a imagem', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
      .finally(() => {
        setLoading(false)
      })
    } else {
      BASE_URL.put(`/edit-group/${id}`, {
        ...data,
        index: Number(data.index)
      })
        .then(() => {
          toast.dismiss()
          toast.success('Grupo editado com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
          navigation.back()
        })
      .catch(() => {
        toast.dismiss()
        toast.error('Erro ao editar grupo', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
      .finally(() => {
        setLoading(false)
      })

    }
  }, [id, index])

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <Controller
          control={control}
          name="group_name"
          rules={{
            required: {
              value: true,
              message: 'Esse campo é necessario'
            }
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label='Nome do cliente'
              onChange={onChange}
              value={value}
              error={!!error}
              helperText={error?.message}
              defaultValue={id ? ' ': ''}
            />
          )}
        />

        {(index.length > 0 && id) && (
          <Controller
            name="index"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Esse campo é necessario'
              }
            }}
            render={({field: { onChange, value }, fieldState: { error }}) => (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Posição</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={`${value || 0}`}
                  defaultValue=' '
                  label="Posição"
                  onChange={onChange}
                >
                  {index.map(item => (
                    <MenuItem value={`${item}`}>{item + 1}º</MenuItem> 
                  ))}
                </Select>
              </FormControl>
            )}
          />
        )}

        <LoadingButton
          variant='contained'
          className={styles.button}
          loading={loading}
          type='submit'
        >
          Enviar
        </LoadingButton>
      </form>
    </div>
  )
}