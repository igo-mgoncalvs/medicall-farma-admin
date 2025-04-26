'use client'

import MainForm from '@/components/pagesForm/home/main'

import styles from './styles.module.css'
import { Divider } from '@mui/material'
import HomeWelcomeForm from '@/components/pagesForm/home/welcome'
import CatalogForm from '@/components/pagesForm/home/catalog'
import HomeProductsForm from '@/components/pagesForm/home/products'
import HomeProductsList from '@/components/pagesForm/home/products/list'
import HomeBanners from '@/components/pagesForm/aboutUs/homeBanners'
import GridBanners from '@/components/pagesForm/home/gridBanners'
import FeaturedProducts from '@/components/pagesForm/home/featuredProducts'

export default function Pages () {

  return (
    <div>
      <div className={styles.forms_container}>
        <div>
          <p className={styles.title}>Banners da Home</p>
          <HomeBanners />
        </div>

        <Divider />

        <div>
          <p className={styles.title}>Produtos Destaques</p>
          <FeaturedProducts />
        </div>

        <Divider />

        <div>
          <p className={styles.title}>Grid de Banners</p>

          <div className={styles.gridBanners}>
            <div className={styles.gridBannersFixed}>
              <GridBanners
                fixed={1}
                id='9b877cbb-c816-4b8a-abd7-cb2e8b616945'
              />
              <GridBanners
                fixed={2}
                id='8fc15075-426f-439a-9684-d62b696f4c89'
              />
            </div>
            <div className={styles.gridBannersRow}>
              <GridBanners
                fixed={3}
                id='9557d667-ba61-4df9-bff5-e704d5cc5b46'
              />
              <GridBanners
                fixed={4}
                id='6a90e5fe-b732-4670-8447-c82e741f419f'
                />
            </div>
            <GridBanners
              fixed={5}
              id='a7782119-792c-4625-99c0-b5dca6d949f9'
            />
          </div>
        </div>

        <Divider />



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
