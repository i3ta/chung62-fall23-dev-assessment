import styles from './table.module.css'

function Row ({ rowData }) {
    // Deconstruct data
    const { name, avatar, hero_project, notes, email, phone, rating, status, id } = rowData;

    // Return table row
    return (
        <tr>
            <td>{name}</td>
            <td>
                <img src={avatar} alt={`Picture of ${name}`} />
            </td>
            <td>{phone}</td>
            <td>{email}</td>
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
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Avatar</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Hero Project</th>
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