import styles from './StartMenu.module.css';
import {RefObject, useEffect, useRef} from "react";

export default function StartMenu({open, onClose}: StartMenuProps) {
    const menuContainer: RefObject<HTMLDivElement | null> = useRef(null);

    useEffect(() => {
        const menu = menuContainer.current;
        if(!menu) return;

        const handler = (event: MouseEvent) => {
            const btn = document.querySelector('#win95-start-btn');
            const target = event.target as HTMLElement;

            if(menu.contains(target) || btn?.contains(target)) return;
            onClose();
        }
        if(open) {
            document.body.addEventListener("click", handler, false);
        }

        return () => {
            document.body.removeEventListener("click", handler, false);
        }
    }, [open]);

    if(open) {
        return <div ref={menuContainer} className={`win95-control ${styles.win95StartMenu}`}>
            {/*<input type='password'/>*/}
        </div>
    }
}

interface StartMenuProps {
    open: boolean;
    onClose: () => void;
}