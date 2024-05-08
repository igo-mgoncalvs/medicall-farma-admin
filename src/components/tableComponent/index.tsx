'use client'

import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

interface IProps {
  rows: any,
  columns: GridColDef[]
  size?: number
}

function TableComponent ({ rows, columns, size }:IProps) {
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: size || 6 },
          },
        }}
        rowHeight={80}
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
          noRowsLabel: 'Nenhum item foi encontrato'
        }}
        disableRowSelectionOnClick
      />
    </div>
  )
}

export default TableComponent