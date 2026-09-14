import styles from './WindowStatusBar.module.css';
import {useWindowContext} from "../context/WindowContext.tsx";
import {ReactNode} from "react";

export function WindowStatusBar({ children }: {children?: ReactNode}) {
    const windowContext = useWindowContext();

    return <div className={styles.win95StatusBar}>
        {children}
        <div className={styles.resizeHandle}
             onMouseDown={(e) => windowContext.resize(e,"SE")}>
        </div>
    </div>;
}