import FooterForm from "@/components/pagesForm/footer/footerForm";
import FooterLinks from "@/components/pagesForm/footer/footerLinks";
import FooterSocial from "@/components/pagesForm/footer/footerSocial";

import styles from './styles.module.css'

export default function Footer () {
  return (
    <div>
      <div className={styles.forms_container}>
        <div>
          <p className={styles.title}>Descrição</p>
          <FooterForm />
        </div>

        {/* <Divider /> */}

        <div>
          <p className={styles.title}>Links</p>
          <FooterLinks />
        </div>
       

        {/* <Divider /> */}

        <div>
          <p className={styles.title}>Redes Sociais</p>
          <FooterSocial />
        </div>
      </div>
    </div>
  )
}