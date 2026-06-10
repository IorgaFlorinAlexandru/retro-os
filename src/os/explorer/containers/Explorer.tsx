import Desktop from "../components/Desktop.tsx";
import TaskBar from "../components/TaskBar.tsx";
import styles from './Explorer.module.css';
import {DesktopProvider} from "../contexts/DesktopContext.tsx";
import {ComputerFileFolder, FileFolder, TextDocument} from "../../../types/file.types.ts";

export default function Explorer() {
    const files = [
        new ComputerFileFolder(),
        new FileFolder('Games'),
        new TextDocument('Text'),
    ];

    return <>
        <DesktopProvider files={files}>
            <div className={styles.win95Screen}>
                <Desktop></Desktop>
                <TaskBar></TaskBar>
            </div>
        </DesktopProvider>
    </>
}