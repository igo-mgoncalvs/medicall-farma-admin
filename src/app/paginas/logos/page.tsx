import LogosForm from "@/components/pagesForm/logos";

import styles from './styles.module.css'

export default function Logos () {
  return (
    <div className={styles.forms_container}>
      <p className={styles.title}>Logos</p>
      <LogosForm />
    </div>
  )
}