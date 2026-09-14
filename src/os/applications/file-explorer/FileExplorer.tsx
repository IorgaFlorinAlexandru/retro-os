import {Window} from "../../window";
import {Icons} from "../../../components/Icon/icon.types.ts";
import styles from "./FileExplorer.module.css";
import {useStorage} from "../../../contexts/StorageContext.tsx";
import {useMemo, useState} from "react";
import FileManager from "../../file-manager/components/FileManager.tsx";

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
        <Window.MenuBar></Window.MenuBar>
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