import PrivacyPolicy from "@/components/pagesForm/suppliers/privacyPolicy";

import styles from './styles.module.css'
import FooterForm from "@/components/pagesForm/footer/footerForm";
import { Divider } from "@mui/material";
import HomeBanners from "@/components/pagesForm/aboutUs/homeBanners";
import FooterLinks from "@/components/pagesForm/footer/footerLinks";
import FooterSocial from "@/components/pagesForm/footer/footerSocial";

export default function Footer () {
  return (
    <div>
      <div className={styles.forms_container}>
        <div>
          <p className={styles.title}>Descrição</p>
          <FooterForm />
        </div>

        <Divider />

        <div>
          <p className={styles.title}>Links</p>
          <FooterLinks />
        </div>

        <Divider />

        <div>
          <p className={styles.title}>Redes Sociais</p>
          <FooterSocial />
        </div>
      </div>
    </div>
  )
}