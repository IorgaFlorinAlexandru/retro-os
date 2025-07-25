import styles from './Desktop.module.css';
import TaskBar from "./TaskBar.tsx";
import FileManager from "../../file-manager/components/FileManager.tsx";
import {FileFolder, TextDocument} from "../../../types/memory.type.ts";
import Window from "../../window/components/Window.tsx";
import DropdownMenu from "../../../components/DropdownMenu/components/DropdownMenu.tsx";
import DropdownMenuOption from "../../../components/DropdownMenu/components/DropdownMenuOption.tsx";
import DropdownDivider from "../../../components/DropdownMenu/components/DropdownDivider.tsx";

export default function Desktop() {

    const desktopFolder = new FileFolder('desktop');
    desktopFolder.files = [
        new FileFolder('My computer'),
        new TextDocument('Text')
    ]

    return <div className={styles.win95Desktop}>
        <DropdownMenu>
            <DropdownMenuOption text='Arrange Icons'></DropdownMenuOption>
            <DropdownMenuOption text='Line up Icons'></DropdownMenuOption>
            <DropdownDivider></DropdownDivider>
            <DropdownMenuOption text='Paste' disabled={true}></DropdownMenuOption>
            <DropdownMenuOption text='Paste Shortcut' disabled={true}></DropdownMenuOption>
            <DropdownDivider></DropdownDivider>
            <DropdownMenuOption text='New'></DropdownMenuOption>
            <DropdownMenuOption text='Properties'></DropdownMenuOption>
        </DropdownMenu>
        <div className={styles.win95DesktopContent}>
            <FileManager folder={desktopFolder}></FileManager>
            <Window title='My computer'></Window>
        </div>
        <TaskBar></TaskBar>
    </div>
}