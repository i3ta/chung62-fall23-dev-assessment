import styles from './header.module.css';

function newProfile () {

}

export default function Header () {
    return (
        <header className={styles.header}>
            <h1 className={styles.titleName}>HaHa Heroes</h1>
            <button onClick={newProfile} className={styles.newButton}>Add Volunteer</button>
        </header>
    );
}