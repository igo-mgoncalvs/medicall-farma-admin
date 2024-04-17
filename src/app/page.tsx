'use client'

import { useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import { GridColDef, GridDeleteIcon, GridRenderCellParams, GridRowsProp } from "@mui/x-data-grid";
import BASE_URL from "@/lib/axios";
import { toast } from "react-toastify";

import search_icon from '@/components/icons/search.svg'
import AddIcon from '@/components/icons/add'
import TableComponent from "@/components/tableComponent";

import styles from "./page.module.css";
import { Edit } from '@mui/icons-material';
import TableActions from '@/components/tableComponent/actions';

interface IProduct {
  id: string
  image: string 
  name: string
  link: string
  description: string
  group: string
  route: string
}

interface IGroups {
  id: number,
  group_name: string,
  products_list: IProduct[]
}

export default function Home() {
  const [rows, setRows] = useState<GridRowsProp>()
  
  const getData = async () => {
    return await BASE_URL.get<IGroups[]>('/products')
    .then(({data}) => {
      const list: IProduct[] = []
  
      data.forEach((groups) => {
        groups.products_list.map((product) => {
          list.push({
            ...product,
            group: groups.group_name
          })
        })
  
      })
  
      setRows(list)
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
  
    BASE_URL.delete(`/remove-product/${id}`)
      .then(() => {
        toast.dismiss()
        toast.success('Produto excluido com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: false,
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

  const ProductsColumns: GridColDef[] = [
    {
      field: 'action',
      headerName: 'Ações',
      width: 90,
      headerAlign: 'center',
      renderCell: ({ row } : {row: IProduct}) => TableActions({
        editRoute: `/editar-produto/${row.route}`,
        onDelete: () => handleDeleteProduct({ id: row.id })
      })
    },
    { 
      field: 'group',
      headerName: 'Grupo',
      width: 250,
      disableColumnMenu: true,
      sortable: false,
    },
    { 
      field: 'image',
      headerName: 'Image',
      width: 100,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Image
          src={params.value}
          alt=""
          width={50}
          height={50}
          className={styles.cell_aling}
        />
      )
    },
    { 
      field: 'name',
      headerName: 'Nome',
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <p className={styles.cell_aling}>
          {params.value}
        </p>
      )
    },
    { 
      field: 'summary',
      headerName: 'Resumo',
      width: 250,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <p className={styles.cell_aling}>
          {params.value}
        </p>
      )
    },
    { 
      field: 'description',
      headerName: 'Descrição',
      width: 250,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <p className={styles.cell_aling}>
          {params.value}
        </p>
      )
    },
    { 
      field: 'whatsapp',
      headerName: 'Whatsapp',
      width: 200,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <p className={styles.cell_aling}>
          {params.value}
        </p>
      )
    },
    { 
      field: 'route',
      headerName: 'Rota',
      width: 200,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <p className={styles.cell_aling}>
          {params.value}
        </p>
      )
    },
    { 
      field: 'link',
      headerName: 'Link',
      width: 250,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <p className={styles.cell_aling}>
          {params.value}
        </p>
      )
    }
  ]
  
  return (
    <div>
      <div className={styles.function_bar}>
        <p className={styles.title}>Produtos</p>

        <div className={styles.functions_container}>
          <Image
            src={search_icon}
            alt="icone de pesquisa"
            className={styles.teste}
          />

          <Link
            href={'/cadastrar-grupo'}
            className={`${styles.buttons} ${styles.button_white}`}
          >
            <AddIcon
              className={styles.button_white_icon}
            />
            <p>
              Adicionar Grupo
            </p>
          </Link>
          <Link
            href={'/cadastrar-produto'}
            className={`${styles.buttons} ${styles.button_blue}`}
            >
            <AddIcon
              className={styles.button_blue_icon}
            />
            <p>
              Adicionar Produto
            </p>
          </Link>
        </div>
      </div>

      {rows && (
        <div
          className={styles.table}
        >
          <TableComponent
            columns={ProductsColumns}
            rows={rows}
          />
        </div>
      )}
    </div>
  );
}
