import { AiOutlineBarChart } from "react-icons/ai";
import styles from "./header.module.css";
import { deleteData } from "./api";

export default function Header({ showStats }) {
    return (
        <header className={styles.header}>
            <h1 className={styles.titleName}>HaHa Heroes</h1>
            <button className={styles.statsButton} onClick={showStats}>
                <AiOutlineBarChart size={50} color={"#ffffff"} />
            </button>
        </header>
    );
}
