import styles from './StatusBar.module.css';

export default function StatusBar() {
    return <div className={styles.win95StatusBar}>
        <div className={styles.resizeHandle}>
            <div></div>
        </div>
    </div>;
}