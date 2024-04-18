'use client'

import { usePathname } from 'next/navigation'

import styles from './styles.module.css'
import Link from 'next/link'

export default function LeftMenu() {
  const route = usePathname()

  const types = [
    {
      page: '/',
      activeMenu: ['/', '/grupos', '/fornecedores', '/clientes', '/cadastrar-produto', '/cadastrar-grupo', '/cadastrar-fornecedor', '/cadastrar-cliente'], 
      page_name: 'Cadastros',
      menus: [
        {
          id: 0,
          title: 'Produtos',
          activePage: ['/', '/cadastrar-produto'],
          route: '/'
        },
        {
          id: 1,
          title: 'Grupos',
          activePage: ['/grupos', '/cadastrar-grupo'],
          route: '/grupos'
        },
        {
          id: 2,
          title: 'Fornecedores',
          activePage: ['/fornecedores', '/cadastrar-fornecedor'],
          route: '/fornecedores'
        },
        {
          id: 3,
          title: 'Clientes',
          activePage: ['/clientes', '/cadastrar-cliente'],
          route: '/clientes'
        },
      ]
    },
    {
      page_name: 'Páginas',
      page: '/paginas',
      activeMenu: ['/paginas', '/paginas/produtos', '/paginas/sobre-nos', '/paginas/fornecedores'], 
      menus: [
        {
          id: 0,
          title: 'Home',
          activePage: ['/paginas'],
          route: '/paginas'
        },
        {
          id: 1,
          title: 'Produtos',
          activePage: ['/paginas/produtos'],
          route: '/paginas/produtos'
        },
        {
          id: 2,
          title: 'Sobre nós',
          activePage: ['/paginas/sobre-nos'],
          route: '/paginas/sobre-nos'
        },
        {
          id: 3,
          title: 'Fornecedores',
          activePage: ['/paginas/fornecedores'],
          route: '/paginas/fornecedores'
        },
      ]
    }
  ]
  
  return (
    <div className={styles.menu_container}>
      <h2>{types.find(e => e.activeMenu.find(page => page === route))?.page_name}</h2>
      <div className={styles.links_container}>
        {types.find(e => e.activeMenu.find(page => page === route))?.menus.map((item) => (
          <Link
            key={item.id}
            className={`${styles.link} ${item.activePage.find((e) => e === route)&& styles.link_active}`}
            href={item.route}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  )
} 