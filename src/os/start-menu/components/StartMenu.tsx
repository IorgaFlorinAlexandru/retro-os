import styles from './StartMenu.module.css';
import {RefObject, useLayoutEffect, useRef, useState} from "react";
import Button from "../../../components/Button/Button.tsx";
import Icon from "../../../components/Icon/Icon.tsx";
import {Icons} from "../../../components/Icon/icon.types.ts";
import Menu from "../../../components/DropdownMenu/components/Menu.tsx";
import MenuOption from "../../../components/DropdownMenu/components/MenuOption.tsx";
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
                <Menu style={"startMenu"}>
                    <MenuOption icon={Icons.PROGRAMS_FOLDER} text={"Programs"}>
                        <Menu>
                            <MenuOption text={"sal"}>
                                <Menu>
                                    <MenuOption text={"sal"}/>
                                    <MenuOption text={"sal"}/>
                                    <MenuOption text={"sal"}/>
                                </Menu>
                            </MenuOption>
                            <MenuOption text={"sal"}/>
                            <MenuOption text={"sal"}/>
                            <MenuOption text={"sal"}/>
                            <MenuOption text={"sal"}/>
                        </Menu>
                    </MenuOption>
                    <MenuOption icon={Icons.WEB_DOCUMENTS} text={"Documents"}/>
                    <MenuOption icon={Icons.COMPUTER_WITH_PROGRAMS} text={"Settings"}/>
                    <MenuOption icon={Icons.FIND_FILE} text={"Find"}/>
                    <MenuOption icon={Icons.HELP_BOOK} text={"Help"}/>
                    <MenuOption icon={Icons.PROGRAM_WAIT} text={"Run"}/>
                    <DropdownDivider/>
                    <MenuOption icon={Icons.SHUT_DOWN} text={"Shut down"}/>
                </Menu>
            </div>
        )}
    </div>
}