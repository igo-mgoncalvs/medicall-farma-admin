'use client'

import { usePathname } from 'next/navigation'

import styles from './styles.module.css'
import Link from 'next/link'

export default function LeftMenu() {
  const route = usePathname()

  const types = [
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
      activePage: ['/clientes'],
      route: '/clientes'
    },
  ]

  return (
    <div className={styles.menu_container}>
      <h2>Cadastros</h2>

      <div className={styles.links_container}>
        {types.map((item) => (
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