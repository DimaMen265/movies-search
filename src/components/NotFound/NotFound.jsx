import styles from "./NotFound.module.css";

export const NotFound = () => {
    return (
        <div className={styles.notFoundContainer}>
            <h1 className={styles.notFoundTitle}>404</h1>
            <p className={styles.notFoundText}>Oops! Page not found.</p>
        </div>
    )
}