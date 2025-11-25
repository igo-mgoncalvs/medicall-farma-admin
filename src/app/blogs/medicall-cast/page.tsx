'use client'

import { useState, useEffect } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import Link from 'next/link'
import { toast } from 'react-toastify'

import TableComponent from '@/components/tableComponent'
import TableActions from '@/components/tableComponent/actions'
import AddIcon from '@/components/icons/add'

import { IBlogs, IMedicallCast } from '@/utils/interfaces'

import styles from './styles.module.css'
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL_V2 from '@/lib/axios_v2';

export default function MedicallCast () {
  const [rows, setRows] = useState<IMedicallCast[]>([])
  
  const getMedicallCast = async () => {
    BASE_URL_V2.get<IMedicallCast[]>('/medicall-cast')
      .then(({data}) => {
        setRows(data)
      })
  }

  useEffect(() => {
    getMedicallCast()
  }, [])

  const handleDeleteProduct = ({ id }: { id: string }) => {
    toast.info('Aguarde um instante', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    BASE_URL_V2.delete(`/medicall-cast/${id}`)
      .then(() => {
        toast.dismiss()
        toast.success('Blog excluido com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: false,
        });

        getMedicallCast()
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
        editRoute: `/blogs/medicall-cast/editar-episodio/${row.id}`,
        onDelete: () => handleDeleteProduct({ id: row.id }),
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
      field: 'description',
      headerName: 'Resumo',
      flex: 3,
      disableColumnMenu: true,
      sortable: false,
    },
  ]

  return (
    <div>
      <div className={styles.function_bar}>
        <p className={styles.title}>Medicall Cast</p>

        <div className={styles.functions_container}>
          <Link
            href={'/blogs/medicall-cast/novo-episodio'}
            className={`${styles.buttons} ${styles.button_blue}`}
            >
            <AddIcon
              className={styles.button_blue_icon}
            />
            <p>
              Adicionar Episódio
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
