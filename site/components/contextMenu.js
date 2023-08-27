import Link from "next/link";
import styles from "./contextMenu.module.css";

export default function ContextMenu ({ vis, id, loc, onEdit, onDelete }) {
    const edit = () => {
        onEdit(id);
    }

    const del = () => {
        onDelete(id);
    }
    
    return (
        <div className={styles.contextMenu} style={{display: (vis ? "block" : "none"), top: loc.y, left: loc.x}}>
            <div><Link href={`/notes/${id}`}>Notes</Link></div>
            <div onClick={edit}>Edit</div>
            <div onClick={del}>Delete</div>
        </div>
    )
}