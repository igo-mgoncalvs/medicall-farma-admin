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
      routes: '/'
    },
    {
      id: 1,
      title: 'Fornecedores',
      routes: '/fornecedores'
    },
    {
      id: 2,
      title: 'Clientes',
      routes: '/clientes'
    },
  ]

  return (
    <div className={styles.menu_container}>
      <h2>Cadastros</h2>

      <div className={styles.links_container}>
        {types.map((item) => (
          <Link
            key={item.id}
            className={`${styles.link} ${route === item.routes && styles.link_active}`}
            href={item.routes}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  )
} 