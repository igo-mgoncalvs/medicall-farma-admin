'use client'

import { useState, useEffect } from 'react'
import { GridColDef, GridRowsProp } from '@mui/x-data-grid'
import Cookies from 'js-cookie';
import Link from 'next/link'
import { toast } from 'react-toastify'

import TableComponent from '@/components/tableComponent'
import TableActions from '@/components/tableComponent/actions'
import AddIcon from '@/components/icons/add'

import { IUsers } from '@/utils/interfaces'
import BASE_URL from '@/lib/axios'

import styles from './styles.module.css'
import 'react-toastify/dist/ReactToastify.css';

function Users () {
  const [rows, setRows] = useState<GridRowsProp[]>([])
  
  const getUserId = Cookies.get('userId')
  
  const getUsers = async () => {
    BASE_URL.get('/users')
      .then(({data}) => {
        setRows(data)
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

  const handleDeleteProduct = ({ id }: { id: string }) => {
    toast.info('Aguarde um instante', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    BASE_URL.delete(`/delete-user/${id}`)
      .then(() => {
        toast.dismiss()
        toast.success('Usuário excluido com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: false,
        });

        getUsers()
      })
      .catch(() => {
        toast.dismiss()
        toast.error('Erro ao excluir o usuário', {
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
      renderCell: ({ row } : {row: IUsers}) =>{
        console.log(row)
        return TableActions({
        editRoute: `/usuarios/${row.id}`,
        onDelete: () => handleDeleteProduct({ id: row.id }),
        diabledDelete: row.id === getUserId,
        diabledEdit: row.id === getUserId
      })}
    },
    { 
      field: 'email',
      headerName: 'E-mail',
      flex: 3,
      disableColumnMenu: true,
      sortable: false,
    },
    { 
      field: 'userName',
      headerName: 'Nome do usuário',
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
            href={'/usuarios/novo-usuario'}
            className={`${styles.buttons} ${styles.button_blue}`}
            >
            <AddIcon
              className={styles.button_blue_icon}
            />
            <p>
              Adicionar Usuário
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

export default Users