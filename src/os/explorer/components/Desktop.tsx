import styles from './Desktop.module.css';
import FileManager from "../../file-manager/components/FileManager.tsx";
import {useDesktopState} from "../contexts/DesktopContext.tsx";

export default function Desktop() {
    const desktop = useDesktopState();

    return <div className={styles.win95Desktop}>
        <FileManager files={desktop.files}></FileManager>
    </div>
}