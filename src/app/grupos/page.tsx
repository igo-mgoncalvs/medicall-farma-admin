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
import { IGroup } from '@/utils/interfacesNew';


export default function Fornecedores () {
  const [rows, setRows] = useState<IGroup[]>() 
  const [searchRows, setSearchRows] = useState<IGroup[]>([])

  const getData = async () => {
    return await BASE_URL_V2.get<IGroup[]>('/list-groups')
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
  
    BASE_URL_V2.delete(`/remove-group/${id}`)
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

  const handleChangeStatus = (row: IGroup) => {
    toast.info('Aguarde um instante', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    BASE_URL_V2.put(`/change-group-status/${row.id}`)
      .then(() => {
        toast.dismiss()
        toast.success('Status do grupo alterado com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000,
        });
        getData()
      })
      .catch(() => {
        toast.dismiss()
        toast.error('Erro ao alterar o status do grupo', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
  }

  const handleChangeTopStatus = (row: IGroup) => {
    toast.info('Aguarde um instante', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    BASE_URL_V2.put(`/change-top-group-status/${row.id}`)
      .then(() => {
        toast.dismiss()
        toast.success('Status do grupo alterado com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000,
        });
        getData()
      })
      .catch(() => {
        toast.dismiss()
        toast.error('Erro ao alterar o status do grupo', {
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
        }),
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'active',
      headerName: 'Status',
      width: 90,
      headerAlign: 'center',
      renderCell: ({ row } : {row: IGroup}) => (
        <Switch
          checked={row.active}
          onChange={() => handleChangeStatus(row)}
        />
      ),
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'isTop',
      headerName: 'Exibir na Home',
      width: 150,
      headerAlign: 'center',
      renderCell: ({ row } : {row: IGroup}) => (
        <Switch
          checked={row.isTop}
          onChange={() => handleChangeTopStatus(row)}
        />
      ),
      align: "center",
      sortable: false,
      disableColumnMenu: true
    },
    { 
      field: 'groupName',
      headerName: 'Nome',
      flex: 3,
      sortable: false
    }
  ]

  const handleSearch = useCallback((value: string) => {
    const regex = new RegExp(value, 'i');

    if(rows) {
      setSearchRows(rows.filter((item) => regex.test(item.groupName)))
    }
  }, [rows])

  return (
    <div>
      <div className={styles.function_bar}>
        <p className={styles.title}>Grupos</p>

        <div className={styles.search_bar}>
          <input
            placeholder='Pesquise pelo nome do grupo'
            className={styles.search_bar_input}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className={styles.functions_container}>
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