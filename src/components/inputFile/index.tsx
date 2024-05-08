import { ChangeEvent, useCallback } from "react";
import { FormControl, FormHelperText } from "@mui/material";
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

import BASE_URL from "@/lib/axios";

import styles from './styles.module.css'

interface IParams {
  errors?: string | undefined
  isSubmitted: boolean 
  imageUrl: string
  imageId: string
  setValue: ({link, file_name}: {link: string, file_name: string}) => void
  id?: string
  backgroundColor?: string
  enableEdit: boolean
}

interface IPostImage {
  link: string
  file_name: string
}

export default function InputFile({errors, isSubmitted, imageUrl, imageId, setValue, id, backgroundColor, enableEdit}: IParams) {
  const errorMessageImage: undefined | boolean = !!errors && isSubmitted

  const handleInputFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget

    toast.info('Publicando arquivo, aguarde', {
      position: "top-right",
      pauseOnHover: false,
      autoClose: false,
    });

    if(!files) {
      return ""
    }

    const selectedFile = files[0]

    const data = new FormData()

    data.append('file', selectedFile)

    const token = Cookies.get('token')

    if(enableEdit) {
      BASE_URL.put<IPostImage>(`/edit-file`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(({data: { link, file_name }}) => {
          toast.dismiss()
          toast.success('Arquivo editado com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
          setValue({file_name, link})
        })
        .catch((error) => {
          toast.dismiss()
          toast.error('Erro ao editar o arquivo', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
        })
    } else {
      BASE_URL.post<IPostImage>('/upload-file', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(({data: { link, file_name }}) => {
          toast.dismiss()
          toast.success('Arquivo publicado com sucesso!', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
          setValue({file_name, link})
        })
        .catch((error) => {
          toast.dismiss()
          toast.error('Erro ao publicar o arquivo', {
            position: "top-right",
            pauseOnHover: false,
            autoClose: 5000
          });
        })
    }
  }, [enableEdit, setValue])

  return (
    <FormControl
      error={errorMessageImage}
    >
      {imageUrl ? (
        <object width="400" height="500" type="application/pdf" data={`${imageUrl}&embedded=true`} />
      ): (
        <label
          htmlFor={id || 'video'}
          className={`${styles.imageLabel} ${errorMessageImage && styles.imageError} ${imageUrl && styles.imageLabelActive}`}
          style={{
            backgroundColor,
          }}
        >
          <div
            className={`${styles.icon_container} ${errorMessageImage && styles.icon_container_error} ${backgroundColor && styles.labelWhite}`}
          >
            <InsertDriveFile
              className={`${styles.icon} ${errorMessageImage && styles.icon_error} ${backgroundColor && styles.iconWhite}`}
            />
            Selecione o arquivo
          </div>
        </label>
      )}
      
      <input
        type="file"
        id={id || 'video'}
        accept="application/pdf"
        className={styles.inputFile}
        onChange={handleInputFile}
      />

      {errorMessageImage && (
        <FormHelperText>
          {errors}
        </FormHelperText>
      )}
    </FormControl>
  )
}