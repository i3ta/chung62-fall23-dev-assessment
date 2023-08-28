// Stats overlay
import styles from "./stats.module.css";

function StatBar({ name, stat }) {
    return (
        <div className={styles.statBar}>
            <h3>{name}</h3>
            <div>{stat}</div>
        </div>
    );
}

export default function Stats({ visible, stats, data }) {
    // Overlay for showing click statistics
    // Note: because the data isn't sent to the server, no data will ever show up

    const getName = (id) => {
        data.filter((user) => {
            if (user["id"] === id) return user["name"];
        });
    };

    return (
        <>
            {visible && (
                <div className={styles.overlayBackground}>
                    <div className={styles.overlayForeground}>
                        <h1>Statistics</h1>
                        {Object.keys(stats).forEach((v, k) => {
                            return <StatBar name={getName(k)} stat={v} />;
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
