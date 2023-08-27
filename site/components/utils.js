// Utility bar that contains adding new user

import styles from './utils.module.css'

function Button ({ addNew }) {
    return (
        <button className={styles.newButton} onClick={addNew}>New User</button>
    );
}

export default function Utils ({ addNew }) {
    return (
        <div className={styles.utils}>
            <Button addNew={addNew} />
        </div>
    );
}