import Image from 'next/image'
import Link from 'next/link'
import { GridRowsProp } from '@mui/x-data-grid';

import search_icon from '@/components/icons/search.svg'
import AddIcon from '@/components/icons/add'
import TableComponent from "@/components/tableComponent";
import { SuppliersColumns } from '@/components/tableComponent/pagesColumns';
import BASE_URL from '@/lib/axios';

import styles from './styles.module.css'

interface ISuppliers {
  image: string
  name: string
}

const getData = async () => {
  return await BASE_URL.get<ISuppliers[]>('/suppliers')
  .then(({data}) => data)
}

export default async function Fornecedores () {
  const rows: GridRowsProp = await getData()

  console.log(rows)

  return (
    <div>
      <div className={styles.function_bar}>
        <p className={styles.title}>Fonecedores</p>

        <div className={styles.functions_container}>
          <Image
            src={search_icon}
            alt="icone de pesquisa"
            className={styles.teste}
          />

          <Link
            href={''}
            className={`${styles.buttons} ${styles.button_blue}`}
            >
            <AddIcon
              className={styles.button_blue_icon}
            />
            <p>
              Adicionar Forncecedor
            </p>
          </Link>
        </div>
      </div>

      <div
        className={styles.table}
      >
        <TableComponent
          columns={SuppliersColumns}
          rows={rows}
        />
      </div>
    </div>
  )
}