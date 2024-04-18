'use client'

import MainForm from '@/components/pagesForm/home/main'

import styles from './styles.module.css'
import { Divider } from '@mui/material'

export default function Pages () {

  return (
    <div>

      <div className={styles.forms_container}>
        <div>
          <p className={styles.title}>Home</p>
          <MainForm />
        </div>

        <Divider />

      </div>
    </div>
  )
}
