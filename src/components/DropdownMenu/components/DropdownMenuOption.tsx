import {ReactElement, useLayoutEffect, useMemo, useRef, useState} from "react";
import styles from './DropdownMenuOption.module.css'

export default function DropdownMenuOption({text, disabled = false, command, children = null}: DropdownMenuOptionProps) {
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
    }, [isMenuOpen]);

    const handleMouseDown = (event) => {
      if(disabled) return;
      event.preventDefault();
      if(command) command();
    };

    return <li className={`${styles.win95DropdownOption} ${disabled ? styles.optionDisabled : ''}`}
               onMouseDown={handleMouseDown}
               onMouseEnter={hasSubmenu ? () => setIsMenuOpen(true) : undefined}
               onMouseLeave={hasSubmenu ? () => setIsMenuOpen(false) : undefined}>
        <span className={styles.win95DropdownOptionText}>{text}</span>
        {hasSubmenu && (
            <>
                <div className={styles.dropdownOptionArrow}></div>
                { isMenuOpen &&
                    (
                        <div ref={menuRef} className={styles.dropdownOptionMenu}>
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
    disabled?: boolean;
    command?: () => void;
    children?: ReactElement | null;
}