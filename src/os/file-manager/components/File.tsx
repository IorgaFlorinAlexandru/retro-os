import {SystemFile} from "../../../types/memory.type.ts";
import Icon from "../../../components/Icon/Icon.tsx";
import styles from './File.module.css';

export default function File({ file }: { file: SystemFile }) {
    return <div className={styles.win95File}>
        <Icon src={file.icon} size='lg'></Icon>
        <p>{file.name}</p>
    </div>
}