import styles from './Desktop.module.css';
import TaskBar from "./TaskBar.tsx";
import FileManager from "../../file-manager/components/FileManager.tsx";
import {FileFolder, TextDocument} from "../../../types/memory.type.ts";
import Window from "../../window/components/Window.tsx";

export default function Desktop() {

    const desktopFolder = new FileFolder('desktop');
    desktopFolder.files = [
        new FileFolder('My computer'),
        new TextDocument('Text')
    ]

    return <div className={styles.win95Desktop}>
        <div className={styles.win95DesktopContent}>
            <FileManager folder={desktopFolder}></FileManager>
            <Window></Window>
        </div>
        <TaskBar></TaskBar>
    </div>
}