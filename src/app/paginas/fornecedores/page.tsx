import SuppliersForm from "@/components/pagesForm/suppliers";

import styles from './styles.module.css'
import { Divider } from "@mui/material";
import OurHistory from "@/components/pagesForm/aboutUs/ourHistory";
import PrivacyPolicy from "@/components/pagesForm/suppliers/privacyPolicy";

export default function Suppliers () {
  return (
    <div>
      <div className={styles.forms_container}>
        <div>
          <p className={styles.title}>Fornecedores</p>
          <SuppliersForm />
        </div>

        <Divider />

        <div>
          <p className={styles.title}>Política da qualidade</p>
          <PrivacyPolicy />
        </div>
      </div>
    </div>
  )
}