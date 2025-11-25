'use client'

import MedicallCastForm from "@/components/pagesForm/medicallCastForm";
import styles from './styles.module.css'

export default function NewBlog () {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Cadastrar episódio</p>
      
      <MedicallCastForm />
    </div>
  )
}