import styles from './Desktop.module.css';
import Window from "../../window/components/Window.tsx";
import TaskBar from "./TaskBar.tsx";

export default function Desktop() {
    return <div className={styles.win95Desktop}>
        <div className={styles.win95DesktopContent}>
            <Window></Window>
            <br/>
        </div>
        <TaskBar></TaskBar>
    </div>
}