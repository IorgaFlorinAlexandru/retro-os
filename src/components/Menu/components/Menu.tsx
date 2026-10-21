import styles from './Menu.module.css';
import {ReactNode, useMemo} from "react";


export default function Menu({ children, style = "dropdownMenu" }: MenuProps) {
    const menuStyle = useMemo(() => {
        switch (style) {
            case "startMenu":
                return `${styles.win95StartMenu}`;
            case "windowMenu":
                return `${styles.win95WindowMenu}`;
            case "dropdownMenu":
                return `win95-control ${styles.win95DropdownMenu}`;
            default:
                return `win95-control ${styles.win95DropdownMenu}`
        }
    },[style]);

    return <div className={menuStyle}>
        <ul>
            {children}
        </ul>
    </div>
}

interface MenuProps {
    children: ReactNode;
    style?: "dropdownMenu" | "startMenu" | "windowMenu";
}