import {MouseEvent, ReactNode, useLayoutEffect, useMemo, useRef, useState} from "react";
import styles from './DropdownMenu.module.css'
import {Icons} from "../../Icon/icon.types.ts";
import Icon from "../../Icon/Icon.tsx";

export default function DropdownMenuOption({text, icon, disabled = false, command, children = null}: DropdownMenuOptionProps) {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const hasSubmenu = useMemo(() => {
        if(!children) return false;
        return children.type['name'] === 'DropdownMenu';
    }, [children]);

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
               onMouseEnter={hasSubmenu ? () => setIsMenuOpen(true) : undefined}
               onMouseLeave={hasSubmenu ? () => setIsMenuOpen(false) : undefined}>
        {icon ? <Icon src={icon} size={"md"} /> : null}
        <span className={styles.win95MenuOptionText}>{text}</span>
        {hasSubmenu && (
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
    children?: ReactNode | null;
}