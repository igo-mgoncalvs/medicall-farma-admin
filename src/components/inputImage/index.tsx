import { ChangeEvent, useCallback } from "react";
import { FormControl, FormHelperText } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

import BASE_URL from "@/lib/axios";

import styles from './styles.module.css'

interface IImageForm {
  image: string 
  imageId: string 
}

interface IParams {
  errors?: string | undefined
  isSubmitted: boolean 
  imageUrl: string
  imageId: string
  setValue: ({link, file_name}: {link: string, file_name: string}) => void
  id?: string
  backgroundColor?: string
}

interface IPostImage {
  link: string
  file_name: string
}

export default function InputImage({errors, isSubmitted, imageUrl, imageId, setValue, id, backgroundColor}: IParams) {
  const errorMessageImage: undefined | boolean = !!errors && isSubmitted

  const handleInputFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget

    toast.info('Publicando imagem, aguarde', {
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

    BASE_URL.post<IPostImage>('/upload-image', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(({data: { link, file_name }}) => {
        toast.dismiss()
        toast.success('Imagem publicada com sucesso!', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
        setValue({file_name, link})
      })
      .catch((error) => {
        toast.dismiss()
        toast.error('Erro ao publicar a imagem', {
          position: "top-right",
          pauseOnHover: false,
          autoClose: 5000
        });
      })

    if(imageUrl) {
      BASE_URL.delete<IPostImage>(`/delete-image/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }

  }, [imageUrl, setValue])

  return (
    <FormControl
      error={errorMessageImage}
    >
      <label
        htmlFor={id || 'video'}
        className={`${styles.imageLabel} ${errorMessageImage && styles.imageError} ${imageUrl && styles.imageLabelActive}`}
        style={{
          backgroundColor,
        }}
      >
        {imageUrl ? (
          <img
            className={styles.image}
            src={imageUrl}
            alt=""
          />
        ): (
          <div
            className={`${styles.icon_container} ${errorMessageImage && styles.icon_container_error} ${backgroundColor && styles.labelWhite}`}
          >
            <ImageIcon
              className={`${styles.icon} ${errorMessageImage && styles.icon_error} ${backgroundColor && styles.iconWhite}`}
            />
            Selecione a imagem
          </div>
        )}
      </label>
      
      <input
        type="file"
        id={id || 'video'}
        accept="image/*"
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