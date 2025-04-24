'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { GridColDef } from '@mui/x-data-grid';
import BASE_URL from '@/lib/axios';
import { toast } from 'react-toastify'

import AddIcon from '@/components/icons/add'

import styles from './styles.module.css'
import TableActions from '@/components/tableComponent/actions';
import { Switch } from '@mui/material';
import TableReorderingComponent from '@/components/tableOrderingComponent';
import BASE_URL_V2 from '@/lib/axios_v2';
import { ICategories, IGroup } from '@/utils/interfacesNew';


export default function Fornecedores () {
  const [rows, setRows] = useState<ICategories[]>() 
  const [searchRows, setSearchRows] = useState<ICategories[]>([])

  const getData = async () => {
    return await BASE_URL_V2.get<ICategories[]>('/list-categories')
      .then(({data}) => {
        setRows(data)
        setSearchRows(data)
      })
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
  
    BASE_URL_V2.delete(`/remove-category/${id}`)
      .then(() => {
        toast.dismiss()
        toast.success('Categoria excluida com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000,
        });
        getData()
      })
      .catch(() => {
        toast.dismiss()
        toast.error('Erro ao excluir a categoria', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
  }

  const handleChangeStatus = (row: ICategories) => {
    toast.info('Aguarde um instante', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    BASE_URL_V2.put(`/change-category-status/${row.id}`)
      .then(() => {
        toast.dismiss()
        toast.success('Status alterado com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000,
        });
        getData()
      })
      .catch(() => {
        toast.dismiss()
        toast.error('Erro ao alterar o status', {
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
          editRoute: `/editar-categoria/${row.id}`,
          onDelete: () => handleDeleteGroup({ id: row.id })
        }),
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'active',
      headerName: 'Status',
      width: 90,
      headerAlign: 'center',
      renderCell: ({ row } : {row: ICategories}) => (
        <Switch
          checked={row.active}
          onChange={() => handleChangeStatus(row)}
        />
      ),
      sortable: false,
      disableColumnMenu: true
    },
    { 
      field: 'categoryLink',
      headerName: 'rota',
      flex: 1,
      sortable: false,
      renderCell: (({ row } : {row: ICategories}) => (
        <p>
          {row.categoryLink}
        </p>
      ))
    },
    { 
      field: 'groupName',
      headerName: 'Grupo',
      flex: 1,
      sortable: false,
      renderCell: (({ row } : {row: ICategories}) => (
        <p>
          {row.Gruop.groupName}
        </p>
      ))
    },
    { 
      field: 'categoryName',
      headerName: 'Nome',
      flex: 3,
      sortable: false
    }
  ]

  const handleSearch = useCallback((value: string) => {
    const regex = new RegExp(value, 'i');

    if(rows) {
      setSearchRows(rows.filter((item) => regex.test(item.categoryName)))
    }
  }, [rows])

  return (
    <div>
      <div className={styles.function_bar}>
        <p className={styles.title}>Categoria</p>

        <div className={styles.search_bar}>
          <input
            placeholder='Pesquise pelo nome da categoria'
            className={styles.search_bar_input}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className={styles.functions_container}>
          <Link
            href={'/cadastrar-categoria'}
            className={`${styles.buttons} ${styles.button_blue}`}
            >
            <AddIcon
              className={styles.button_blue_icon}
            />
            <p>
              Adicionar Categoria
            </p>
          </Link>
        </div>
      </div>

      <div
        className={styles.table}
      >
        {searchRows.length > 0 && (
          <TableReorderingComponent
            columns={columns}
            rows={searchRows}
            getData={getData}
            editRoute={'/reorder-groups'}
          />
        )}
      </div>
    </div>
  )
}