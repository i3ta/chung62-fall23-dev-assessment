// Utility bar that contains setting page number and adding new user
import { useRouter } from "next/router";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import styles from "./utils.module.css";

function Button({ addNew }) {
    // View for new user button 

    return (
        <button className={styles.newButton} onClick={addNew}>
            New User
        </button>
    );
}

function PageSelector({ curPage, pageCount }) {
    // View for page selector
    
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
    // Utility bar (page selector, new user button)

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
                <button className={styles.changePage} onClick={prevPage} style={{opacity: (curPage == 1 ? 0.3 : 1)}}>
                    <AiOutlineArrowLeft value={{ size: "60px" }} />
                </button>
                <PageSelector curPage={curPage} pageCount={pageCount} />
                <button className={styles.changePage} onClick={nextPage} style={{opacity: (curPage == pageCount ? 0.3 : 1)}}>
                    <AiOutlineArrowRight value={{ size: "60px" }} />
                </button>
            </div>
            <Button addNew={addNew} />
        </div>
    );
}
