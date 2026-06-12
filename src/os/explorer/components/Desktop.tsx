import styles from './Desktop.module.css';
import FileManager from "../../file-manager/components/FileManager.tsx";
import {useDesktopState} from "../contexts/DesktopContext.tsx";
import {Icons} from "../../../components/Icon/icon.types.ts";
import Window from "../../window/components/Window.tsx";
import {useStorage} from "../../../contexts/StorageContext.tsx";
import {useMemo} from "react";

export default function Desktop() {
    const desktop = useDesktopState();
    const storage = useStorage();
    const desktopFiles = useMemo(() => {
        return storage.files.filter(file => file.parentId === "Desktop")
    }, [storage.files])

    return <div className={styles.win95Desktop}>
        <FileManager files={desktopFiles}></FileManager>
        {/*<Window icon={Icons.MY_COMPUTER} title='My computer'></Window>*/}
    </div>
}