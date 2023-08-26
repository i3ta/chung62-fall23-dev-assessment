import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import styles from "./table.module.css";

function Status({ status }) {
    return (
        <div className={status ? styles.statusActive : styles.statusInactive}>
            {status ? "Active" : "Inactive"}
        </div>
    );
}

function Project({ project }) {
    const color = (project) => {
        var hue = 0;
        for (var i = 0; i < project.length; i++) {
            hue += project.charCodeAt(i);
            hue %= 256;
        }
        return hue;
    };

    const c = color(project);

    return (
        <div
            className={styles.projectContainer}
            style={{
                color: `hsl(${c}, 100%, 40%)`,
                backgroundColor: `hsl(${c}, 75%, 90%)`,
            }}
        >
            {project[0].toUpperCase() + project.substring(1)}
        </div>
    );
}

function Row({ rowData }) {
    // Deconstruct data
    const {
        name,
        avatar,
        hero_project,
        notes,
        email,
        phone,
        rating,
        status,
        id,
    } = rowData;

    // Return table row
    return (
        <tr className={id % 2 ? styles.rowEven : styles.rowOdd}>
            <td className={styles.contactContainer}>
                <div className={styles.avatarContainer}>
                    <img
                        src={avatar}
                        alt={`Picture of ${name}`}
                        className={styles.avatar}
                    />
                </div>
                {name}
            </td>
            <td className={styles.contactInfo}>
                <p><AiOutlineMail /> {email}</p>
                <p><AiOutlinePhone /> {phone}</p>
            </td>
            <td>
                <Project project={hero_project} />
            </td>
            <td>
                <Status status={status} />
            </td>
            <td>{rating}</td>
        </tr>
    );
}

export default function Table({ tableData }) {
    console.log("created table");
    return (
        <table className={styles.table}>
            <thead className={styles.header}>
                <tr>
                    <th style={{width: '40%'}}>CONTACT NAME</th>
                    <th style={{width: '40%'}}>CONTACT</th>
                    <th>PROJECT</th>
                    <th>STATUS</th>
                    <th>RATING</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((rowData) => {
                    return <Row key={rowData.id} rowData={rowData} />;
                })}
            </tbody>
        </table>
    );
}
