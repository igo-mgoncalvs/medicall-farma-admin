import { Edit } from "@mui/icons-material";
import { GridDeleteIcon } from "@mui/x-data-grid";

import styles from './styles.module.css'
import Link from "next/link";

interface Params {
  onDelete: () => void
  editRoute: string
}

export default function TableActions ({editRoute, onDelete}: Params) {
  return (
    <div
      className={styles.actions_icons_container}
    >
      <div
        onClick={onDelete}
      >
        <GridDeleteIcon
          className={styles.action_icon_delete}
        />
      </div>
      <Link
        href={editRoute}
      >
        <Edit
          className={styles.action_icon_edit}
        />
      </Link>
    </div>
  )
}