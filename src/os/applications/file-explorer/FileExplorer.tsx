import {Window} from "../../window";
import {Icons} from "../../../components/Icon/icon.types.ts";
import styles from "./FileExplorer.module.css";
import {useStorage} from "../../../contexts/StorageContext.tsx";
import {useMemo} from "react";
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

    return <Window.Root>
        <Window.TitleBar title={title} icon={icon}></Window.TitleBar>
        <Window.MenuBar></Window.MenuBar>
        <div className={styles.fileExplorerContent}>
            <FileManager files={files}></FileManager>
        </div>
        <Window.StatusBar>

        </Window.StatusBar>
    </Window.Root>
}