import styles from './Desktop.module.css';
import FileManager from "../../file-manager/components/FileManager.tsx";
import {useStorage} from "../../../contexts/StorageContext.tsx";
import {useMemo} from "react";
import {SpecialFolder} from "../../../types/file.types.ts";

export default function Desktop() {
    const storage = useStorage();
    const desktopFiles = useMemo(() => {
        return storage.files
            .filter(file => file.parentId === storage.specialFolderMap.get(SpecialFolder.DESKTOP))
    }, [storage.files, storage.specialFolderMap]);

    return <div className={styles.win95Desktop}>
        <FileManager files={desktopFiles}></FileManager>
        {/*<Window icon={Icons.MY_COMPUTER} title='My computer'></Window>*/}
    </div>
}