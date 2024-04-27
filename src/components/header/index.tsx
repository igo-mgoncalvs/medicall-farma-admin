'use client'

import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import logout from '@/components/icons/logout.svg'
import AuthContext from '@/context/auth'

import styles from './styles.module.css'

function Header () {
  const pathname = usePathname()
  const navigate = useRouter()

  const auth = useContext(AuthContext)

  const routes = [
    {
      id: 0,
      activePage: [
        '/',
        '/fornecedores',
        '/clientes',
        '/cadastrar-produto',
        '/cadastrar-grupo',
        '/cadastrar-fornecedor',
        '/cadastrar-cliente'
      ],
      route: '/',
      title: 'Cadastros'
    },
    {
      id: 1,
      activePage: [
        '/paginas',
        '/paginas/produtos',
        '/paginas/sobre-nos',
        '/paginas/fornecedores',
        '/paginas/contato'
      ],
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

  const handleSingout = () => {
    auth.signout()
    navigate.replace('/login')
  }

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
        onClick={handleSingout}
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