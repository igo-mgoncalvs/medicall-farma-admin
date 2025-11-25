'use client'

import { useState, useEffect } from 'react'
import { GridColDef, GridRowsProp } from '@mui/x-data-grid'
import Link from 'next/link'
import { toast } from 'react-toastify'

import TableComponent from '@/components/tableComponent'
import TableActions from '@/components/tableComponent/actions'
import AddIcon from '@/components/icons/add'

import { IBlogs, IUsers } from '@/utils/interfaces'

import styles from './styles.module.css'
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL_V2 from '@/lib/axios_v2';


export default function MedicallCast () {
  const [rows, setRows] = useState<GridRowsProp[]>([])
  
  const getBlogs = async () => {
    BASE_URL_V2.get('/blogs')
      .then(({data}) => {
        setRows(data)
      })
  }

  useEffect(() => {
    getBlogs()
  }, [])

  const handleDeleteProduct = ({ id }: { id: string }) => {
    toast.info('Aguarde um instante', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    BASE_URL_V2.delete(`/blog/${id}`)
      .then(() => {
        toast.dismiss()
        toast.success('Blog excluido com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: false,
        });

        getBlogs()
      })
      .catch(() => {
        toast.dismiss()
        toast.error('Erro ao excluir o blog', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
  }

  const UsersColumns: GridColDef[] = [
    {
      field: 'action',
      headerName: 'Ações',
      flex: 1,
      headerAlign: 'center',
      renderCell: ({ row } : {row: IBlogs}) =>{
        return TableActions({
        editRoute: `/blogs/editar-blog/${row.id}`,
        onDelete: () => handleDeleteProduct({ id: row.id }),
        diabledDelete: row.relatedTo.length > 0
      })}
    },
    { 
      field: 'date',
      headerName: 'Data',
      disableColumnMenu: true,
      width: 180,
      valueFormatter: (value) => new Date(value).toLocaleString('pt-BR'),
      sortable: false,
    },
    { 
      field: 'title',
      headerName: 'Título',
      flex: 2,
      disableColumnMenu: true,
      sortable: false,
    },
    { 
      field: 'resume',
      headerName: 'Resumo',
      flex: 3,
      disableColumnMenu: true,
      sortable: false,
    },
  ]

  return (
    <div>
      <div className={styles.function_bar}>
        <p className={styles.title}>Usuário</p>

        <div className={styles.functions_container}>
          <Link
            href={'/blogs/novo-blog'}
            className={`${styles.buttons} ${styles.button_blue}`}
            >
            <AddIcon
              className={styles.button_blue_icon}
            />
            <p>
              Adicionar Blog
            </p>
          </Link>
        </div>
      </div>

      {rows && (
        <div
          className={styles.table}
        >
          <TableComponent
            columns={UsersColumns}
            rows={rows}
          />
        </div>
      )}
    </div>
  )
}
