import {MouseEvent, ReactNode, useLayoutEffect, useRef, useState} from "react";
import styles from './DropdownMenu.module.css'
import {Icons} from "../../Icon/icon.types.ts";
import Icon from "../../Icon/Icon.tsx";

export default function MenuOption({text, icon, disabled = false, command, children}: DropdownMenuOptionProps) {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if(children === null || menuRef.current === null) return;
        const menu = menuRef.current;
        const menuHeight = menu.children[0].getBoundingClientRect().height;
        const menuOffsetTop = menu.getBoundingClientRect().top;
        if(menuHeight + menuOffsetTop >= window.innerHeight) {
            menu.style.top = `-${menuHeight-24}px`
        }
    }, [isMenuOpen, children, menuRef]);

    const handleMouseDown = (event: MouseEvent) => {
      if(disabled) return;
      event.preventDefault();
      if(command) command();
    };

    return <li className={`${styles.win95MenuOption} ${disabled ? styles.optionDisabled : ''}`}
               onMouseDown={handleMouseDown}
               onMouseEnter={children ? () => setIsMenuOpen(true) : undefined}
               onMouseLeave={children ? () => setIsMenuOpen(false) : undefined}>
        {icon ? <span className={styles.optionIcon}><Icon src={icon} size={"md"}/></span> : null}
        <span className={styles.win95MenuOptionText}>{text}</span>
        {children && (
            <>
                <div className={styles.menuOptionArrow}></div>
                { isMenuOpen &&
                    (
                        <div ref={menuRef} className={styles.optionMenu}>
                            {children}
                        </div>
                    )
                }
            </>
        )}
    </li>
}

interface DropdownMenuOptionProps {
    text: string;
    icon?: Icons;
    disabled?: boolean;
    command?: () => void;
    children?: ReactNode;
}