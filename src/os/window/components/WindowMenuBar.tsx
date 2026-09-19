import styles from './WindowMenuBar.module.css'
import Menu from "../../../components/Menu/components/Menu.tsx";
import {ReactNode} from "react";

export function WindowMenuBar({ children }: {children: ReactNode}) {
    return <div className={styles.win95MenuBar}>
        <Menu style="windowMenu">
            {children}
        </Menu>
    </div>
}