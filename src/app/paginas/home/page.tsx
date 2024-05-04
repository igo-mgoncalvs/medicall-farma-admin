'use client'

import MainForm from '@/components/pagesForm/home/main'

import styles from './styles.module.css'
import { Divider, FormControlLabel, Switch } from '@mui/material'
import HomeWelcomeForm from '@/components/pagesForm/home/welcome'
import CatalogForm from '@/components/pagesForm/home/catalog'
import HomeProductsForm from '@/components/pagesForm/home/products'
import HomeProductsList from '@/components/pagesForm/home/products/list'

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
          <p className={styles.title}>Produtos</p>
          <HomeProductsForm />
          <HomeProductsList />
        </div>

        <Divider />
        
        <div>
          <p className={styles.title}>Catálogo</p>
          <CatalogForm />
        </div>
      </div>
    </div>
  )
}
