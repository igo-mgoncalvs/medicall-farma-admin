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
import { useCallback, useEffect, useState } from 'react';
import { toast } from "react-toastify";

interface ISuppliers {
  id: string
  image: string
  name: string
}


export default function Fornecedores () {
  const [rows, setRows]= useState<ISuppliers[]>([])
  const [searchRows, setSearchRows] = useState<ISuppliers[]>([])

  const getData = async () => {
    return await BASE_URL.get<ISuppliers[]>('/suppliers')
      .then(({data}) => {
        setRows(data)
        setSearchRows(data)
      })
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

  const handleSearch = useCallback((value: string) => {
    const regex = new RegExp(value, 'i');

    if(rows) {
      setSearchRows(rows.filter((item) => regex.test(item.name)))
    }
  }, [rows])

  const columns: GridColDef[] = [
    {
      field: 'action',
      headerName: 'Ações',
      width: 100,
      headerAlign: 'center',
      renderCell: ({ row } : {row: ISuppliers}) => TableActions({
        editRoute: `/editar-fornecedor/${row.id}`,
        onDelete: () => handleDeleteProduct({ id: row.id })
      }),
      sortable: false,
      disableColumnMenu: true,
    },
    { 
      field: 'image',
      headerName: 'Imagem',
      width: 120,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            backgroundImage: `url(${params.value})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className={styles.cell_aling}
        />
      )
    },
    { 
      field: 'name',
      headerName: 'Nome',
      flex: 3,
      sortable: false,
    }
  ]

  return (
    <div>
      <div className={styles.function_bar}>
        <p className={styles.title}>Fonecedores</p>

        <div className={styles.search_bar}>
          <input
            placeholder='Pesquise pelo nome do fornecedor'
            className={styles.search_bar_input}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className={styles.functions_container}>
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
          rows={searchRows}
        />
      </div>
    </div>
  )
}