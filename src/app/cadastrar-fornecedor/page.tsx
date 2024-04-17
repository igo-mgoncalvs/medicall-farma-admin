import SupplierForm from '@/components/supplierForm'

import styles from './styles.module.css'

export default function AddSupplier () {
  return (
    <div>
      <p className={styles.title}>Cadastrar Forncedor</p>

      <SupplierForm />
    </div>
  )
}