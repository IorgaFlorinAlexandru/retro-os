import {ReactElement, useEffect, useRef, useState} from "react";
import styles from './DropdownMenuOption.module.css'

export default function DropdownMenuOption({text, disabled = false, command, children = null}: DropdownMenuOptionProps) {
    const [ isMenuOpen, setMenuOpen ] = useState(false);
    const menuRef = useRef<HTMLElement | null>(null);
    useEffect(() => {
        if(children === null || menuRef.current === null) return;
        const menu = menuRef.current;
        const menuHeight = menu.children[0].getBoundingClientRect().height;
        const menuOffsetTop = menu.getBoundingClientRect().top;
        if(menuHeight + menuOffsetTop >= window.innerHeight) {
            menu.style.top = `-${menuHeight-24}px`
        }
    }, [isMenuOpen]);

    //TODO Check for more options
    if(children?.type['name'] !== 'DropdownMenu') {
        children = null;
    }

    return <li className={`${styles.win95DropdownOption} ${disabled ? styles.optionDisabled : ''}`}
               onMouseDown={!disabled ? command : null}
               onMouseEnter={children ? () => setMenuOpen(true) : null}
               onMouseLeave={children ? () => setMenuOpen(false) : null}>
        <span className={styles.win95DropdownOptionText}>{text}</span>
        { children !== null ?
            <>
                <div className={styles.dropdownOptionArrow}></div>
                { isMenuOpen ?
                    <div ref={menuRef} className={styles.dropdownOptionMenu}>
                        {children}
                    </div> : null
                }
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