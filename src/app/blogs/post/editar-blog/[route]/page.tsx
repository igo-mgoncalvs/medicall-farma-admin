'use client'

import BlogForm from '@/components/pagesForm/blogForm'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import BASE_URL_V2 from '@/lib/axios_v2'
import { IBlogs } from '@/utils/interfaces'

export default function EditBlog ({ params }: { params: { route: string } }) {
  const [defaultValues, setDefaultValues] = useState<IBlogs>()

  useEffect(() => {
    BASE_URL_V2.get<IBlogs>(`/blogs/${params.route}`)
      .then(({ data }) => {
        setDefaultValues(data)
      })
  }, [])

  return (
    <div className={styles.container}>
      <p className={styles.title}>Editar Blog</p>

      {defaultValues && (
        <BlogForm
          defaultValues={defaultValues}
        />
      )}      
    </div>
  )
}