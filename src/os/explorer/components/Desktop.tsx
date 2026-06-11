import styles from './Desktop.module.css';
import FileManager from "../../file-manager/components/FileManager.tsx";
import {useDesktopState} from "../contexts/DesktopContext.tsx";
import {Icons} from "../../../components/Icon/icon.types.ts";
import Window from "../../window/components/Window.tsx";

export default function Desktop() {
    const desktop = useDesktopState();

    return <div className={styles.win95Desktop}>
        <FileManager files={desktop.files}></FileManager>
        {/*<Window icon={Icons.MY_COMPUTER} title='My computer'></Window>*/}
    </div>
}