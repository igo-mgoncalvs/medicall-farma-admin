'use client'

import BlogForm from "@/components/pagesForm/blogForm";
import styles from './styles.module.css'

export default function NewBlog () {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Cadastrar blog</p>
      
      <BlogForm />
    </div>
  )
}