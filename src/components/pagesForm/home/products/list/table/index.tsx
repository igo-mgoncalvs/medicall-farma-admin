'use client'

import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { toast } from 'react-toastify'

import TableComponent from "@/components/tableComponent";
import TableActions from "@/components/tableComponent/actions";

import { IAboutUs_Values, IHomeProductsList } from "@/utils/interfaces";

import BASE_URL from "@/lib/axios";

import styles from './styles.module.css'

interface IParams {
  enableForm: boolean
  setEnableForm: Dispatch<SetStateAction<boolean>>
  setValueEdit: Dispatch<SetStateAction<IHomeProductsList | undefined>>
  getData: () => void
  rows: IHomeProductsList[]
}

export default function ValuesTable ({ enableForm, setEnableForm, setValueEdit, getData, rows }: IParams) {
  const handleButtonAction = useCallback(() => {
    setEnableForm(!enableForm)
  }, [enableForm])

  const onEdit = (value: IHomeProductsList) => {
    setValueEdit(value)
    setEnableForm(true)
  }

  const onDelete = useCallback((row: IHomeProductsList) => {
    toast.info('Deletando as inforções, aguarde', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    BASE_URL.delete(`/delete-home-products-list/${row.id}`)
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
      field: 'name',
      headerName: 'Nome',
      flex: 5,
      disableColumnMenu: true,
      sortable: false,
    }
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
      <TableComponent
        columns={columns}
        rows={rows}
        size={3}
      />
    </div>
  )
}