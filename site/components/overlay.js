import styles from "./overlay.module.css";

export default function Overlay({ user, setUser, visibility, closeOverlay, modifyUser }) {
    console.log(user);
    console.log(`ID ${user['id']}`);

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const submitInfo = (e) => {
        e.preventDefault();
        console.log(`attempting to modify`);
        console.log(user);
        modifyUser();
        closeOverlay();
    }

    return (
        <div className={styles.overlayBackground} style={{display: (visibility ? "block" : "none")}}>
            <div className={styles.overlayForeground}>
                <form className={styles.input}>
                    <input
                        style={{ gridColumn: "1/3" }}
                        className={styles.inputName}
                        type="text"
                        name="name"
                        placeholder="First Last"
                        value={user["name"]}
                        onChange={onChange}
                        required
                    />
                    <div
                        className={styles.activity}
                        style={{ gridColumn: "1/2" }}
                    >
                        <label for="status">Active</label>
                        <input
                            type="checkbox"
                            name="status"
                            value={user["status"]}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <img
                        style={{ gridColumn: "1/2", gridRow: "3/7" }}
                        className={styles.avatarPreview}
                        src={user["avatar"]}
                    />
                    <input
                        style={{ gridColumn: "1/2" }}
                        id="inputAvatar"
                        type="url"
                        name="avatar"
                        placeholder="Profile picture URL"
                        value={user["avatar"]}
                        onChange={onChange}
                        required
                    />
                    <input
                        style={{ gridColumn: "2/3" }}
                        type="text"
                        name="hero_project"
                        placeholder="Hero Project"
                        value={user["hero_project"]}
                        onChange={onChange}
                        required
                    />
                    <input
                        style={{ gridColumn: "2/3" }}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user["email"]}
                        onChange={onChange}
                        required
                    />
                    <input
                        style={{ gridColumn: "2/3" }}
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={user["phone"]}
                        onChange={onChange}
                        required
                    />
                    <input
                        style={{ gridColumn: "2/3" }}
                        type="text"
                        name="rating"
                        placeholder="Rating"
                        value={user["rating"]}
                        onChange={onChange}
                        required
                    />
                    <textarea
                        style={{ gridColumn: "2/3", gridRow: "6/8" }}
                        type="text"
                        name="notes"
                        placeholder="Notes"
                        value={user["notes"]}
                        onChange={onChange}
                        required
                    />
                    <div
                        className={styles.buttonContainer}
                        style={{ gridColumn: "2/3" }}
                    >
                        <input
                            className={styles.cancel}
                            type="button"
                            value="Cancel"
                            onClick={closeOverlay}
                        />
                        <input
                            className={styles.submit}
                            type="submit"
                            value="Save"
                            onClick={submitInfo}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
