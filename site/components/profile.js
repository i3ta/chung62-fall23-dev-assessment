import { useState, useEffect } from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { fetchUser } from "./api";
import styles from "./profile.module.css";

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
            {project.length > 0
                ? project[0].toUpperCase() + project.substring(1)
                : ""}
        </div>
    );
}

export default function Profile({ id }) {
    const [profile, setProfile] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function fetchDataAsync() {
            const fetchedData = await fetchUser(id);
            setProfile(fetchedData);
            setLoaded(true);
        }

        fetchDataAsync();
    }, []);

    return (
        <>
            {loaded && (
                <div className={styles.profileContainer}>
                    <h1 style={{ gridColumn: "1/3", gridRow: "1/2" }}>
                        {profile["name"]}
                    </h1>
                    <img
                        className={styles.avatar}
                        src={profile["avatar"]}
                        alt={`Photo of ${profile["name"]}`}
                        style={{ gridColumn: "2/3", gridRow: "1/4" }}
                    />
                    <div
                        className={styles.tags}
                        style={{ gridColumn: "1/2", gridRow: "2/3" }}
                    >
                        <Status status={profile["status"]} />
                        <Project project={profile["hero_project"]} />
                    </div>
                    <div className={styles.contact}>
                        <AiOutlineMail /> {profile["email"]}
                    </div>
                    <div className={styles.contact}>
                        <AiOutlinePhone /> {profile["phone"]}
                    </div>
                    <h3 className={styles.label} style={{gridColumn: "1/3"}}>Notes</h3>
                    <div style={{gridColumn: "1/3"}}>{profile["notes"]}</div>
                </div>
            )}
        </>
    );
}
