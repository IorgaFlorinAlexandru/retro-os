import {Window} from "../../window";
import {Icons} from "../../../components/Icon/icon.types.ts";
import styles from "./FileExplorer.module.css";
import {useStorage} from "../../../contexts/StorageContext.tsx";
import {useMemo, useState, useCallback} from "react";
import FileManager from "../../file-manager/components/FileManager.tsx";
import MenuOption from "../../../components/Menu/components/MenuOption.tsx";
import Menu from "../../../components/Menu/components/Menu.tsx";
import MenuDivider from "../../../components/Menu/components/MenuDivider.tsx";
import {SystemFile} from "../../../types/file.types.ts";

export default function FileExplorer({ title, icon, filePath} : { title: string; icon: Icons, filePath: string }) {
    const storage = useStorage();
    const files = useMemo(() => {
       const folder = storage.files.find((f) => f.path === filePath);

       if (!folder) {
           return [];
       }

       return storage.files.filter(f => f.parentId === folder.id);
    },[storage, filePath]);

    const fileInfo = useMemo(() => {
        const count = files.filter(f => !f.isHidden).length;
        const hiddenCount = files.filter(f => f.isHidden).length;
        return `${count} object(s)` + (hiddenCount ? ` (plus ${hiddenCount} hidden)` : '');
    },[files]);

    const [ selectionInfo, setSelectionInfo ] = useState<string>(`${files.length} object(s)`);
    const [ storageInfo, setStorageInfo ] = useState<string>('');
    // If more components/apps reuse menu items functionality, would be good to use WindowContext
    const [ showStatusBar , setShowStatusBar ] = useState<boolean>(true);

    const handleOnFilesSelected = useCallback((selectedFiles: SystemFile[]) => {
        if(selectedFiles.length === 1 && selectedFiles[0].type === 'drive') {
            setSelectionInfo(`1 object(s) selected`);
            setStorageInfo('Free space: 1.89GB, Capacity: 1.99GB');
            return;
        }

        const size = selectedFiles.reduce((acc, curr) => {
          if(curr.type === 'folder' || curr.type === 'drive') {
              return acc;
          }
            return acc + curr.size;
        }, 0);
        setSelectionInfo(selectedFiles.length ? `${selectedFiles.length} object(s) selected` : fileInfo);
        setStorageInfo(size ? size + 'KB' : '');

    },[fileInfo]);

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
                    <MenuOption text="Status Bar"
                                indicator={showStatusBar ? "check" : undefined}
                                command={() => setShowStatusBar(!showStatusBar)}/>
                    <MenuDivider/>
                    <MenuOption indicator="bullet" text="Large Icons"/>
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
            <FileManager files={files} onFilesSelected={handleOnFilesSelected}></FileManager>
        </div>
        { showStatusBar ?
            <Window.StatusBar>
                <div className={`win95-inset ${styles.statusPane} ${styles.selectionInfo} `}>
                    {selectionInfo}
                </div>
                <div className={`win95-inset ${styles.statusPane} ${styles.storageInfo}`}>
                    {storageInfo}
                </div>
            </Window.StatusBar>
            : null }
    </Window.Root>
}