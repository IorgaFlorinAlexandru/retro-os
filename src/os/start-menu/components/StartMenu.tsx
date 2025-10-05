import styles from './StartMenu.module.css';
import {RefObject, useLayoutEffect, useRef, useState} from "react";
import Button from "../../../components/Button/Button.tsx";
import Icon from "../../../components/Icon/Icon.tsx";
import {Icons} from "../../../components/Icon/icon.types.ts";

export default function StartMenu() {
    const [open, setOpen] = useState(false);
    const menuRef: RefObject<HTMLDivElement | null> = useRef(null);

    useLayoutEffect(() => {
        const menu = menuRef.current;
        if(!menu) return;

        const handler = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if(!menu.contains(target)) {
                setOpen(false);
            }
        }

        if(open) {
            document.body.addEventListener("mousedown", handler, false);
        }

        return () => {
            document.body.removeEventListener("mousedown", handler, false);
        }
    }, [open]);

    const handleStartAction = () => {
        setOpen(!open);
    }

    return  <div ref={menuRef} className={styles.win95StartContainer}>
        <Button onClick={handleStartAction}>
            <Icon src={Icons.WINDOWS} size='sm'></Icon>
            <span>Start</span>
        </Button>
        {open && (
            <div className={`win95-control ${styles.win95StartMenu}`}>
                <div className={styles.win95Logo}>
                    <h1>Windows<span>95</span></h1>
                </div>
            </div>
        )}
    </div>
}