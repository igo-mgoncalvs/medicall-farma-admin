'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import BASE_URL from "@/lib/axios";
import { toast } from "react-toastify";

import AddIcon from '@/components/icons/add'

import styles from "./page.module.css";
import { ExpandLess, ExpandMore} from '@mui/icons-material';
import TableActions from '@/components/tableComponent/actions';
import { Collapse, List, ListItemButton, ListItemText, MenuItem, Select, Switch } from '@mui/material';
import TableReorderingComponent from '@/components/tableOrderingComponent';
import { GridRowOrderChangeParams } from '@mui/x-data-grid-pro';
import { IGroup, IProduct } from '@/utils/interfacesNew';
import BASE_URL_V2 from '@/lib/axios_v2';
import TableComponent from '@/components/tableComponent';



interface IGroups {
  id: string,
  group_name: string,
  products_list: IProduct[]
}

export default function Home() {
  const [rows, setRows] = useState<IGroups[]>([])
  const [searchRows, setSearchRows] = useState<IGroups[]>([])
  const [openGroup, setOpenGroup] = useState<String>('');
  const [openCategory, setOpenCategory] = useState<String>('');
  const [searchBase, setSearchBase] = useState('name')

  const [productList, setProductList] = useState<IGroup[]>([])
  
  const getData = async () => {
    return await BASE_URL_V2.get<IGroup[]>('/list-all-products')
    .then(({data}) => {
      setProductList(data)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const handleDeleteProduct = ({ id } : { id: string }) => {
    toast.info('Aguarde um instante', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });
  
    BASE_URL_V2.delete(`/remove-product/${id}`)
      .then(() => {
        toast.dismiss()
        toast.success('Produto excluido com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000,
        });
        getData()
      })
      .catch(() => {
        toast.dismiss()
        toast.error('Erro ao excluir o produto', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
  }

  const handleChangeStatus = (row: IProduct) => {
    toast.info('Aguarde um instante', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    BASE_URL_V2.put(`/change-product-status/${row.id}`)
      .then(() => {
        toast.dismiss()
        toast.success('Status do produto alterado com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000,
        });
        getData()
      })
      .catch(() => {
        toast.dismiss()
        toast.error('Erro ao alterar o status do produto', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
  }

  const handleChangeTopStatus = (row: IProduct) => {
    toast.info('Aguarde um instante', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    BASE_URL_V2.put(`/change-top-product-status/${row.id}`)
      .then(() => {
        toast.dismiss()
        toast.success('Status do produto alterado com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000,
        });
        getData()
      })
      .catch(() => {
        toast.dismiss()
        toast.error('Erro ao alterar o status do produto', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
  }

  const handleChangeFeaturedStatus = (row: IProduct) => {
    toast.info('Aguarde um instante', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    BASE_URL_V2.put(`/change-featured-product-status/${row.id}`)
      .then(() => {
        toast.dismiss()
        toast.success('Status do produto alterado com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000,
        });
        getData()
      })
      .catch(() => {
        toast.dismiss()
        toast.error('Erro ao alterar o status do produto', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
  }

  const ProductsColumns: GridColDef[] = [
    {
      field: 'action',
      headerName: 'Ações',
      width: 90,
      headerAlign: 'center',
      renderCell: ({ row } : {row: IProduct}) => TableActions({
        editRoute: `/editar-produto/${row.id}`,
        onDelete: () => handleDeleteProduct({ id: row.id })
      }),
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'active',
      headerName: 'Status',
      width: 90,
      headerAlign: 'center',
      renderCell: ({ row } : {row: IProduct}) => (
        <Switch
          checked={row.active}
          onChange={() => handleChangeStatus(row)}
        />
      ),
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'isTop',
      headerName: 'Exibir na Home',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row } : {row: IProduct}) => (
        <Switch
          checked={row.isTop}
          onChange={() => handleChangeTopStatus(row)}
        />
      ),
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: 'featured',
      headerName: 'Destaque',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row } : {row: IProduct}) => (
        <Switch
          checked={row.featured}
          onChange={() => handleChangeFeaturedStatus(row)}
        />
      ),
      sortable: false,
      disableColumnMenu: true
    },
    { 
      field: 'image',
      headerName: 'Imagem',
      width: 100,
      sortable: false,
      headerAlign: 'center',
      disableColumnMenu: true,
      align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL_V2}/product-image/${params.row.sizes[0]?.id}`}
          alt=""
          width={50}
          height={50}
          className={styles.cell_aling}
        />
      )
    },
    
    { 
      field: 'name',
      headerName: 'Nome',
      width: 150,
      sortable: false,
      disableColumnMenu: true
    },
    { 
      field: 'shortDescription',
      headerName: 'Resumo',
      width: 250,
      sortable: false,
      disableColumnMenu: true
    },
    { 
      field: 'description',
      headerName: 'Descrição',
      width: 250,
      sortable: false,
      disableColumnMenu: true
    },
    { 
      field: 'contactLink',
      headerName: 'Whatsapp',
      width: 200,
      sortable: false,
      disableColumnMenu: true
    },
    { 
      field: 'link',
      headerName: 'Rota',
      width: 200,
      sortable: false,
      disableColumnMenu: true
    }
  ]
  
  const handleClick = useCallback((id: string) => {
    if(openGroup && openGroup === id) {
      setOpenGroup('');
    } else {
      setOpenGroup(id);
    }
  }, [openGroup])

  const handleClickCategory = useCallback((id: string) => {
    if(openCategory && openCategory === id) {
      setOpenCategory('');
    } else {
      setOpenCategory(id);
    }
  }, [openCategory])

  return (
    <div>
      <div className={styles.function_bar}>
        <p className={styles.title}>Produtos</p>

        <div className={styles.functions_container}>
          <Link
            href={'/cadastrar-produto'}
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
      
      {productList.length > 0 && (
        <List
          className={styles.groups}
        >
          {productList?.map((group) => group.categories.length > 0 && (
            <div
              className={styles.list_item}
            >
              <ListItemButton onClick={() => handleClick(group.id)}>
                <ListItemText primary={group.groupName} className={styles.grupName}/>
                {openGroup ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openGroup === group.id} timeout="auto" unmountOnExit>
                {group?.categories.map((category) => (
                  <div
                    className={styles.list_item}
                  >
                    <ListItemButton onClick={() => handleClickCategory(category.id)}>
                      <ListItemText primary={category.categoryName} />
                      {openCategory ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openCategory === category.id} timeout="auto" unmountOnExit>
                      <div
                        className={styles.table}
                      >
                        <TableComponent
                          columns={ProductsColumns}
                          rows={category.products}
                        />
                      </div>
                    </Collapse>
                  </div>
                ))}
              </Collapse>
            </div>
          ))}
        </List>
      )}
    </div>
  );
}
