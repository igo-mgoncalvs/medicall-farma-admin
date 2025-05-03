'use client'

import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { toast } from 'react-toastify'

import TableActions from "@/components/tableComponent/actions";

import { IAboutUs_Values } from "@/utils/interfaces";

import BASE_URL from "@/lib/axios";

import styles from './styles.module.css'
import TableReorderingComponent from "@/components/tableOrderingComponent";
import { IFloatingButtons } from "..";
import BASE_URL_V2 from "@/lib/axios_v2";
import TableComponent from "@/components/tableComponent";

interface IParams {
  enableForm: boolean
  setEnableForm: Dispatch<SetStateAction<boolean>>
  setBannersEdit: Dispatch<SetStateAction<IFloatingButtons | undefined>>
  getData: () => void
  rows: IFloatingButtons[]
}

export default function FloatingButtonsTable ({ enableForm, setEnableForm, setBannersEdit, getData, rows }: IParams) {
  const handleButtonAction = useCallback(() => {
    setEnableForm(!enableForm)
  }, [enableForm])

  const onEdit = (value: IFloatingButtons) => {
    setBannersEdit(value)
    setEnableForm(true)
  }

  const onDelete = useCallback((row: IFloatingButtons) => {
    toast.info('Deletando as inforções, aguarde', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    BASE_URL_V2.delete(`/delete-float-buttons/${row.id}`)
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
      width: 150,
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
      field: 'text',
      headerName: 'Texto',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    { 
      field: 'link',
      headerName: 'Link',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
  ]

  return (
    <div className={styles.container}>
      <Button
        variant="contained"
        className={styles.button}
        disabled={enableForm}
        onClick={handleButtonAction}
      >
        Adiconar
      </Button>

      {(columns && rows) && (
        <TableComponent
          columns={columns}
          rows={rows}
          size={3}
        />
      )}
    </div>
  )
}