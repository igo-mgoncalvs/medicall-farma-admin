import styles from './styles.module.css'
import ProductForm from '@/components/productForm'

export default function AddProduct () {
  return (
    <div>
      <p className={styles.title}>Cadastrar produto</p>
      
      <ProductForm />
    </div>
  )
}