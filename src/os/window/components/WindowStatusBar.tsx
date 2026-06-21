import styles from './WindowStatusBar.module.css';

export function WindowStatusBar() {
    return <div className={styles.win95StatusBar}>
        <div className={styles.resizeHandle}>
            <div></div>
        </div>
    </div>;
}