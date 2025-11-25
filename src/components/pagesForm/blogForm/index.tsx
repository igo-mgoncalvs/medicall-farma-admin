'use client'

import Editor from "@/components/editor";
import { IBlogs } from "@/utils/interfaces";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import styles from './styles.module.css'
import InputImage from "@/components/inputImage";
import BASE_URL_V2 from "@/lib/axios_v2";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
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
  const [relatedBlogs, setRelatedBlogs] = useState<IBlogs['relatedBlogs']>([])
  const [similarProducts, setSimilarProducts] = useState<IBlogs['similarProducts']>([])

  const { control, setValue, reset, handleSubmit, formState: { isSubmitted } } =  useForm<IBlogs>({
    defaultValues
  })

  const navigation = useRouter()

  const getBlog = (id: string) => {
    BASE_URL_V2.get<IBlogs>(`/blogs/${id}`)
      .then(({data}) => {
        reset(data)
        setRelatedBlogs(data.relatedBlogs)
      })
  }

  useEffect(() => {
    if(defaultValues?.relatedBlogs.length) {
      setRelatedBlogs(defaultValues.relatedBlogs)
      setManualId(false)
    }
  }, [defaultValues, manualAdd])

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

    const url = new URL(data.similarProducts[0].productLink)
    const searchParams = url.searchParams.get('v')

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
            similarProducts: data.similarProducts.map((product) => ({
              ...product,
              productLink: searchParams ? `https://www.youtube.com/embed/${searchParams}` : product.productLink
            })) || undefined
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

  const handleAddRelated = useCallback((id: unknown) => {
    if(defaultValues) {
      BASE_URL_V2.post('blog-related', {
        blogId: defaultValues.id,
        blogRelatedId: id,
        blogRelatedTitle: blogs.find((item) => item.id === id)?.title || ''
      })
        .then(() => {
          getBlog(defaultValues.id)
        })
    }
  }, [defaultValues])

  const handleDelete = useCallback((id: string) => {
    if(defaultValues) {
      BASE_URL_V2.delete(`/blog-related/${id}`)
        .then(() => {
          getBlog(defaultValues.id)
          toast.success('Relacionamento deletado com sucesso!', {
            pauseOnFocusLoss: false
          })
        })
    }
  }, [])

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

      {defaultValues?.id && (
        <div className={styles.reletad_blogs}>
          <h3>Blogs Relacionados</h3>

          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">Selecione um blog para adicionar a lista</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Selecione um blog para adicionar a lista"
              onChange={(event) => {
                if(!relatedBlogs.find((item) => item.blogId === event.target.value)) {
                  handleAddRelated(event.target.value)
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
            rows={relatedBlogs.map((item, index) => ({
              ...item,
              action: () => (
                <GridDeleteIcon
                  onClick={() => handleDelete(item.id || '')}
                  className={`${styles.action_icon_delete}`}
                />
              )
            }))}
          />
        </div>
      )}

      <div className={styles.reletad_blogs}>
        <h3>Produtos Semelhantes</h3>

        <FormControl>
          <InputLabel id="demo-simple-select-helper-label">Selecione um produto já existente</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Selecione um produto já existente"
            onChange={(event) => {
              if(!similarProducts.find((item) => item.id === event.target.value)) {
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