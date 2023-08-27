import { useState, useEffect } from 'react';
import styles from "./contextMenu.module.css";

export default function ContextMenu ({ vis, id, loc, onEdit, onDelete }) {
    const showNotes = (id) => {}

    const edit = (id) => {}

    const del = (id) => {}
    
    return (
        <div className={styles.contextMenu} style={{display: (vis ? "block" : "none"), top: loc.y, left: loc.x}}>
            <div onClick={showNotes}>Notes</div>
            <div onClick={edit}>Edit</div>
            <div onClick={del}>Delete</div>
        </div>
    )
}