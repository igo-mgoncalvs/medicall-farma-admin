import UsersForm from "@/components/usersForm";

import styles from './styles.module.css'

export default function Users ({ params }: { params: { id: string } }) {
  return (
    <div>
      <p className={styles.title}>Editar produto</p>
      
      <UsersForm
        id={params.id}
      />
    </div>
  )
}