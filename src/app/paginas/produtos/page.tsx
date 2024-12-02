import LogosForm from "@/components/pagesForm/logos";

import styles from './styles.module.css'
import ProductsBanners from "@/components/pagesForm/productsBanners";

export default function Basners () {
  return (
    <div className={styles.forms_container}>
      <p className={styles.title}>Logos</p>
      <ProductsBanners />
    </div>
  )
}