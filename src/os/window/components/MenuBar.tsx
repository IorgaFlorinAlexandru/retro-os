import styles from './MenuBar.module.css'

export default function MenuBar() {
    return <div className={styles.win95MenuBar}>
        <ul className={styles.windowMenuItems}>
            <li>File</li>
            <li>Edit</li>
            <li>View</li>
            <li>Help</li>
        </ul>
    </div>
}