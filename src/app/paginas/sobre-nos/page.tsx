'use client'

import { Divider } from '@mui/material'

import AboutUsBanners from '@/components/pagesForm/aboutUs/banners'
import AboutUsBannersSpace from '@/components/pagesForm/aboutUs/space/bannersSpace'
import OurHistory from '@/components/pagesForm/aboutUs/ourHistory'
import AboutUsSpace from '@/components/pagesForm/aboutUs/space'
import AboutUsTeam from '@/components/pagesForm/aboutUs/team'

import styles from './styles.module.css'
import AboutUsValues from '@/components/pagesForm/aboutUs/values'
import AboutUsDirectors from '@/components/pagesForm/aboutUs/directors'
import Wellcome from '@/components/pagesForm/aboutUs/wellcome'
import AboutUsSection from '@/components/pagesForm/aboutUs/aboutUsSection'
import AboutUsUnits from '@/components/pagesForm/aboutUs/units'
import HomeBanners from '@/components/pagesForm/aboutUs/homeBanners'
import MedicallAddresses from '@/components/pagesForm/aboutUs/medicallAddresses'

export default function Pages () {

  return (
    <div>
      <div className={styles.forms_container}>
        <div>
          <p className={styles.title}>Boas Vindas</p>
          <Wellcome />
        </div>

        <Divider />
        
        <div>
          <p className={styles.title}>Sobre nós</p>
          <AboutUsSection />
        </div>

        <Divider />

        <div>
          <p className={styles.title}>Unidades</p>
          <AboutUsUnits />
        </div>

        <Divider />

        <div>
          <p className={styles.title}>Endereços Medicall</p>
          <MedicallAddresses />
        </div>

        <Divider />



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
          <AboutUsTeam />
        </div>

        <Divider />
        
        <div>
          <p className={styles.title}>Nosso Espaço</p>
          <AboutUsSpace />
          <AboutUsBannersSpace />
        </div>

        <Divider />
        
        <div>
          <p className={styles.title}>Valores</p>
          <AboutUsValues />
        </div>

        <Divider />
        
        <div>
          <p className={styles.title}>Diretores</p>
          <AboutUsDirectors />
        </div>
      </div>
    </div>
  )
}
