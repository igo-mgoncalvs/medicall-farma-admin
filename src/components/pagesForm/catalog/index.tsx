'use client'

import { useState, useCallback } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { ICatalog, IContact } from '@/utils/interfaces'
import { LoadingButton } from '@mui/lab'
import { Button } from '@mui/material'
import { ContentCopy } from '@mui/icons-material'
import { toast } from 'react-toastify'

import BASE_URL from '@/lib/axios'
import InputFile from '@/components/inputFile'

import styles from './styles.module.css'
import BASE_URL_V2 from '@/lib/axios_v2'

export default function CatalogForm () {
  const [enableEdit, setEnableEdit] = useState<boolean>(false)

  const { watch, setValue, formState: { errors, isSubmitted } } = useForm<ICatalog | FieldValues>({
    defaultValues: async () => {
      return await BASE_URL_V2.get<IContact>('/catalog')
      .then(({data}) => data)
      .finally(() => {
        toast.dismiss()
      })
    },
  })

  const fileName = watch('fileName')
  const link = watch('link')

  const handleEdit = () => {
    setValue('link', '')
    setEnableEdit(true)
  }

  const handleCopy = (copyLink: string) => {
    navigator.clipboard.writeText(copyLink)
      .then(() => {
        toast.dismiss()
        toast.success('O texto foi copiado!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
  }

  return (
    <div>
      <InputFile
        errors={errors.link?.message?.toString()}
        id="logoColor"
        imageId={fileName}
        imageUrl={link}
        enableEdit={enableEdit}
        isSubmitted={isSubmitted}
        setValue={({link, fileName}) => {
          setValue('link', link)
          setValue('fileName', fileName)
          setEnableEdit(false)
        }}
      />

      <div className={styles.buttonsContainer}>
        <LoadingButton
          variant='contained'
          color='info'
          type='button'
          className={styles.button}
          onClick={handleEdit}
          disabled={!link}
          >
          Editar
        </LoadingButton>

        {link && (
          <Button
            variant='outlined'
            color='info'
            startIcon={<ContentCopy />}
            onClick={() => handleCopy(link)}
          >
            Copiar link
          </Button>
        )}
      </div>
    </div>
  )
}