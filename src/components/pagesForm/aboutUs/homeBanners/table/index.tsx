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
import { IHomeBanners } from "..";
import BASE_URL_V2 from "@/lib/axios_v2";

interface IParams {
  enableForm: boolean
  setEnableForm: Dispatch<SetStateAction<boolean>>
  setBannersEdit: Dispatch<SetStateAction<IHomeBanners | undefined>>
  getData: () => void
  rows: IHomeBanners[]
}

export default function HomeBannersTable ({ enableForm, setEnableForm, setBannersEdit, getData, rows }: IParams) {
  const [showButton, setShowButton] = useState(true)

  const handleButtonAction = useCallback(() => {
    setEnableForm(!enableForm)
  }, [enableForm])

  const onEdit = (value: IHomeBanners) => {
    setBannersEdit(value)
    setEnableForm(true)
  }

  const onDelete = useCallback((row: IHomeBanners) => {
    toast.info('Deletando as inforções, aguarde', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    BASE_URL_V2.delete(`/delete-home-banner/${row.id}`)
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
      field: 'src',
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
          width={180}
          height={80}
          style={{
            padding: 10
          }}
        />
      )
    },
    { 
      field: 'srcMobile',
      headerName: 'Imagem Mobile',
      width: 200,
      disableColumnMenu: true,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: (params) => (
        <Image
          src={params.value}
          alt=""
          width={70}
          height={80}
          style={{
            padding: 10
          }}
        />
      )
    },
    { 
      field: 'href',
      headerName: 'Link',
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
          editRoute='/reorder-home-banners'
        />
      )}
    </div>
  )
}