'use client'

import { useState, useCallback, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { toast } from 'react-toastify'

import TableActions from "@/components/tableComponent/actions";

import styles from './styles.module.css'
import TableReorderingComponent from "@/components/tableOrderingComponent";
import { IValuesForm } from "..";
import BASE_URL_V2 from "@/lib/axios_v2";

interface IParams {
  enableForm: boolean
  setEnableForm: Dispatch<SetStateAction<boolean>>
  setBannersEdit: Dispatch<SetStateAction<IValuesForm | undefined>>
  getData: () => void
  rows: IValuesForm[]
}

export default function ValuesFormTable ({ enableForm, setEnableForm, setBannersEdit, getData, rows }: IParams) {
  const [showButton, setShowButton] = useState(true)

  const handleButtonAction = useCallback(() => {
    setEnableForm(!enableForm)
  }, [enableForm])

  const onEdit = (value: IValuesForm) => {
    setBannersEdit(value)
    setEnableForm(true)
  }

  const onDelete = useCallback((row: IValuesForm) => {
    toast.info('Deletando as inforções, aguarde', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    BASE_URL_V2.delete(`/delete-our-space-image/${row.id}`)
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
      field: 'icon',
      headerName: 'Imagem',
      width: 200,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: (params) => (
        <Image
          src={params.value}
          alt=""
          width={120}
          height={80}
          style={{
            padding: 10,
            background: "#dfdfdf"
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
      field: 'description',
      headerName: 'Descrição',
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
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
          editRoute='/reorder-our-space-images'
        />
      )}
    </div>
  )
}