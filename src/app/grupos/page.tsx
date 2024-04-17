'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GridColDef, GridDeleteIcon, GridRowsProp } from '@mui/x-data-grid';
import BASE_URL from '@/lib/axios';
import { toast } from 'react-toastify'

import search_icon from '@/components/icons/search.svg'
import AddIcon from '@/components/icons/add'
import TableComponent from "@/components/tableComponent";

import styles from './styles.module.css'
import { IGroup } from '@/utils/interfaces';
import { Edit } from '@mui/icons-material';
import TableActions from '@/components/tableComponent/actions';

interface ISuppliers {
  image: string
  name: string
}


export default function Fornecedores () {
  const [rows, setRows] = useState<IGroup[]>() 

  const getData = async () => {
    return await BASE_URL.get<IGroup[]>('/groups')
      .then(({data}) => setRows(data))
  }

  useEffect(() => {
    getData()
  }, [])

  const handleDeleteGroup = ({ id } : { id: string }) => {
    toast.info('Aguarde um instante', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });
  
    BASE_URL.delete(`/remove-group/${id}`)
      .then(() => {
        toast.dismiss()
        toast.success('Produto excluido com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000,
        });
        getData()
      })
      .catch(() => {
        toast.dismiss()
        toast.error('Erro ao excluir o produto', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
  }

  
  const columns: GridColDef[] = [
    { 
      field: 'action',
      headerName: 'Ações',
      width: 90,
      headerAlign: 'center',
      renderCell: ({ row } : {row: IGroup}) => 
        TableActions({
          editRoute: `/editar-grupo/${row.id}`,
          onDelete: () => handleDeleteGroup({ id: row.id })
        })
    },
    { 
      field: 'group_name',
      headerName: 'Nome',
      flex: 3,
      disableColumnMenu: true,
      sortable: false
    }
  ]

  return (
    <div>
      <div className={styles.function_bar}>
        <p className={styles.title}>Grupos</p>

        <div className={styles.functions_container}>
          <Image
            src={search_icon}
            alt="icone de pesquisa"
            className={styles.teste}
          />

          <Link
            href={'/cadastrar-grupo'}
            className={`${styles.buttons} ${styles.button_blue}`}
            >
            <AddIcon
              className={styles.button_blue_icon}
            />
            <p>
              Adicionar Grupo
            </p>
          </Link>
        </div>
      </div>

      <div
        className={styles.table}
      >
        {rows && (
          <TableComponent
            columns={columns}
            rows={rows}
          />
        )}
      </div>
    </div>
  )
}