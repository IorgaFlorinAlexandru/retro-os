import styles from './WindowStatusBar.module.css';
import {useWindowContext} from "../context/WindowContext.tsx";

export function WindowStatusBar() {
    const windowContext = useWindowContext();

    return <div className={styles.win95StatusBar}>
        <div className={styles.resizeHandle}
             onMouseDown={(e) => windowContext.resize(e,"SE")}>
            <div></div>
        </div>
    </div>;
}