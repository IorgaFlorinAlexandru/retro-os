import styles from './TaskBar.module.css';
import Button from "../../../components/Button/Button.tsx";
import Icon from "../../../components/Icon/Icon.tsx";
import { Icons } from "../../../components/Icon/icon.types.ts";
import StartMenu from "../../start-menu/components/StartMenu.tsx";
import {RefObject, useEffect, useRef, useState} from "react";

export default function TaskBar() {
    const [open, setOpen] = useState(false);
    const btnRef: RefObject<HTMLButtonElement | null> = useRef(null)
    const menuRef: RefObject<HTMLDivElement | null> = useRef(null);

    useEffect(() => {
        const btn = btnRef.current;
        const menu = menuRef.current;
        if(!menu || !btn) return;

        const handler = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if(menu.contains(target) || btn.contains(target)) return;
            setOpen(false);
        }

        if(open) {
            document.body.addEventListener("click", handler, false);
        }

        return () => {
            document.body.removeEventListener("click", handler, false);
        }
    }, [open]);

    const handleStartAction = () => {
        setOpen(!open);
    }


    return <div className={styles.container}>
        <div className={styles.win95TaskBar}>
            <div className={styles.win95StartContainer}>
                <StartMenu ref={menuRef} open={open}></StartMenu>
                <Button ref={btnRef}
                        className={styles.startButton}
                        onClick={handleStartAction}>
                    <Icon src={Icons.WINDOWS} size='sm'></Icon>
                    <span>Start</span>
                </Button>
            </div>
            <div className={`win95-inset ${styles.systemTray}`}>
                <span>12:35 AM</span>
            </div>
        </div>
    </div>
}