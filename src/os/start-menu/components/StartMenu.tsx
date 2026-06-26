import styles from './StartMenu.module.css';
import {RefObject, useLayoutEffect, useRef, useState} from "react";
import Button from "../../../components/Button/Button.tsx";
import Icon from "../../../components/Icon/Icon.tsx";
import {Icons} from "../../../components/Icon/icon.types.ts";
import DropdownMenu from "../../../components/DropdownMenu/components/DropdownMenu.tsx";
import DropdownMenuOption from "../../../components/DropdownMenu/components/DropdownMenuOption.tsx";
import DropdownDivider from "../../../components/DropdownMenu/components/DropdownDivider.tsx";

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
        <Button className={styles.win95StartMenuButton} onClick={handleStartAction}>
            <Icon src={Icons.WINDOWS} size='sm'></Icon>
            <span>Start</span>
        </Button>
        {open && (
            <div className={`win95-control ${styles.win95StartMenu}`}>
                <div className={styles.win95Logo}>
                    <h1>Windows<span>95</span></h1>
                </div>
                <DropdownMenu style={"startMenu"}>
                    <DropdownMenuOption icon={Icons.PROGRAMS_FOLDER} text={"Programs"}>
                        <DropdownMenu>
                            <DropdownMenuOption text={"sal"}>
                                <DropdownMenu>
                                    <DropdownMenuOption text={"sal"}/>
                                    <DropdownMenuOption text={"sal"}/>
                                    <DropdownMenuOption text={"sal"}/>
                                </DropdownMenu>
                            </DropdownMenuOption>
                            <DropdownMenuOption text={"sal"}/>
                            <DropdownMenuOption text={"sal"}/>
                            <DropdownMenuOption text={"sal"}/>
                            <DropdownMenuOption text={"sal"}/>
                        </DropdownMenu>
                    </DropdownMenuOption>
                    <DropdownMenuOption icon={Icons.DOCUMENTS_FOLDER} text={"Documents"}/>
                    <DropdownMenuOption icon={Icons.SETTINGS} text={"Settings"}/>
                    <DropdownMenuOption icon={Icons.FIND_FILE} text={"Find"}/>
                    <DropdownMenuOption icon={Icons.HELP_BOOK} text={"Help"}/>
                    <DropdownMenuOption icon={Icons.PROGRAM_WAIT} text={"Run"}/>
                    <DropdownDivider/>
                    <DropdownMenuOption icon={Icons.SHUT_DOWN} text={"Shut down"}/>
                </DropdownMenu>
            </div>
        )}
    </div>
}