import styles from './styles.module.css'
import FloatingButtons from '@/components/pagesForm/aboutUs/floatingButtons'

export default function FloatButtons () {
  return (
    <div>
      <p className={styles.title}>Botões Flutuantes</p>
      <FloatingButtons />
    </div>

  )
}