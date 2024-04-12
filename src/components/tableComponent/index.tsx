'use client'

import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

interface IProps {
  rows: GridRowsProp,
  columns: GridColDef[]
}

function TableComponent ({ rows, columns }:IProps) {
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 6 },
          },
        }}
        getRowHeight={() => 'auto'}
        localeText={{
          footerTotalVisibleRows: (visibleCount, totalCount) =>
          `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,
        }}
        disableRowSelectionOnClick
      />
    </div>
  )
}

export default TableComponent