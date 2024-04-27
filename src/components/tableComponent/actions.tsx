import { Edit } from "@mui/icons-material";
import { GridDeleteIcon } from "@mui/x-data-grid";

import styles from './styles.module.css'
import Link from "next/link";

interface Params {
  onDelete: () => void
  editRoute?: string
  onEdit?: () => void
  diabledDelete: boolean
  diabledEdit: boolean
}

export default function TableActions ({editRoute, onDelete, onEdit, diabledDelete, diabledEdit}: Params) {
  return (
    <div
      className={styles.actions_icons_container}
    >
      <div
        onClick={diabledDelete ? () => null : onDelete}
      >
        <GridDeleteIcon
          className={`${styles.action_icon_delete} ${diabledDelete ? styles.action_icon_delete_disable : ''}`}
        />
      </div>
      {editRoute && (
        <Link
          href={diabledEdit ? '' : editRoute}
        >
          <Edit
            className={`${styles.action_icon_edit} ${diabledEdit ? styles.action_icon_edit_disable : ''}`}
          />
        </Link>
      )}

      {onEdit && (
        <div
          onClick={onEdit}
        >
          <Edit
            className={styles.action_icon_edit}
          />
        </div>
      )}
    </div>
  )
}