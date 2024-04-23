'use client'

import AboutUsBanners from '@/components/pagesForm/aboutUs/banners'

import styles from './styles.module.css'
import { Divider } from '@mui/material'
import OurHistory from '@/components/pagesForm/aboutUs/ourHistory'
import ProductsForm from '@/components/pagesForm/aboutUs/products'

export default function Pages () {

  return (
    <div>
      <div className={styles.forms_container}>
        <div>
          <p className={styles.title}>Banners</p>
          <AboutUsBanners />
        </div>

        <Divider />
        
        <div>
          <p className={styles.title}>História</p>
          <OurHistory />
        </div>

        <Divider />
        
        <div>
          <p className={styles.title}>Nossa Equipe</p>
          <ProductsForm />
        </div>
      </div>
    </div>
  )
}
