'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from "next/link";
import { GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { ICategory, IGroups, IProduct } from '@/utils/interfaces';
import { GridDeleteIcon } from '@mui/x-data-grid';
import { Edit, ExpandLess, ExpandMore} from '@mui/icons-material';
import { Button, Collapse, List, ListItemButton, ListItemText, Switch } from '@mui/material';

import BASE_URL from "@/lib/axios";

import AddIcon from '@/components/icons/add'
import TableActions from '@/components/tableComponent/actions';
import TableReorderingComponent from '@/components/tableOrderingComponent';

import styles from "./styles.module.css";
import { siteLink } from '@/utils/siteLink';
import CategoryForm from '@/components/categoryForm';
import { redirect, useRouter } from 'next/navigation';

export default function Home() {
  const [rows, setRows] = useState<IGroups[]>([])
  const [searchRows, setSearchRows] = useState<IGroups[]>([])
  const [openGroup, setOpenGroup] = useState<String>('');
  const [searchBase, setSearchBase] = useState('name')
  const [categoryFormType, setCategoryForm] = useState<'add' | 'edit'>('add')
  const [categoryEdit, setCategoryEdit] = useState<ICategory | undefined>()

  const router = useRouter()

  const getData = async () => {
    return await BASE_URL.get<IGroups[]>('/groups')
    .then(({data}) => {
      data.forEach(group => {
        group.categories.sort((categoryA, categoryB) => categoryA.index > categoryB.index ? 0 : -1)
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
  
    BASE_URL.delete(`/category/${id}`)
      .then(() => {
        toast.dismiss()
        toast.success('Categoria excluida com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000,
        });
        getData()
      })
      .catch((error) => {
        toast.dismiss()
        toast.error(error.response.data.message || 'Erro ao excluir a categoria', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
  }

  const handleChangeStatus = (row: ICategory) => {
    toast.info('Aguarde um instante', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    BASE_URL.put(`/change-category-status/${row.id}`)
      .then(() => {
        toast.dismiss()
        toast.success('Status da categoria alterado com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000,
        });
        getData()
      })
      .catch(() => {
        toast.dismiss()
        toast.error('Erro ao alterar o status da categoria', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })
  }

  const handleSearch = useCallback((value: string) => {
    const regex = new RegExp(value, 'i');

    const listname: IGroups[] = []

    rows.forEach(({active, categories, group_name, id, index}) => {
      const search = categories.filter((category) => regex.test(category.name))
      listname.push({
        id,
        active,
        group_name,
        index,
        categories: search
      })
    })

    if(listname.length > 0) {
      setSearchRows(listname)
    } else {
      setSearchRows(rows)
    }

  }, [rows, searchBase, searchRows])

  const handleEditCategory = (row: ICategory) => {
    setCategoryForm('edit')
    setCategoryEdit(row)
  }

  const handleFinallyEdit = () => {
    setCategoryForm('add')
    setCategoryEdit(undefined)
  }

  const CategoriesColumns: GridColDef[] = [
    {
      field: 'action',
      headerName: 'Ações',
      width: 90,
      headerAlign: 'center',
      renderCell: ({ row } : {row: ICategory}) => TableActions({
        onEdit: () => handleEditCategory(row),
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
      renderCell: ({ row } : {row: ICategory}) => (
        <Switch
          checked={row.active}
          onChange={() => handleChangeStatus(row)}
        />
      ),
      sortable: false,
      disableColumnMenu: true
    },
    { 
      field: 'name',
      headerName: 'Nome',
      width: 150,
      sortable: false,
      disableColumnMenu: true
    },
    { 
      field: 'id',
      headerName: 'Rota',
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row } : {row: ICategory}) => (
        <a
          href={`${siteLink}/produtos/categoria/${row.id}`}
          target='_blank'
        >
          {row.id}
        </a>
      ),
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
        <p className={styles.title}>Grupos</p>

        <div className={styles.search_bar}>
          <input
            placeholder="Pesquise pelo nome da categoria"
            className={styles.search_bar_input}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className={styles.functions_container}>
          <Link
            href={'/cadastrar-grupo'}
            className={`${styles.buttons} ${styles.button_blue}`}
          >
            <AddIcon
              className={styles.button_blue_icon}
            />
            <p>
              Adicionar Grupo
            </p>
          </Link>
        </div>
      </div>

      {searchRows.length > 0 && (
        <List
          className={styles.groups}
        >
          {searchRows?.map((group) => (
            <div
              className={styles.list_item}
            >
              <ListItemButton onClick={() => handleClick(group.id)}>
                <ListItemText primary={group.group_name} />
                {openGroup ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={openGroup === group.id}
                timeout="auto"
                unmountOnExit
                className={styles.collapse}
              >
                <div
                  className={styles.actions_container}
                >
                  <div
                    className={styles.actions_buttons_container}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      disabled={group.categories.length > 1}
                      className={styles.actions_button}
                    >
                      <GridDeleteIcon />

                      Deletar grupo
                    </Button>

                    <Button
                      variant="contained"
                      className={styles.actions_button}
                      onClick={() => router.push(`/editar-grupo/${group.id}`)}
                    >
                      <Edit />

                      Editar grupo
                    </Button>
                  </div>

                  <CategoryForm
                    type={categoryFormType}
                    categoryEdit={categoryEdit}
                    groupId={group.id}
                    refreshData={getData}
                    finallyEdit={handleFinallyEdit}
                  />
                </div>

                {group.categories.length > 0 && (
                  <div
                    className={styles.table}
                  >
                    <TableReorderingComponent
                      columns={CategoriesColumns}
                      rows={group.categories}
                      getData={getData}
                      editRoute='/reorder-categories'
                    />
                  </div>
                )}
              </Collapse>
            </div>
          ))}
        </List>
      )}
    </div>
  );
}
