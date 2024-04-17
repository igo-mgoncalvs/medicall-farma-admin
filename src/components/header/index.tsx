'use client'

import Link from 'next/link'

import logout from '@/components/icons/logout.svg'

import styles from './styles.module.css'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

function Header () {
  const pathname = usePathname()

  const routes = [
    {
      id: 0,
      activePage: ['/', '/fornecedores', '/clientes', '/cadastrar-produto'],
      route: '/',
      title: 'Cadastros'
    },
    {
      id: 1,
      activePage: ['/paginas'],
      route: '/paginas',
      title: 'Páginas'
    },
    {
      id: 2,
      activePage: ['/usuarios'],
      route: '/usuarios',
      title: 'Usuários'
    }
  ]

  return (
    <div className={styles.header_container}>
      <img
        alt="logo-medicall-farma"
        src={'https://i.postimg.cc/bN2Rw5BB/Logo-Medicall-Horizontal-Cor-1.png'}
        className={styles.logo}
      />

      <div
        className={styles.links_container}
      >
        {routes.map((item) => (
          <Link
            href={item.route}
            key={item.id}
            className={`${pathname === `${item.activePage.find((e) => e === pathname)}` && styles.active}`}
          >
            {item.title}
          </Link>
        ))}
      </div>

      <div
        className={styles.logout}
      >
        <Image
          src={logout}
          alt='logo para sair'
        />
        <p>Sair</p>
      </div>
    </div>
  )
}

export default Header