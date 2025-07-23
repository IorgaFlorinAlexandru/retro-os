import styles from './StartMenu.module.css';
import {RefObject} from "react";

// @ts-ignore
export default function StartMenu({open, ref, onClose}: StartMenuProps) {

    if(open) {
        return <div ref={ref} className={`win95-control ${styles.win95StartMenu}`}>
            <div className={styles.win95Logo}>
                <h1>Windows<span>95</span></h1>
            </div>
        </div>
    }
}

interface StartMenuProps {
    open: boolean;
    ref?: RefObject<HTMLDivElement | null>;
    onClose: () => void;
}