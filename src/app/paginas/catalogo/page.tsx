import CatalogForm from '@/components/pagesForm/catalog'

import styles from './styles.module.css'

export default function Catalog () {
  return (
    <div className={styles.forms_container}>
      <p className={styles.title}>Catalogo</p>
      <CatalogForm />
    </div>
  )
}