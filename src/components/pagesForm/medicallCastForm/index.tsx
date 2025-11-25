'use client'

import { IMedicallCast } from "@/utils/interfaces";
import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import styles from './styles.module.css'
import BASE_URL_V2 from "@/lib/axios_v2";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { LoadingButton } from "@mui/lab";

export default function MedicallCastForm ({
  defaultValues
}: {
  defaultValues?: IMedicallCast
}) {
  const [loading, setLoading] = useState<boolean>(false)

  const { control, handleSubmit } =  useForm<IMedicallCast>({
    defaultValues
  })
  const navigation = useRouter()

  const onSubmit = useCallback(async (data: IMedicallCast) => {
    setLoading(true)

    const url = new URL(data.link)
    const searchParams = url.searchParams.get('v')
    
    if(!defaultValues) {
      BASE_URL_V2.post('/medicall-cast', {
        link: searchParams ? `https://www.youtube.com/embed/${searchParams}` : data.link,
        title: data.title,
        description: data.description,
      })
        .then(() => {
          toast.success('Episódio cadastrado com sucesso!')
          navigation.back()
        })
        .catch(() => {
          toast.error('Erro ao cadastrar o episódio')
        })
        .finally(() => {
          setLoading(false)
        })
      } else {
        BASE_URL_V2.put(`/medicall-cast/${defaultValues.id}`, {
          link: data.link.includes('embed') ? data.link : `https://www.youtube.com/embed/${searchParams}`,
          title: data.title,
          description: data.description,
        })
          .then(() => {
            toast.success('Episódio editado com sucesso!')
            navigation.back()
          })
          .catch(() => {
            toast.error('Erro ao editar o episódio')
          })
          .finally(() => {
            setLoading(false)
          })
    }
  }, [defaultValues])

  return (
    <form
      id="form-new-epsode"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.container}
    >
      <Controller
        name="link"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextField
            label='Link do vídeo'
            value={value}
            error={!!error}
            helperText={error?.message}
            onChange={(e) => {
              onChange(e)
            }}
          />
        )}
      />

      <Controller
        name="title"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextField
            label='Titulo'
            value={value}
            error={!!error}
            helperText={error?.message}
            onChange={(e) => {
              onChange(e)
            }}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextField
            label='Descrição'
            value={value}
            multiline
            error={!!error}
            rows={5}
            helperText={error?.message}
            onChange={(e) => {
              onChange(e)
            }}
          />
        )}
      /> 

      <div>
        <LoadingButton
          variant="contained"
          type="submit"
          loading={loading}
        >
          Salvar
        </LoadingButton>
      </div>

    </form>
  )
}