'use client'

import MedicallCastForm from "@/components/pagesForm/medicallCastForm";
import styles from './styles.module.css'
import { useEffect, useState } from "react";
import { IMedicallCast } from "@/utils/interfaces";
import BASE_URL_V2 from "@/lib/axios_v2";

export default function EditBlog ({ params }: { params: { route: string } }) {
  const [defaultValues, setDefaultValues] = useState<IMedicallCast>()

  useEffect(() => {
    BASE_URL_V2.get<IMedicallCast>(`/medicall-cast/${params.route}`)
      .then(({ data }) => {
        setDefaultValues(data)
      })
  }, [])

  return (
    <div className={styles.container}>
      <p className={styles.title}>Editar episódio</p>

      {defaultValues && (
        <MedicallCastForm
          defaultValues={defaultValues}
        />
      )}     
    </div>
  )
}