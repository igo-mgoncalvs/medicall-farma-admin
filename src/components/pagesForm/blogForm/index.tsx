'use client'

import Editor from "@/components/editor";
import { IBlogs, IUsers } from "@/utils/interfaces";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import styles from './styles.module.css'
import InputImage from "@/components/inputImage";
import BASE_URL_V2 from "@/lib/axios_v2";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import TableActions from "@/components/tableComponent/actions";
import TableComponent from "@/components/tableComponent";
import { LoadingButton } from "@mui/lab";

export default function BlogForm ({
  defaultValues
}: {
  defaultValues?: IBlogs
}) {
  const [manualAdd, setManualId] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [blogs, setBlogs] = useState<IBlogs[]>([])
  const [similarProducts, setSimilarProducts] = useState<IBlogs['similarProducts']>([])

  const { control, setValue, handleSubmit, formState: { isSubmitted } } =  useForm<IBlogs>({
    defaultValues
  })

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'relatedBlogs'
  })

  const navigation = useRouter()

  useEffect(() => {
    if(defaultValues?.relatedBlogs.length && fields.length === 0 && manualAdd) {
      append(defaultValues.relatedBlogs)
      setManualId(false)
    }
  }, [defaultValues, fields, manualAdd])

  useEffect(() => {
    BASE_URL_V2.get<IBlogs[]>('/blogs')
      .then(({ data }) => {
        setBlogs(data)
      })

    BASE_URL_V2.get<IBlogs['similarProducts']>('/blogs/similar-products')
      .then(({ data }) => {
        setSimilarProducts(data)
      })
  }, [])

  const onSubmit = useCallback(async (data: IBlogs) => {
    setLoading(true)

    if(!defaultValues) {
      BASE_URL_V2.post('/blog-image', {
         alt: data.title,
         src: data.image.src
       })
         .then((reponse) => {
           BASE_URL_V2.post('/blogs', {
            title: data.title,
            resume: data.resume,
            content: data.content,
            imageId: reponse.data.id,
            relatedBlogs: data.relatedBlogs.map((item) => ({
              title: item.title,
              relatedId: item.blogRelatedId
            })),
            similarProducts: data.similarProducts?.[0] || undefined
           })
             .then(() => {
                toast.success('Blog cadastrado com sucesso!')
                navigation.back()
              })
             .catch(() => {
                toast.error('Erro ao cadastrar o blog')
              })
              .finally(() => {
                setLoading(false)
              })
         })
         .catch(() => {
            toast.error('Erro ao enviar a imagem')
            setLoading(false)
          })
      } else {
        BASE_URL_V2.post('/blog-image', {
          alt: data.title,
          src: data.image.src
        })
          .then((reponse) => {
            BASE_URL_V2.put(`/blogs/${defaultValues.id}`, {
              title: data.title,
              resume: data.resume,
              content: data.content,
              imageId: reponse.data.id,
              relatedBlogs: data.relatedBlogs.map((item) => ({
                title: item.title,
                relatedId: item.blogRelatedId
              })),
              similarProducts: data.similarProducts?.[0] || undefined
            })
              .then(() => {
                toast.success('Blog editado com sucesso!')
                navigation.back()
              })
              .catch(() => {
                toast.error('Erro ao editar o blog')
              })
              .finally(() => {
                setLoading(false)
              })
          })
          .catch(() => {
            toast.error('Erro ao enviar a imagem')
            setLoading(false)
          })
    }
  }, [defaultValues])

  const UsersColumns: GridColDef[] = [
      {
        field: 'action',
        headerName: 'Ações',
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        renderCell: ({row}) => row.action(),
        disableColumnMenu: true,
      },
      { 
        field: 'title',
        headerName: 'Título',
        flex: 2,
        disableColumnMenu: true,
        sortable: false,
      }
    ]

  return (
    <form
      id="form-new-blog"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.container}
    >
      <Controller
        name='image.src'
        control={control}
        render={({field: { onChange, value }, fieldState: { error }}) => (
          <InputImage
            errors={error?.message?.toString()}
            src={value}
            id="blog-image"
            isSubmitted={isSubmitted}
            onChange={({src}) => {
              onChange(src)
            }}
          />
        )}
      />

      <Controller
        name="title"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextField
            label='Titulo do blog'
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
        name="resume"
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextField
            label='Resumo'
            value={value}
            error={!!error}
            multiline
            rows={5}
            helperText={error?.message}
            onChange={(e) => {
              onChange(e)
            }}
          />
        )}
      /> 

      <Controller
        name='content'
        control={control}
        render={({ field: { value, onChange } }) => (
          <Editor
            value={value}
            onChange={(event) => {
              onChange(event)
            }}
          />
        )}
      />

      <div className={styles.reletad_blogs}>
        <h3>Blogs Relacionados</h3>

        <FormControl>
          <InputLabel id="demo-simple-select-helper-label">Selecione um blog para adicionar a lista</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Selecione um blog para adicionar a lista"
            onChange={(event) => {
              if(!fields.find((item) => item.blogId === event.target.value)) {
                append({
                  title: blogs.find((item) => item.id === event.target.value)?.title || '',
                  blogRelatedId: event.target.value as string,
                })
              }
            }}
          >
            {blogs.filter((item) => item.id !== defaultValues?.id)?.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
              >
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TableComponent
          columns={UsersColumns}
          rows={fields.map((item, index) => ({
            ...item,
            action: () => (
              <GridDeleteIcon
                onClick={() => remove(index)}
                className={`${styles.action_icon_delete}`}
              />
            )
          }))}
        />
      </div>

      <div className={styles.reletad_blogs}>
        <h3>Produtos Semelhantes</h3>

        <FormControl>
          <InputLabel id="demo-simple-select-helper-label">Selecione um produto já existente</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Selecione um produto já existente"
            onChange={(event) => {
              if(!fields.find((item) => item.blogId === event.target.value)) {
                const product = similarProducts.find((item) => item.id === event.target.value)

                setValue('similarProducts.0', {
                  title: product?.title || '',
                  description: product?.description || '',
                  productLink: product?.productLink || ''
                })
              }
            }}
          >
            {similarProducts?.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
              >
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Controller
          name="similarProducts.0.productLink"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextField
              label='Link do vídeo'
              value={value}
              defaultValue=' '
              error={!!error}
              helperText={error?.message}
              onChange={(e) => {
                onChange(e)
              }}
            />
          )}
        />

        <Controller
          name="similarProducts.0.title"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextField
              label='Titulo'
              value={value}
              defaultValue=' '
              error={!!error}
              helperText={error?.message}
              onChange={(e) => {
                onChange(e)
              }}
            />
          )}
        />

        <Controller
          name="similarProducts.0.description"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextField
              label='Descrição'
              value={value}
              defaultValue=' '
              error={!!error}
              multiline
              rows={5}
              helperText={error?.message}
              onChange={(e) => {
                onChange(e)
              }}
            />
          )}
        /> 
      </div>


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