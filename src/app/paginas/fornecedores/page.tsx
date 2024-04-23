import SuppliersForm from "@/components/pagesForm/suppliers";

import styles from './styles.module.css'

export default function Suppliers () {
  return (
    <div>
      <div className={styles.forms_container}>
        <div>
          <p className={styles.title}>Fornecedores</p>
          <SuppliersForm />
        </div>
      </div>
    </div>
  )
}