import styles from './DropdownMenu.module.css';
import {ReactNode, useMemo} from "react";


export default function Menu({ children, style = "dropdownMenu" }: DropdownMenuProps) {
    const className = useMemo(() => {
        switch (style) {
            case "startMenu":
                return `${styles.win95StartMenu}`;
            case "dropdownMenu":
                return `win95-control ${styles.win95DropdownMenu}`;
            default:
                return `win95-control ${styles.win95DropdownMenu}`
        }
    },[style]);

    return <div className={className}>
        <ul>
            {children}
        </ul>
    </div>
}

interface DropdownMenuProps {
    children: ReactNode;
    style?: "dropdownMenu" | "startMenu";
}