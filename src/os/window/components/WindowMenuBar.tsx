import styles from './WindowMenuBar.module.css'

export function WindowMenuBar() {
    return <div className={styles.win95MenuBar}>
        <ul className={styles.windowMenuItems}>
            <li>File</li>
            <li>Edit</li>
            <li>View</li>
            <li>Help</li>
        </ul>
    </div>
}