import {ReactNode} from "react";
import styles from './DropdownMenuOption.module.css'

export default function DropdownMenuOption({text, disabled = false, command, children}: DropdownMenuOptionProps) {
    return <li className={`${styles.win95DropdownOption} ${disabled ? styles.optionDisabled : ''}`} onMouseDown={command}>
        {text}
    </li>
}

interface DropdownMenuOptionProps {
    text: string;
    disabled?: boolean;
    command?: () => {};
    children?: ReactNode[];
}