// Utility bar that contains setting page number and adding new user
import { useRouter } from "next/router";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import styles from "./utils.module.css";

function Button({ addNew }) {
    return (
        <button className={styles.newButton} onClick={addNew}>
            New User
        </button>
    );
}

function PageSelector({ curPage, pageCount }) {
    const router = useRouter();

    const onChange = () => {
        const pageTo = document.getElementById("pageSelector").value;
        router.replace(`/${pageTo}`);
    };

    return (
        <select
            name="pageSelector"
            id="pageSelector"
            onChange={onChange}
            value={curPage}
        >
            {[...Array(pageCount).keys()].map((page) => (
                <option key={page + 1} value={page + 1}>
                    {page + 1}
                </option>
            ))}
        </select>
    );
}

export default function Utils({ curPage, pageCount, addNew }) {
    const router = useRouter();

    const prevPage = () => {
        if (curPage > 1)
            router.replace(
                `/${Math.min(parseInt(curPage) - 1, parseInt(pageCount))}`
            );
    };

    const nextPage = () => {
        if (curPage < pageCount)
            router.replace(`/${Math.max(0, parseInt(curPage) + 1)}`);
    };
    return (
        <div className={styles.utils}>
            <div className={styles.pageSelector}>
                <button className={styles.changePage} onClick={prevPage}>
                    <AiOutlineArrowLeft value={{ size: "30px" }} />
                </button>
                <PageSelector curPage={curPage} pageCount={pageCount} />
                <button className={styles.changePage} onClick={nextPage}>
                    <AiOutlineArrowRight value={{ size: "30px" }} />
                </button>
            </div>
            <Button addNew={addNew} />
        </div>
    );
}
