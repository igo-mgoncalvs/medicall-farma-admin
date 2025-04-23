import styles from './styles.module.css'
import CategoryForm from '@/components/categoryForm'

export default function EditCategory ({ params }: { params: { route: string } }) {
  return (
    <div>
      <p className={styles.title}>Editar Categoria</p>

      <CategoryForm
        id={params.route}
      />
    </div>
  )
}