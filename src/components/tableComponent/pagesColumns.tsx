'use client'

import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import { Edit } from "@mui/icons-material";

import styles from './styles.module.css'
import Image from "next/image";

interface IProduct {
  id: string
  image: string 
  name: string
  link: string
  description: string
  group: string
}

export const ProductsColumns: GridColDef[] = [
  {
    field: 'action',
    headerName: 'Ações',
    width: 90,
    headerAlign: 'center',
    renderCell: ({ row } : {row: IProduct}) => (
      <div
        className={styles.actions_icons_container}
      >
        <div
          onClick={() => HandleDeleteProduct({ id: row.id })}
        >
          <GridDeleteIcon
            className={styles.action_icon_delete}
          />
        </div>
        <div>
          <Edit
            className={styles.action_icon_edit}
          />
        </div>
      </div>
    )
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
    renderCell: (params) => (
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
    renderCell: (params) => (
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
    renderCell: (params) => (
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
    renderCell: (params) => (
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
    renderCell: (params) => (
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
    renderCell: (params) => (
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
    renderCell: (params) => (
      <p className={styles.cell_aling}>
        {params.value}
      </p>
    )
  }
]

export const SuppliersColumns: GridColDef[] = [
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
    renderCell: (params) => (
      <p className={styles.cell_aling}>
        {params.value}
      </p>
    )
  }
]

export const ClientsColumns: GridColDef[] = [
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
    renderCell: (params) => (
      <p className={styles.cell_aling}>
        {params.value}
      </p>
    )
  }
]