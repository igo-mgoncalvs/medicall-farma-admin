
import SuppliersForm from "@/components/pagesForm/suppliers";
import PrivacyPolicy from "@/components/pagesForm/suppliers/privacyPolicy";

import styles from './styles.module.css'

export default function SuppliersPage () {
  return (
    <div>
      <div className={styles.forms_container}>
        <div>
          <p className={styles.title}>Fornecedores</p>
          <SuppliersForm />
        </div>

        <div>
          <p className={styles.title}>Política da qualidade</p>
          <PrivacyPolicy />
        </div>
      </div>
    </div>
  )
}