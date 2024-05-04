'use client'

import { usePathname } from 'next/navigation'

import styles from './styles.module.css'
import Link from 'next/link'

export default function LeftMenu() {
  const route = usePathname()
  const routeEdit = route.replace('/', '') || 'home'

  const types = [
    {
      page: '/',
      activeMenu: [
        'home',
        'grupos',
        'fornecedores',
        'clientes',
        'cadastrar-produto',
        'cadastrar-grupo',
        'cadastrar-fornecedor',
        'cadastrar-cliente',
        'editar-produto',
        'editar-grupo',
        'editar-fornecedor',
        'editar-cliente'
      ], 
      page_name: 'Cadastros',
      menus: [
        {
          id: 0,
          title: 'Produtos',
          activePage: ['home', 'cadastrar-produto', 'editar-produto'],
          route: '/'
        },
        {
          id: 1,
          title: 'Grupos',
          activePage: ['grupos', 'cadastrar-grupo', 'editar-grupo'],
          route: '/grupos'
        },
        {
          id: 2,
          title: 'Fornecedores',
          activePage: ['fornecedores', 'cadastrar-fornecedor', 'editar-fornecedor'],
          route: '/fornecedores'
        },
        {
          id: 3,
          title: 'Clientes',
          activePage: ['clientes', 'cadastrar-cliente', 'editar-cliente'],
          route: '/clientes'
        },
      ]
    },
    {
      page_name: 'Páginas',
      page: '/paginas',
      activeMenu: ['paginas', '/paginas/produtos', '/paginas/sobre-nos', '/paginas/fornecedores', '/paginas/contato'], 
      menus: [
        {
          id: 0,
          title: 'Home',
          activePage: ['paginas/home'],
          route: '/paginas/home'
        },
        {
          id: 1,
          title: 'Sobre nós',
          activePage: ['paginas/sobre-nos'],
          route: '/paginas/sobre-nos'
        },
        {
          id: 2,
          title: 'Fornecedores',
          activePage: ['paginas/fornecedores'],
          route: '/paginas/fornecedores'
        },
        {
          id: 3,
          title: 'Contato Whatsapp',
          activePage: ['paginas/contato'],
          route: '/paginas/contato'
        },
        {
          id: 4,
          title: 'Contato Email',
          activePage: ['paginas/email'],
          route: '/paginas/email'
        },
      ]
    },
    {
      page_name: 'Usuário',
      page: '/usuarios',
      activeMenu: ['usuarios'], 
      menus: [
        {
          id: 0,
          title: 'Usuários',
          activePage: ['usuarios', 'usuarios/novo-usuario'],
          route: '/usuarios'
        }
      ]
    }
  ]
  
  return (
    <div className={styles.menu_container}>
      <h2>{types.find(e => e.activeMenu.find((page) => routeEdit.startsWith(page)))?.page_name}</h2>
      <div className={styles.links_container}>
        {types.find(e => e.activeMenu.find((page) => routeEdit.startsWith(page)))?.menus.map((item) => (
          <Link
            key={item.id}
            className={`${styles.link} ${item.activePage.find((page) => routeEdit.startsWith(page))&& styles.link_active}`}
            href={item.route}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  )
} 