import { AiOutlineLeft } from 'react-icons/ai';
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../../components/header";
import Profile from "../../components/profile";
import styles from "./[id].module.css"

export default function Notes() {
    const router = useRouter();
    const id = router.query.id;

    return (
        <>
            {id && (
            <>
                <Header />
                <Link className={styles.backButton} href="../"><AiOutlineLeft />Back</Link>
                <Profile id={id} />
            </>
            )}
        </>
    );
}
