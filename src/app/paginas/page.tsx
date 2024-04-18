'use client'

import MainForm from '@/components/pagesForm/home/main'

import styles from './styles.module.css'
import { Divider } from '@mui/material'
import HomeWelcomeForm from '@/components/pagesForm/home/welcome'
import CatalogForm from '@/components/pagesForm/home/catalog'

export default function Pages () {

  return (
    <div>

      <div className={styles.forms_container}>
        <div>
          <p className={styles.title}>Home</p>
          <MainForm />
        </div>

        <Divider />

        <div>
          <p className={styles.title}>Boas Vindas</p>
          <HomeWelcomeForm />
        </div>

        <Divider />
        
        <div>
          <p className={styles.title}>Catalogo</p>
          <CatalogForm />
        </div>
      </div>
    </div>
  )
}
