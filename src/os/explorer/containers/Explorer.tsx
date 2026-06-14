import Desktop from "../components/Desktop.tsx";
import TaskBar from "../components/TaskBar.tsx";
import styles from './Explorer.module.css';

export default function Explorer() {
    return <>
        <div className={styles.win95Screen}>
            <Desktop></Desktop>
            <TaskBar></TaskBar>
        </div>
    </>
}