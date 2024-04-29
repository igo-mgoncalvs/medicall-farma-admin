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
        // getRowHeight={() => 'auto'}
        rowHeight={80}
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