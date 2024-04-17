import GroupForm from '@/components/groupForm'

import styles from './styles.module.css'

export default function EditProduct ({ params }: { params: { route: string } }) {
  return (
    <div>
      <p className={styles.title}>Editar grupo</p>
      
      <GroupForm
        id={params.route}
      />
    </div>
  )
}