'use client'

import Image from 'next/image'
import Link from 'next/link'
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { toast } from "react-toastify";

import search_icon from '@/components/icons/search.svg'
import AddIcon from '@/components/icons/add'
import TableComponent from "@/components/tableComponent";
import BASE_URL from '@/lib/axios';

import styles from './styles.module.css'
import { useCallback, useEffect, useState } from 'react';
import { IClient } from '@/utils/interfaces';
import TableActions from '@/components/tableComponent/actions';
import TableReorderingComponent from '@/components/tableOrderingComponent';

export default function Clients () {
  const [rows, setRows] = useState<IClient[]>([])
  const [searchRows, setSearchRows] = useState<IClient[]>([])

  const getData = async () => {
    return await BASE_URL.get<IClient[]>('/clients')
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
  
    BASE_URL.delete(`/remove-client/${id}`)
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
      width: 90,
      headerAlign: 'center',
      renderCell: ({ row } : {row: IClient}) => TableActions({
        editRoute: `/editar-cliente/${row.id}`,
        onDelete: () => handleDeleteProduct({ id: row.id })
      }),
      sortable: false,
      disableColumnMenu: true
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
            width: '100%',
            height: '100%',
            objectFit: "contain"
          }}
        />
      )
    },
    { 
      field: 'name',
      headerName: 'Nome',
      flex: 3,
      sortable: false,
      renderCell: (params) => (
        <p className={styles.cell_aling}>
          {params.value}
        </p>
      )
    }
  ]
  return (
    <div>
      <div className={styles.function_bar}>
        <p className={styles.title}>Clientes</p>

        <div className={styles.search_bar}>
          <input
            placeholder='Pesquise pelo nome do fornecedor'
            className={styles.search_bar_input}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className={styles.functions_container}>
          <Link
            href={'/cadastrar-cliente'}
            className={`${styles.buttons} ${styles.button_blue}`}
            >
            <AddIcon
              className={styles.button_blue_icon}
            />
            <p>
              Adicionar Cliente
            </p>
          </Link>
        </div>
      </div>


      {searchRows.length > 0 && (
        <div
          className={styles.table}
        >
          <TableReorderingComponent
            columns={columns}
            rows={searchRows}
            getData={getData}
            editRoute='/reorder-clients'
          />
        </div>
      )}
    </div>
  )
}