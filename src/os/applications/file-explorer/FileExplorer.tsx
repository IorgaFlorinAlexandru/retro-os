import {Window} from "../../window";
import {Icons} from "../../../components/Icon/icon.types.ts";
import styles from "./FileExplorer.module.css";
import {useStorage} from "../../../contexts/StorageContext.tsx";
import {useMemo, useState} from "react";
import FileManager from "../../file-manager/components/FileManager.tsx";
import MenuOption from "../../../components/Menu/components/MenuOption.tsx";
import Menu from "../../../components/Menu/components/Menu.tsx";
import MenuDivider from "../../../components/Menu/components/MenuDivider.tsx";

export default function FileExplorer({ title, icon, filePath} : { title: string; icon: Icons, filePath: string }) {
    const storage = useStorage();
    const files = useMemo(() => {
       const folder = storage.files.find((f) => f.path === filePath);

       if (!folder) {
           return [];
       }

       return storage.files.filter(f => f.parentId === folder.id);
    },[storage, filePath]);

    const [ selectionInfo, setSelectionInfo ] = useState<string>("1 object(s) selected");
    const [ storageInfo, setStorageInfo ] = useState<string>("Free Space: 1.89GB, Capacity: 1.99GB");

    return <Window.Root>
        <Window.TitleBar title={title} icon={icon}></Window.TitleBar>
        <Window.MenuBar>
            <MenuOption text="File">
                <Menu>
                    <MenuOption text="Open" isBolded={true} />
                    <MenuOption text="Explore"/>
                    <MenuOption text="Find..."/>
                    <MenuDivider/>
                    <MenuOption text="Format"/>
                    <MenuDivider/>
                    <MenuOption text="Create Shortcut"/>
                    <MenuOption text="Delete" disabled={true}/>
                    <MenuOption text="Rename" disabled={true}/>
                    <MenuOption text="Properties"/>
                    <MenuDivider/>
                    <MenuOption text="Close"/>
                </Menu>
            </MenuOption>
            <MenuOption text="Edit">
                <Menu>
                    <MenuOption text="Undo Rename"/>
                    <MenuDivider/>
                    <MenuOption text="Cut" disabled={true}/>
                    <MenuOption text="Copy" disabled={true}/>
                    <MenuOption text="Paste" disabled={true}/>
                    <MenuOption text="Paste Shortcut" disabled={true}/>
                    <MenuDivider/>
                    <MenuOption text="Select All"/>
                    <MenuOption text="Invert Selection"/>
                </Menu>
            </MenuOption>
            <MenuOption text="View">
                <Menu>
                    <MenuOption text="Toolbar"/>
                    <MenuOption text="Status Bar"/>
                    <MenuDivider/>
                    <MenuOption text="Large Icons"/>
                    <MenuOption text="Small Icons"/>
                    <MenuOption text="List"/>
                    <MenuOption text="Details"/>
                    <MenuDivider/>
                    <MenuOption text="Arrange Icons">
                        <Menu>
                            <MenuOption text="by Drive Letter"/>
                            <MenuOption text="by Type"/>
                            <MenuOption text="by Size"/>
                            <MenuOption text="by Free Space"/>
                            <MenuDivider/>
                            <MenuOption text="Auto Arrange"/>
                        </Menu>
                    </MenuOption>
                    <MenuOption text="Line up Icons"/>
                    <MenuDivider/>
                    <MenuOption text="Refresh"/>
                    <MenuOption text="Options..."/>
                </Menu>
            </MenuOption>
            <MenuOption text="Help">
                <Menu>
                    <MenuOption text="Help Topics"/>
                    <MenuDivider/>
                    <MenuOption text="About Retro-Os"/>
                </Menu>
            </MenuOption>
        </Window.MenuBar>
        <div className={styles.fileExplorerContent}>
            <FileManager files={files}></FileManager>
        </div>
        <Window.StatusBar>
            <div className={`win95-inset ${styles.statusPane} ${styles.selectionInfo} `}>
                {selectionInfo}
            </div>
            <div className={`win95-inset ${styles.statusPane} ${styles.storageInfo}`}>
                {storageInfo}
            </div>
        </Window.StatusBar>
    </Window.Root>
}