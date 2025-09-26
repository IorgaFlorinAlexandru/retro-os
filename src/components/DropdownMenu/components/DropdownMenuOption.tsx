import {ReactElement} from "react";
import styles from './DropdownMenuOption.module.css'

export default function DropdownMenuOption({text, disabled = false, command, children = null}: DropdownMenuOptionProps) {
    //TODO Check for more options
    if(children?.type['name'] !== 'DropdownMenu') {
        children = null;
    }

    return <li className={`${styles.win95DropdownOption} ${disabled ? styles.optionDisabled : ''}`}
               onMouseDown={!disabled ? command : null}>
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
    command?: () => void;
    children?: ReactElement | null;
}