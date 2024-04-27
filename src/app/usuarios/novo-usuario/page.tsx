import UsersForm from "@/components/usersForm";

import styles from './styles.module.css'

export default function AddUser () {
  return (
    <div>
      <p className={styles.title}>Cadastrar produto</p>

      <UsersForm />
    </div>
  )
}