import styles from './DropdownMenu.module.css';
import {ReactNode} from "react";


export default function DropdownMenu({posX = 0, posY = 0,children}: DropdownMenuProps) {
    return <div className={`win95-control ${styles.win95DropdownMenu}`} style={{
        top: `${posY}px`,
        left: `${posX}px`,
        }}>
        <ul>
            {children}
        </ul>
    </div>
}

interface DropdownMenuProps {
    posX: number;
    posY: number;
    children: ReactNode[];
}