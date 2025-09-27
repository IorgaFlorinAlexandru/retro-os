import styles from './Desktop.module.css';
import TaskBar from "./TaskBar.tsx";
import FileManager from "../../file-manager/components/FileManager.tsx";
import {FileFolder, TextDocument} from "../../../types/memory.type.ts";
import Window from "../../window/components/Window.tsx";
import {Icons} from "../../../components/Icon/icon.types.ts";
import {useContextMenu} from "../../../context/MenuContext.tsx";
import DesktopContextMenu from "./DesktopContextMenu.tsx";
import {useEffect} from "react";
import {DesktopMenuActions} from "../desktop.types.ts";

export default function Desktop() {
    const contextMenu = useContextMenu();

    useEffect(() => {
        const handleContextMenu = async (e) => {
            e.preventDefault();
            try {
                const response = await contextMenu.open<DesktopMenuActions>(DesktopContextMenu, {x: e.clientX, y: e.clientY});
                console.log(response);
            } catch (error) {
                console.error(error);
            }

        };
        document.body.addEventListener('contextmenu', handleContextMenu, false);

        return () => document.body.removeEventListener('contextmenu', handleContextMenu, false);
    }, []);

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