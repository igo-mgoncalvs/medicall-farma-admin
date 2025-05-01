'use client'

import { Divider } from '@mui/material'

import AboutUsSpace from '@/components/pagesForm/aboutUs/space'

import styles from './styles.module.css'
import Wellcome from '@/components/pagesForm/aboutUs/wellcome'
import AboutUsSection from '@/components/pagesForm/aboutUs/aboutUsSection'
import AboutUsUnits from '@/components/pagesForm/aboutUs/units'
import MedicallAddresses from '@/components/pagesForm/aboutUs/medicallAddresses'
import AboutUsTeam from '@/components/pagesForm/aboutUs/aboutUsTeam'
import OurSpaceImages from '@/components/pagesForm/aboutUs/ourSpaceImages'
import ValuesForm from '@/components/pagesForm/aboutUs/valuesForm'

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
          <p className={styles.title}>Nossa Equipe</p>
          <AboutUsTeam />
        </div>

        <Divider />

        <div>
          <p className={styles.title}>Nosso Espaço</p>
          <AboutUsSpace />
          <OurSpaceImages />
        </div>
        
        <Divider />

        <div>
          <p className={styles.title}>Valores</p>
          <ValuesForm />
        </div>
      </div>
    </div>
  )
}
