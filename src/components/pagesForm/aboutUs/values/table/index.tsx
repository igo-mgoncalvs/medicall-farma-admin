'use client'

import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { toast } from 'react-toastify'

import TableComponent from "@/components/tableComponent";
import TableActions from "@/components/tableComponent/actions";

import { IAboutUs_Values } from "@/utils/interfaces";

import BASE_URL from "@/lib/axios";

import styles from './styles.module.css'
import TableReorderingComponent from "@/components/tableOrderingComponent";

interface IParams {
  enableForm: boolean
  setEnableForm: Dispatch<SetStateAction<boolean>>
  setValueEdit: Dispatch<SetStateAction<IAboutUs_Values | undefined>>
  getData: () => void
  rows: IAboutUs_Values[]
}

export default function ValuesTable ({ enableForm, setEnableForm, setValueEdit, getData, rows }: IParams) {
  const [showButton, setShowButton] = useState(true)

  const handleButtonAction = useCallback(() => {
    setEnableForm(!enableForm)
  }, [enableForm])

  const onEdit = (value: IAboutUs_Values) => {
    setValueEdit(value)
    setEnableForm(true)
  }

  const onDelete = useCallback((row: IAboutUs_Values) => {
    toast.info('Deletando as inforções, aguarde', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    BASE_URL.delete(`/about-us-delete-value/${row.id}`)
      .then(() =>{
        toast.dismiss()
        toast.success('Deletado com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
      .catch(() => {
        toast.dismiss()
        toast.error('Erro ao deletado', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
      .finally(() => {
        getData()
      })
  }, [getData])

  const columns: GridColDef[] = [
    { 
      field: 'actions',
      headerName: 'Ações',
      flex: 1,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: (params) => (
        <TableActions
          onEdit={() => onEdit(params.row)}
          onDelete={() => onDelete(params.row)}
        />
      )
    },
    { 
      field: 'image',
      headerName: 'Imagem',
      width: 100,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: (params) => (
        <Image
          src={params.value}
          alt=""
          width={80}
          height={80}
          style={{
            padding: 10
          }}
        />
      )
    },
    { 
      field: 'title',
      headerName: 'Titulo',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    { 
      field: 'text',
      headerName: 'Descrição',
      flex: 3,
      disableColumnMenu: true,
      sortable: false,
    }
  ]

  return (
    <div className={styles.container}>
      {!showButton && (
        <Button
          variant="contained"
          className={styles.button}
          disabled={enableForm}
          onClick={handleButtonAction}
        >
          Adiconar
        </Button>
      )}

      {(columns && rows) && (
        <TableReorderingComponent
          columns={columns}
          rows={rows}
          size={3}
          getData={getData}
          isEditing={(status) => setShowButton(status)}
          editRoute='/reorder-values'
        />
      )}
    </div>
  )
}