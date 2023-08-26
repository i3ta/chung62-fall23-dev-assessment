import styles from './header.module.css';

export default function Header () {
    return (
        <header className={styles.header}>
            <h1 className={styles.titleName}>HaHa Heroes</h1>
        </header>
    );
}