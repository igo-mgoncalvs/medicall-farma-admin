import styles from './styles.module.css'
import CategoryForm from '@/components/categoryForm'

export default function AddCategory () {
  return (
    <div>
      <p className={styles.title}>Cadastrar Categoria</p>

      <CategoryForm />
    </div>
  )
}