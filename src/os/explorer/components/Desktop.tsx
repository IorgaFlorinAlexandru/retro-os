import styles from './Desktop.module.css';
import TaskBar from "./TaskBar.tsx";
import FileManager from "../../file-manager/components/FileManager.tsx";
import {ComputerFileFolder, FileFolder, TextDocument} from "../../../types/memory.type.ts";

export default function Desktop() {
    const desktopFolder = new FileFolder('desktop');
    desktopFolder.files = [
        new ComputerFileFolder(),
        new FileFolder('Games'),
        new TextDocument('Text'),
    ]

    return <div className={styles.win95Desktop}>
        <div className={styles.win95DesktopContent}>
            <FileManager folder={desktopFolder}></FileManager>
            {/*<Window icon={Icons.MY_COMPUTER} title='My computer'></Window>*/}
        </div>
        <TaskBar></TaskBar>
    </div>
}