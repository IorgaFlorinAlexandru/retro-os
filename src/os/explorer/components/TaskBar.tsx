import styles from './TaskBar.module.css';
import StartMenu from "../../start-menu/components/StartMenu.tsx";
import {useContextMenu} from "../../../hooks/useContextMenu.ts";
import {ContextAction} from "../../../types/context-menu.types.ts";
import TaskbarContextMenu from "../../../context/components/TaskbarContextMenu.tsx";

export default function TaskBar() {
    const ref = useContextMenu<ContextAction>(TaskbarContextMenu, (value) => {
        console.log(value);
    });

    return <div ref={ref} className={styles.container}>
        <div className={styles.win95TaskBar}>
            <StartMenu></StartMenu>
            <div className={`win95-inset ${styles.systemTray}`}>
                <span>12:35 AM</span>
            </div>
        </div>
    </div>
}