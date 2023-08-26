import styles from './table.module.css'

function Row ({ rowData }) {
    // Deconstruct data
    const { name, avatar, hero_project, notes, email, phone, rating, status, id } = rowData;

    // Return table row
    return (
        <tr className={(id % 2 ? styles.rowEven : styles.rowOdd)}>
            <td className={styles.avatarContainer}>
                <img src={avatar} alt={`Picture of ${name}`} className={styles.avatar} />
            </td>
            <td>{name}</td>
            <td>{phone}</td>
            <td>
                <a href={`mailto:${email}`} className={styles.email}>{email}</a>
            </td>
            <td>{rating}</td>
            <td>{(status ? 'Active' : 'Inactive')}</td>
            <td>{hero_project}</td>
        </tr>
    );
}

export default function Table ({ tableData }) {
    console.log('created table');
    return (
        <table className={styles.table}>
            <thead className={styles.header}>
                <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Project</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((rowData) => {
                    return <Row key={rowData.id} rowData={rowData} />
                })}
            </tbody>
        </table>
    );
}