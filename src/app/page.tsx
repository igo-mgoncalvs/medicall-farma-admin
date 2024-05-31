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

interface IProduct {
  id: string
  image: string 
  name: string
  link: string
  description: string
  summary: string
  group: string
  route: string
  active: boolean
  whatsapp: string
  index: number
  productsGroupsId: string 
  imageId: string 
}

interface IGroups {
  id: string,
  group_name: string,
  products_list: IProduct[]
}

export default function Home() {
  const [rows, setRows] = useState<IGroups[]>([])
  const [searchRows, setSearchRows] = useState<IGroups[]>([])
  const [openGroup, setOpenGroup] = useState<String>('');
  const [searchBase, setSearchBase] = useState('name')
  
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
  
      setRows(data)
      setSearchRows(data)
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
  
    BASE_URL.delete(`/remove-product/${id}`)
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

    BASE_URL.put(`/change-product-status/${row.id}`)
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

  const handleSearch = useCallback((value: string) => {
    const regex = new RegExp(value, 'i');

    switch (searchBase) {
      case 'image':
        const listimage: IGroups[] = []

        rows.forEach(({group_name, id, products_list}) => {
          const search = products_list.filter((item) => regex.test(item.image))

          listimage.push({
            id,
            group_name,
            products_list: search
          })
        })

        setSearchRows(listimage)

        break;

      case 'name':
        const listname: IGroups[] = []

        rows.forEach(({group_name, id, products_list}) => {
          const search = products_list.filter((item) => regex.test(item.name))
          listname.push({
            id,
            group_name,
            products_list: search
          })
        })

        setSearchRows(listname)
        
        break;
        
      case 'summary':
        const listsummary: IGroups[] = []

        rows.forEach(({group_name, id, products_list}) => {
          const search = products_list.filter((item) => regex.test(item.summary))

          listsummary.push({
            id,
            group_name,
            products_list: search
          })
        })

        setSearchRows(listsummary)   
        
        break;

      case 'description':
        const listdescription: IGroups[] = []

        rows.forEach(({group_name, id, products_list}) => {
          const search = products_list.filter((item) => regex.test(item.description))

          listdescription.push({
            id,
            group_name,
            products_list: search
          })
        })

        setSearchRows(listdescription)

        break;

      case 'whatsapp':
        const listwhatsapp: IGroups[] = []

        rows.forEach(({group_name, id, products_list}) => {
          const search = products_list.filter((item) => regex.test(item.whatsapp))

          listwhatsapp.push({
            id,
            group_name,
            products_list: search
          })
        })

        setSearchRows(listwhatsapp)

        break;

      case 'route':
        const listroute: IGroups[] = []

        rows.forEach(({group_name, id, products_list}) => {
          const search = products_list.filter((item) => regex.test(item.route))

          listroute.push({
            id,
            group_name,
            products_list: search
          })
        })

        setSearchRows(listroute)  

        break;

      case 'link':
        const listlink: IGroups[] = []

        rows.forEach(({group_name, id, products_list}) => {
          const search = products_list.filter((item) => regex.test(item.link))

          listlink.push({
            id,
            group_name,
            products_list: search
          })
        })

        setSearchRows(listlink)

        break;
    
      default:
        setSearchRows(rows)
        break;
    }

  }, [rows, searchBase, searchRows])

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
      field: 'image',
      headerName: 'Imagem',
      width: 100,
      sortable: false,
      headerAlign: 'center',
      disableColumnMenu: true,
      align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Image
          src={params.value}
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
      field: 'summary',
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
      field: 'whatsapp',
      headerName: 'Whatsapp',
      width: 200,
      sortable: false,
      disableColumnMenu: true
    },
    { 
      field: 'id',
      headerName: 'Rota',
      width: 200,
      sortable: false,
      disableColumnMenu: true
    },
    { 
      field: 'link',
      headerName: 'Link',
      width: 250,
      sortable: false,
      disableColumnMenu: true
    }
  ]
  
  const searchTranslate = [
    {
      field: 'group',
      headerName: 'pelo grupo',
    },
    {
      field: 'image',
      headerName: 'pela imagem',
    },
    {
      field: 'name',
      headerName: 'pelo nome',
    },
    {
      field: 'summary',
      headerName: 'pelo resumo',
    },
    {
      field: 'description',
      headerName: 'pela descrição',
    },
    {
      field: 'whatsapp',
      headerName: 'pelo whatsapp',
    },
    {
      field: 'route',
      headerName: 'pela rota',
    },
    {
      field: 'link',
      headerName: 'pelo link',
    }
  ]

  const handleClick = useCallback((id: string) => {
    if(openGroup && openGroup === id) {
      setOpenGroup('');
    } else {
      setOpenGroup(id);
    }
  }, [openGroup])

  return (
    <div>
      <div className={styles.function_bar}>
        <p className={styles.title}>Produtos</p>

        <div className={styles.search_bar}>
          <Select
            defaultValue='name'
            displayEmpty
            sx={{
              '.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select': {
                padding: 0,
                paddingLeft: 2,
                paddingRight: 5,
                fontSize: 15,
                border: 'none'
              },
            }}
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={(e) => setSearchBase(e.target.value || '')}
          >
            {ProductsColumns.map((item, index) => index > 1 && (
              <MenuItem
                key={item.field}
                value={item.field}
              >
                {item.headerName}
              </MenuItem>
            ))}
          </Select>

          <input
            placeholder={`Pesquise ${searchTranslate.find(e => e.field === searchBase)?.headerName?.toLowerCase()} do produto`}
            className={styles.search_bar_input}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className={styles.functions_container}>
          <Link
            href={'/cadastrar-grupo'}
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

      {searchRows.length > 0 && (
        <List
          className={styles.groups}
        >
          {searchRows?.map((group) => group.products_list.length > 0 && (
            <div
              className={styles.list_item}
            >
              <ListItemButton onClick={() => handleClick(group.id)}>
                <ListItemText primary={group.group_name} />
                {openGroup ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openGroup === group.id} timeout="auto" unmountOnExit>
                <div
                  className={styles.table}
                >
                  <TableReorderingComponent
                    columns={ProductsColumns}
                    rows={group.products_list}
                    getData={getData}
                    editRoute='/reorder-products'
                  />
                </div>
              </Collapse>
            </div>
          ))}
        </List>
      )}
    </div>
  );
}
