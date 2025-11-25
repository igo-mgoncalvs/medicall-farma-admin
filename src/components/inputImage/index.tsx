import { ChangeEvent, useCallback, useEffect, useState } from "react";
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
  onChange: ({src}: {src: string | ArrayBuffer}) => void
  id?: string
  backgroundColor?: string
  src: string | ArrayBuffer
  description?: string
}

export default function InputImage({errors, isSubmitted, onChange, src, id, backgroundColor, description}: IParams) {
  const [base64, setBase64] = useState<string | ArrayBuffer | null>(src)

  const errorMessageImage: undefined | boolean = !!errors && isSubmitted

  useEffect(() => {
    if(src) {
      setBase64(src)
    }
  }, [src])

  useEffect(() => {
    if(base64) {
      onChange({src: base64})
    }
  }, [base64])

  const handleInputFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget

    if(!files) {
      return ""
    }

    const selectedFile = files[0]

    const reader = new FileReader()

    reader.onloadend = () => {
      setBase64(reader.result)
    }

    reader.readAsDataURL(selectedFile)
  }

  return (
    <FormControl
      error={errorMessageImage}
    >
      <label
        htmlFor={id || 'video'}
        className={`${styles.imageLabel} ${errorMessageImage && styles.imageError} ${base64 && styles.imageLabelActive}`}
        style={{
          backgroundColor,
        }}
      >
        {base64 ? (
          <img
            className={styles.image}
            src={base64?.toString() || ''}
            alt="upload-image"
          />
        ): (
          <div
            className={`${styles.icon_container} ${errorMessageImage && styles.icon_container_error} ${backgroundColor && styles.labelWhite}`}
          >
            <ImageIcon
              className={`${styles.icon} ${errorMessageImage && styles.icon_error} ${backgroundColor && styles.iconWhite}`}
            />
            Selecione a imagem {description}
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