import { AiOutlineBarChart } from "react-icons/ai";
import styles from "./header.module.css";

export default function Header({ showStats }) {
    // Top header bar
    
    return (
        <header className={styles.header}>
            <h1 className={styles.titleName}>HaHa Heroes</h1>
            <button className={styles.statsButton} onClick={showStats}>
                <AiOutlineBarChart size={50} color={"#ffffff"} />
            </button>
        </header>
    );
}
