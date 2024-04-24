import ContactForm from "@/components/pagesForm/contact";

import styles from './styles.module.css'

export default function Suppliers () {
  return (
    <div>
      <div className={styles.forms_container}>
        <div>
          <p className={styles.title}>Contato Whatsapp</p>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}