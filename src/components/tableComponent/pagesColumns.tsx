'use client'

import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import { Edit } from "@mui/icons-material";

import styles from './styles.module.css'
import Image from "next/image";

export const ProductsColumns: GridColDef[] = [
  {
    field: 'action',
    headerName: 'Ações',
    width: 90,
    headerAlign: 'center',
    renderCell: () => (
      <div
        className={styles.actions_icons_container}
      >
        <GridDeleteIcon
          className={styles.action_icon_delete}
        />
        <Edit
          className={styles.action_icon_edit}
        />
      </div>
    )
  },
  { 
    field: 'group',
    headerName: 'Grupo',
    width: 250,
    disableColumnMenu: true,
    sortable: false
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
      />
    )
  },
  { 
    field: 'name',
    headerName: 'Nome',
    width: 150,
    disableColumnMenu: true,
    sortable: false
  },
  { 
    field: 'summary',
    headerName: 'Resumo',
    width: 250,
    disableColumnMenu: true,
    sortable: false
  },
  { 
    field: 'description',
    headerName: 'Descrição',
    width: 250,
    disableColumnMenu: true,
    sortable: false
  },
  { 
    field: 'whatsapp',
    headerName: 'Whatsapp',
    width: 200,
    disableColumnMenu: true,
    sortable: false
  },
  { 
    field: 'route',
    headerName: 'Rota',
    width: 200,
    disableColumnMenu: true,
    sortable: false
  },
  { 
    field: 'link',
    headerName: 'Link',
    width: 250,
    disableColumnMenu: true,
    sortable: false
  }
]