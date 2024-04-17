'use client'

import Image from 'next/image'
import Link from 'next/link'
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';

import search_icon from '@/components/icons/search.svg'
import AddIcon from '@/components/icons/add'
import TableComponent from "@/components/tableComponent";
import BASE_URL from '@/lib/axios';

import styles from './styles.module.css'
import TableActions from '@/components/tableComponent/actions';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";

interface ISuppliers {
  id: string
  image: string
  name: string
}


export default function Fornecedores () {
  const [rows, setRows]= useState<ISuppliers[]>([])

  const getData = async () => {
    return await BASE_URL.get<ISuppliers[]>('/suppliers')
      .then(({data}) => setRows(data))
  }

  useEffect(() => {
    getData()
  }, [])

  const handleDeleteProduct = ({ id } : { id: string }) => {
    toast.info('Aguarde um instante', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });
  
    BASE_URL.delete(`/remove-supplier/${id}`)
      .then(() => {
        toast.dismiss()
        toast.success('Fornecedor excluido com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000,
        });
        getData()
      })
      .catch(() => {
        toast.dismiss()
        toast.error('Erro ao excluir o fornecedor', {
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
      renderCell: ({ row } : {row: ISuppliers}) => TableActions({
        editRoute: `/editar-fornecedor/${row.id}`,
        onDelete: () => handleDeleteProduct({ id: row.id })
      })
    },
    { 
      field: 'image',
      headerName: 'Imagem',
      flex: 1,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: (params) => (
        <Image
          src={params.value}
          alt=""
          width={100}
          height={100}
          style={{
            padding: 10
          }}
        />
      )
    },
    { 
      field: 'name',
      headerName: 'Nome',
      flex: 3,
      disableColumnMenu: true,
      sortable: false,
    }
  ]

  return (
    <div>
      <div className={styles.function_bar}>
        <p className={styles.title}>Fonecedores</p>

        <div className={styles.functions_container}>
          <Image
            src={search_icon}
            alt="icone de pesquisa"
            className={styles.teste}
          />

          <Link
            href={'/cadastrar-fornecedor'}
            className={`${styles.buttons} ${styles.button_blue}`}
            >
            <AddIcon
              className={styles.button_blue_icon}
            />
            <p>
              Adicionar Forncecedor
            </p>
          </Link>
        </div>
      </div>

      <div
        className={styles.table}
      >
        <TableComponent
          columns={columns}
          rows={rows}
        />
      </div>
    </div>
  )
}