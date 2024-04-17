import ProductForm from '@/components/productForm'
import styles from './styles.module.css'

export default function EditProduct ({ params }: { params: { route: string } }) {
  return (
    <div>
      <p className={styles.title}>Editar produto</p>
      
      <ProductForm
        id={params.route}
      />
    </div>
  )
}