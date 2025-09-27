import styles from './FileManager.module.css'
import File from "./File.tsx";
import {FileFolder} from "../../../types/memory.type.ts";

export default function FileManager({ folder }: { folder: FileFolder }) {

    return <div className={styles.fileManager}>
        {folder.files.map((file, index) => (
            <div key={index}>
                <File file={file}></File>
            </div>
        ))}
    </div>
}