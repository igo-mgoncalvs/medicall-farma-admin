import SupplierForm from '@/components/supplierForm'

import styles from './styles.module.css'

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