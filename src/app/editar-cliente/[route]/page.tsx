import ClientsForm from '@/components/clientsForm'

import styles from './styles.module.css'

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