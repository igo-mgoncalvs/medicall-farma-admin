'use client'

import AboutUsBanners from '@/components/pagesForm/aboutUs/banners'
import AboutUsBannersSpace from '@/components/pagesForm/aboutUs/space/bannersSpace'

import styles from './styles.module.css'
import { Divider } from '@mui/material'
import OurHistory from '@/components/pagesForm/aboutUs/ourHistory'
import ProductsForm from '@/components/pagesForm/aboutUs/products'
import AboutUsSpace from '@/components/pagesForm/aboutUs/space'

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

        <Divider />
        
        <div>
          <p className={styles.title}>Nosso Espaço</p>
          <AboutUsSpace />
          <AboutUsBannersSpace />
        </div>
      </div>
    </div>
  )
}
