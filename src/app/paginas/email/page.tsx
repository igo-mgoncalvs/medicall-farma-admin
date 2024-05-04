import ContactEmailForm from "@/components/pagesForm/email";

import styles from './styles.module.css'

export default function Contact () {
  return (
    <div>
      <div className={styles.forms_container}>
        <div>
          <p className={styles.title}>Contato que receberá os e-mails</p>
          <ContactEmailForm />
        </div>
      </div>
    </div>
  )
}