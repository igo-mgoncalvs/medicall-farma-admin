'use client'

import { useState, useCallback, useEffect } from 'react'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import BASE_URL from '@/lib/axios';

import styles from './styles.module.css'
import { ICategories, IGroup } from '@/utils/interfacesNew';
import BASE_URL_V2 from '@/lib/axios_v2';

export default function CategoryForm ({ id }: { id?: string }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [groups, setGroups] = useState<IGroup[]>([])

  const { control, handleSubmit } = useForm<ICategories>({
    defaultValues: async () => {
      return await BASE_URL_V2.get<ICategories>(`/find-category/${id}`)
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
    const getGroups = () => {
      BASE_URL_V2.get('/list-groups')
        .then(({data}) => {
          setGroups(data)
        })
    }

    getGroups()
  }, [])

  const onSubmit = useCallback((data: ICategories) => {
    setLoading(true)

    if(!id) {
      BASE_URL_V2.post('/register-category', {
        ...data,
        categoryLink: data.categoryName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase(),
        isTop: false
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
      BASE_URL_V2.put(`/edit-category/${id}`, {
        ...data,
        categoryLink: data.categoryLink.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase(),
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
  }, [id])

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <Controller
          name='gruopId'
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Esse campo é necessario'
            }
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl
              error={!!error}
            >
              <InputLabel id="demo-simple-select-helper-label">Selecione o grupo</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Selecione o grupo"
                onChange={(event) => {
                  onChange(event)
                }}
                value={groups?.length > 0 ? value : ''}
              >
                <MenuItem
                  value={''}
                >
                  Selecione o grupo
                </MenuItem>
                {groups?.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                  >
                    {item.groupName}
                  </MenuItem>
                ))}
              </Select>
              {error && (
                <FormHelperText>
                  {error?.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="categoryName"
          rules={{
            required: {
              value: true,
              message: 'Esse campo é necessario'
            }
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label='Nome da categoria'
              onChange={onChange}
              value={value}
              error={!!error}
              helperText={error?.message}
              defaultValue={id ? ' ': ''}
            />
          )}
        />

        <LoadingButton
          variant='contained'
          className={styles.button}
          loading={loading}
          type='submit'
        >
          Salvar
        </LoadingButton>
      </form>
    </div>
  )
}