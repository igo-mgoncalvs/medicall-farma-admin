import ClientsForm from '@/components/clientsForm'

import styles from './styles.module.css'

export default function AddSupplier () {
  return (
    <div>
      <p className={styles.title}>Cadastrar Cliente</p>

      <ClientsForm />
    </div>
  )
}