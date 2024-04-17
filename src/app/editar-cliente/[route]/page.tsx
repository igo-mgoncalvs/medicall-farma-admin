import GroupForm from '@/components/groupForm'

import styles from './styles.module.css'
import SupplierForm from '@/components/supplierForm'
import ClientsForm from '@/components/clientsForm'

export default function EditProduct ({ params }: { params: { route: string } }) {
  return (
    <div>
      <p className={styles.title}>Editar Cliente</p>
      
      <ClientsForm
        id={params.route}
      />
    </div>
  )
}