import AddressForm from "@/components/pagesForm/address";

import styles from './styles.module.css'

export default function Endereço () {
  return (
    <div>
      <div className={styles.forms_container}>
        <div>
          <p className={styles.title}>Endereço</p>
          <AddressForm />
        </div>
      </div>
    </div>
  )
}