import GroupForm from '@/components/groupForm'
import styles from './styles.module.css'

export default function AddGroup () {
  return (
    <div>
      <p className={styles.title}>Cadastrar Grupo</p>

      <GroupForm />
    </div>
  )
}