import { Edit } from "@mui/icons-material";
import { GridDeleteIcon } from "@mui/x-data-grid";

import styles from './styles.module.css'
import Link from "next/link";

interface Params {
  onDelete: () => void
  editRoute?: string
  onEdit?: () => void
}

export default function TableActions ({editRoute, onDelete, onEdit}: Params) {
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
      {editRoute && (
        <Link
          href={editRoute}
        >
          <Edit
            className={styles.action_icon_edit}
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