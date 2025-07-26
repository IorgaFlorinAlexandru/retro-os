import styles from './DropdownMenu.module.css';
import {ReactNode} from "react";


export default function DropdownMenu({children}: DropdownMenuProps) {
    return <div className={`win95-control ${styles.win95DropdownMenu}`}>
        <ul>
            {children}
        </ul>
    </div>
}

interface DropdownMenuProps {
    children: ReactNode[];
}