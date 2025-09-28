import styles from './Desktop.module.css';
import TaskBar from "./TaskBar.tsx";
import FileManager from "../../file-manager/components/FileManager.tsx";
import {FileFolder, TextDocument} from "../../../types/memory.type.ts";
import Window from "../../window/components/Window.tsx";
import {Icons} from "../../../components/Icon/icon.types.ts";
import DesktopContextMenu from "../../../context/components/DesktopContextMenu.tsx";
import {DesktopMenuActions} from "../desktop.types.ts";
import {useContextMenu} from "../../../hooks/useContextMenu.ts";

export default function Desktop() {
    useContextMenu<DesktopMenuActions>(DesktopContextMenu, (value) => {
       console.log(value);
    });

    const desktopFolder = new FileFolder('desktop');
    desktopFolder.files = [
        new FileFolder('My computer'),
        new TextDocument('Text')
    ]

    return <div className={styles.win95Desktop}>
        <div className={styles.win95DesktopContent}>
            <FileManager folder={desktopFolder}></FileManager>
            <Window icon={Icons.MY_COMPUTER} title='My computer'></Window>
        </div>
        <TaskBar></TaskBar>
    </div>
}