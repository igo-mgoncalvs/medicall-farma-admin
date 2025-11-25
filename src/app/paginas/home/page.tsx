'use client'

import styles from './styles.module.css'
import { Divider } from '@mui/material'
import CatalogForm from '@/components/pagesForm/home/catalog'
import HomeBanners from '@/components/pagesForm/aboutUs/homeBanners'
import GridBanners from '@/components/pagesForm/home/gridBanners'
import FeaturedProducts from '@/components/pagesForm/home/featuredProducts'
import HomeClients from '@/components/pagesForm/home/clients'
import HomeSuppliers from '@/components/pagesForm/home/suppliers'

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
                id='feb30e4d-d624-4011-a45b-758cbac021a8'
              />
              <GridBanners
                fixed={2}
                id='3d3166ba-9fee-4559-8f27-3d48bf1e1330'
              />
            </div>
            <div className={styles.gridBannersRow}>
              <GridBanners
                fixed={3}
                id='b87d22d9-12d5-4b9b-b30c-99c8fa760ef7'
              />
              <GridBanners
                fixed={4}
                id='3255fa8e-181f-4c22-b22e-79813c46b539'
                />
            </div>
            <GridBanners
              fixed={5}
              id='52971faf-6de4-4292-a40b-dc741fa5a236'
            />
          </div>
        </div>

        <Divider />

        <div>
          <p className={styles.title}>Clientes</p>
          <HomeClients />
        </div>

        <Divider />

        <div>
          <p className={styles.title}>Fornecedores</p>
          <HomeSuppliers />
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
