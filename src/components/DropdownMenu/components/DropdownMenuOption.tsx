import {ReactNode} from "react";
import styles from './DropdownMenuOption.module.css'

export default function DropdownMenuOption({text, disabled = false, command, children = null}: DropdownMenuOptionProps) {
    return <li className={`${styles.win95DropdownOption} ${disabled ? styles.optionDisabled : ''}`} onMouseDown={command}>
        <span className={styles.win95DropdownOptionText}>{text}</span>
        { children !== null ?
            <>
                <div className={styles.dropdownOptionArrow}></div>
                <div className={styles.dropdownOptionMenu}>
                    {children}
                </div>
            </>
            : null }
    </li>
}

interface DropdownMenuOptionProps {
    text: string;
    disabled?: boolean;
    command?: () => {};
    children?: ReactNode;
}