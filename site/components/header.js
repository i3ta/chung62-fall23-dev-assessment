import styles from './header.module.css';
import { deleteData } from './api';

function newProfile () {
    deleteData(1);
}

export default function Header () {
    return (
        <header className={styles.header}>
            <h1 className={styles.titleName}>HaHa Heroes</h1>
            <button onClick={newProfile} className={styles.newButton}>Add Volunteer</button>
        </header>
    );
}