import GroupForm from '@/components/groupForm'

import styles from './styles.module.css'
import SupplierForm from '@/components/supplierForm'

export default function EditProduct ({ params }: { params: { route: string } }) {
  return (
    <div>
      <p className={styles.title}>Editar Fornecedor</p>
      
      <SupplierForm
        id={params.route}
      />
    </div>
  )
}