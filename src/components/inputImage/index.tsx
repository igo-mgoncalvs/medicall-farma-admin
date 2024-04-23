import { ChangeEvent, useCallback } from "react";
import { FormControl, FormHelperText } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import Image from "next/image";
import { toast } from "react-toastify";

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
}

interface IPostImage {
  link: string
  file_name: string
}

export default function InputImage({errors, isSubmitted, imageUrl, imageId, setValue}: IParams) {
  const errorMessageImage: undefined | boolean = !!errors && isSubmitted
  console.log(errors)

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

    BASE_URL.post<IPostImage>('/upload-image', data)
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
      BASE_URL.delete<IPostImage>(`/delete-image/${imageId}`)
    }

  }, [imageUrl, setValue])

  return (
    <FormControl
      error={errorMessageImage}
    >
      <label
        htmlFor="video"
        className={`${styles.imageLabel} ${errorMessageImage && styles.imageError}`}
      >
        {imageUrl ? (
          <Image
            priority
            width={100}
            height={100}
            src={imageUrl}
            alt="Logo da Imgor branco"
          />
        ): (
          <div
            className={`${styles.icon_container} ${errorMessageImage && styles.icon_container_error}`}
          >
            <ImageIcon
              className={`${styles.icon} ${errorMessageImage && styles.icon_error}`}
            />
            Selecione a imagem do produto
          </div>
        )}
      </label>
      
      <input
        type="file"
        id='video'
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