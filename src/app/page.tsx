'use client'

import Image from "next/image";
import Link from "next/link";
import { GridRowsProp } from "@mui/x-data-grid";

import search_icon from '@/components/icons/search.svg'
import AddIcon from '@/components/icons/add'
import TableComponent from "@/components/tableComponent";
import { ProductsColumns } from "@/components/tableComponent/pagesColumns";

import styles from "./page.module.css";
import BASE_URL from "@/lib/axios";
import { useEffect } from "react";


interface IProduct {
  id: string
  image: string 
  name: string
  link: string
  description: string
  group: string
}

interface IGroups {
  id: number,
  group_name: string,
  products_list: IProduct[]
}


const getData = async () => {
  return await BASE_URL.get<IGroups[]>('/products')
  .then(({data}) => {
    const list: IProduct[] = []

    data.forEach((groups) => {
      groups.products_list.map((product) => {
        list.push({
          ...product,
          group: groups.group_name
        })
      })

    })

    return list
  })
}


export default async function Home() {
  const rows: GridRowsProp = await getData()
  
  return (
    <div>
      <div className={styles.function_bar}>
        <p className={styles.title}>Produtos</p>

        <div className={styles.functions_container}>
          <Image
            src={search_icon}
            alt="icone de pesquisa"
            className={styles.teste}
          />

          <Link
            href={''}
            className={`${styles.buttons} ${styles.button_white}`}
          >
            <AddIcon
              className={styles.button_white_icon}
            />
            <p>
              Adicionar Grupo
            </p>
          </Link>
          <Link
            href={''}
            className={`${styles.buttons} ${styles.button_blue}`}
            >
            <AddIcon
              className={styles.button_blue_icon}
            />
            <p>
              Adicionar Produto
            </p>
          </Link>
        </div>
      </div>

      <div
        className={styles.table}
      >
        <TableComponent
          columns={ProductsColumns}
          rows={rows}
        />
      </div>
    </div>
  );
}
