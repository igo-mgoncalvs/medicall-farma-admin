'use client'

import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { LoadingButton } from "@mui/lab"
import { toast } from 'react-toastify'
import { Divider } from '@mui/material'

import InputImage from "@/components/inputImage"
import { IProductsBanners } from "@/utils/interfaces"
import BASE_URL from "@/lib/axios"

import style from './styles.module.css'

export default function ProductsBanners () {
  const [loading, setLoading] = useState<boolean>(false)
  const [addForm, setAddForm] = useState<boolean>(true)

  const { handleSubmit, watch, setValue, formState: { isSubmitted, errors } } = useForm<IProductsBanners>({
    defaultValues: async () => {
      return await BASE_URL.get<IProductsBanners>('/products-page-banners')
      .then(({data}) => {
        setAddForm(false)
        return data
      })
      .finally(() => {
        toast.dismiss()
      })
    },
  })

  const detailsFirst = watch('detailsFirst')
  const detailsFirstId = watch('detailsFirstId')
  const detailsSecound = watch('detailsSecound')
  const detailsSecoundId = watch('detailsSecoundId')

  const faviritFirst = watch('faviritFirst')
  const faviritFirstId = watch('faviritFirstId')
  const faviritSecound = watch('faviritSecound')
  const faviritSecoundId = watch('faviritSecoundId')

  const faviritFirstMobile = watch('faviritFirstMobile')
  const faviritFirstMobileId = watch('faviritFirstMobileId')
  const faviritSecoundMobile = watch('faviritSecoundMobile')
  const faviritSecoundMobileId = watch('faviritSecoundMobileId')

  const onSubmit = useCallback((data: IProductsBanners) => {

    console.log(data)
    toast.info('Adicionando inforções, aguarde', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });
    if(addForm) {
      BASE_URL.post('/add-products-page-banners', data)
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
      BASE_URL.post('/edit-products-page-banners', data)
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
      <div className={style.bannerGroup}>
        <div>
          <p className={style.label}>Banner principal</p>
          <InputImage
            errors={errors.faviritFirst?.message?.toString()}
            id="faviritFirst"
            imageId={faviritFirstId}
            imageUrl={faviritFirst}
            isSubmitted={isSubmitted}
            setValue={({link, file_name}) => {
              setValue('faviritFirst', link)
              setValue('faviritFirstId', file_name)
            }}
          />
        </div>

        <div>
          <p className={style.label}>Banner principal versão mobile</p>
          <InputImage
            errors={errors.faviritFirstMobile?.message?.toString()}
            id="faviritFirstMobile"
            imageId={faviritFirstMobileId}
            imageUrl={faviritFirstMobile}
            isSubmitted={isSubmitted}
            setValue={({link, file_name}) => {
              setValue('faviritFirstMobile', link)
              setValue('faviritFirstMobileId', file_name)
            }}
          />
        </div>
      </div>

      <div className={style.bannerGroup}>
        <div>
          <p className={style.label}>Banner do rodapé</p>
          <InputImage
            errors={errors.faviritSecound?.message?.toString()}
            id="faviritSecound"
            imageId={faviritSecoundId}
            imageUrl={faviritSecound}
            isSubmitted={isSubmitted}
            setValue={({link, file_name}) => {
              setValue('faviritSecound', link)
              setValue('faviritSecoundId', file_name)
            }}
          />
        </div>
        <div>
          <p className={style.label}>Banner do rodapé versão mobile</p>
          <InputImage
            errors={errors.faviritSecoundMobile?.message?.toString()}
            id="faviritSecoundMobile"
            imageId={faviritSecoundMobileId}
            imageUrl={faviritSecoundMobile}
            isSubmitted={isSubmitted}
            setValue={({link, file_name}) => {
              setValue('faviritSecoundMobile', link)
              setValue('faviritSecoundMobileId', file_name)
            }}
          />
        </div>
      </div>

      <div>
        <p className={style.label}>Banner principal das categorias</p>
        <InputImage
          errors={errors.detailsFirst?.message?.toString()}
          id="detailsFirst"
          imageId={detailsFirstId}
          imageUrl={detailsFirst}
          isSubmitted={isSubmitted}
          setValue={({link, file_name}) => {
            setValue('detailsFirst', link)
            setValue('detailsFirstId', file_name)
          }}
        />
      </div>

      <div>
        <p className={style.label}>Banner secundário das categorias</p>
        <InputImage
          errors={errors.detailsSecound?.message?.toString()}
          id="detailsSecound"
          imageId={detailsSecoundId}
          imageUrl={detailsSecound}
          isSubmitted={isSubmitted}
          setValue={({link, file_name}) => {
            setValue('detailsSecound', link)
            setValue('detailsSecoundId', file_name)
          }}
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