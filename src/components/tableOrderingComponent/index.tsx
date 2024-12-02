'use client'

import { IProduct } from "@/utils/interfaces";
import { LoadingButton } from "@mui/lab";
import { GridColDef } from "@mui/x-data-grid";
import {
  DataGridPro, GridRowOrderChangeParams
} from '@mui/x-data-grid-pro';
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import styles from './styles.module.css'
import BASE_URL from "@/lib/axios";

interface IProps {
  rows: any[],
  columns: GridColDef[]
  size?: number
  editRoute?: string
  getData: () => void
  isEditing?: (status: boolean) => void 
}

function TableReorderingComponent ({ rows, columns, size, editRoute, isEditing = () => null, getData }:IProps) {
  const [rowsOrder, setOrder] = useState<any>(rows)
  const [loading, setLoading] = useState<boolean>(false)
  const [buttonDisable, setButtonDisable]  = useState<boolean>(true)
  
  useEffect(() => {
    setOrder(rows)
  }, [rows])
  
  useEffect(() => {
    isEditing(!buttonDisable)
  }, [buttonDisable])

  const handleChange = useCallback((e: GridRowOrderChangeParams) => {
    const list: IProduct[] = Array.from(rowsOrder)

    const [removed] = list.splice(e.oldIndex, 1)

    list.splice(e.targetIndex, 0, removed)
    
    const reorder = list.map((item, index) => ({
      ...item,
      index
    }))

    setOrder(reorder)

    setButtonDisable(false)
  }, [rowsOrder])

  const handleReordering = useCallback(() => {
    setLoading(true)

    if(editRoute) {
      BASE_URL.put(editRoute, rowsOrder)
        .then(() => {
          toast.dismiss()
          toast.success('Lista editada com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000,
          });
        })
        .catch(() => {
          toast.dismiss()
          toast.error('Erro ao editar a lista', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
        })
        .finally(() => {
          setLoading(false)
          getData()
          setButtonDisable(true)
        })      

    }
    
  }, [rowsOrder, getData])

  useEffect(() => {
    const removeLicenseKeyDiv = () => {
      const invalidLicenseDiv = document.querySelectorAll("[style*='pointer-events: none']")[0]; // Substitua com o seletor correto
      if (invalidLicenseDiv) {
        invalidLicenseDiv.textContent = ''
      }
    };

    // Adicione um observador para remover caso a div seja adicionada dinamicamente
    const observer = new MutationObserver(removeLicenseKeyDiv);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);


  return (
    <div
      className={styles.container}
    >
      {!buttonDisable && (
        <LoadingButton
          variant='contained'
          loading={loading}
          type='submit'
          disabled={buttonDisable}
          className={styles.button}
          onClick={handleReordering}
        >
          Salvar
        </LoadingButton>
      )}

      <DataGridPro
        rows={rowsOrder}
        columns={columns}
        rowReordering
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: size || 6 },
          },
        }}
        rowHeight={80}
        onRowOrderChange={handleChange}
        className="teste"
        localeText={{
          MuiTablePagination: {
            labelDisplayedRows: ({ from, to, count }) =>
              `${from} - ${to} de ${count}`,
          },
          columnMenuFilter: 'Filtrar',
          filterPanelColumns: 'Colunas',
          filterPanelOperator: 'Operação',
          filterPanelInputLabel: 'Valor',
          filterPanelInputPlaceholder: 'Valor da busca',
          columnMenuHideColumn: 'Ocultar coluna',
          columnMenuManageColumns: 'Manusear colunas',
          columnsManagementSearchTitle: 'Pesquisa',
          columnsManagementShowHideAllText: 'Mostrar/Esconder todas',
          filterOperatorContains: 'contem',
          filterOperatorEquals: 'igual a',
          filterOperatorStartsWith: 'começa com',
          filterOperatorEndsWith: 'termina com',
          filterOperatorIsEmpty: 'está vazia',
          filterOperatorIsNotEmpty: 'não está vazia',
          filterOperatorIsAnyOf: 'entre',
          noRowsLabel: 'Nenhum item foi encontrato',
        }}
        disableRowSelectionOnClick
      />
    </div>
  )
}

export default TableReorderingComponent