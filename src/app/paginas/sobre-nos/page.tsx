'use client'

import AboutUsBanners from '@/components/pagesForm/aboutUs/banners'

import styles from './styles.module.css'

export default function Pages () {

  return (
    <div>
      <div className={styles.forms_container}>
        <div>
          <p className={styles.title}>Banners</p>
          <AboutUsBanners />
        </div>
      </div>
    </div>
  )
}
