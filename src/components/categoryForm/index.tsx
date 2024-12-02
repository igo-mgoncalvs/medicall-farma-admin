'use client'

import { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@mui/material'
import { toast } from "react-toastify";

import BASE_URL from '@/lib/axios'

import AddIcon from '../icons/add'
import styles from './styles.module.css'
import { ICategory } from '@/utils/interfaces'

export interface ICategoryFormProps {
  type: 'add' | 'edit'
  groupId: string
  categoryEdit: ICategory | undefined
  refreshData: () => void
  finallyEdit: () => void
}

export default function CategoryForm ({
  type = 'add',
  groupId,
  categoryEdit,
  refreshData,
  finallyEdit
}: ICategoryFormProps) {
  const { control, handleSubmit, setValue } = useForm<ICategory>({
    defaultValues: {
      productsGroupsId: groupId
    }
  })

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if(categoryEdit) {
      setValue('name', categoryEdit.name)
    }
  }, [categoryEdit])

  const onSubmit = useCallback((data: ICategory) => {
    if(type === 'add') {
      setLoading(true)

    toast.info('Aguarde um instante', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    BASE_URL.post('/add-category', data)
      .then(() => {
        refreshData()
        setValue('name', '')

        toast.dismiss()
        toast.success('Categoria criada com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000,
        });
      })
      .catch((error) => {
        toast.dismiss()
        toast.error(error.response.data.message, {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
      .finally(() => {
        setLoading(false)
      })
    } else {
      BASE_URL.put(`/edit-category/${categoryEdit?.id}`, data)
        .then(() => {
          refreshData()
          setValue('name', '')

          toast.dismiss()
          toast.success('Categoria editada com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000,
          });
        })
        .catch((error) => {
          toast.dismiss()
          toast.error(error.response.data.message, {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
        })
        .finally(() => {
          finallyEdit()
        })
    }
  }, [type, categoryEdit, finallyEdit])

  return (
    <form
      className={styles.category_input_container}
      onSubmit={handleSubmit(onSubmit)}
      id={groupId}
    >
      <Controller
        control={control}
        name='name'
        render={({field: { onChange, value }}) => (
          <input
            placeholder="Nome da categoria"
            className={styles.category_input}
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Button
        variant="contained"
        className={styles.button}
        type='submit'
        form={groupId}
      >
        {type === 'add' && (
          <AddIcon
            className={styles.button_blue_icon}
          />
        )}
        <p>
          {`${type === 'add' ? 'Cadastrar': 'Editar'} Categoria`}
        </p>
      </Button>
    </form>
  )
}