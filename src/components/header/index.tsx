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
  const navigation = useRouter()
  const routeEdit = pathname.replace('/', '') || 'home'

  const auth = useContext(AuthContext)

  const routes = [
    {
      id: 0,
      activePage: [
        'home',
        'cadastrar-produto',
        'cadastrar-grupo',
        'cadastrar-fornecedor',
        'cadastrar-cliente',
        'editar-produto',
        'editar-grupo',
        'editar-fornecedor',
        'editar-cliente',
        'fornecedores',
        'grupos',
        'clientes'
      ],
      route: '/',
      title: 'Cadastros'
    },
    {
      id: 1,
      activePage: [
        'paginas',
      ],
      route: '/paginas/home',
      title: 'Páginas'
      
    },
    {
      id: 2,
      activePage: ['/usuarios', '/usuarios/novo-usuario', 'usuarios'],
      route: '/usuarios',
      title: 'Usuários'
    }
  ]

  const handleSingout = () => {
    auth.signout()
    navigation.replace('/login')
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
            className={`${item.activePage.find((e) => routeEdit.startsWith(e)) ? styles.active: ''}`}
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