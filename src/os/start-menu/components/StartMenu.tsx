import styles from './StartMenu.module.css';
import {RefObject, useLayoutEffect, useRef, useState} from "react";
import Button from "../../../components/Button/Button.tsx";
import Icon from "../../../components/Icon/Icon.tsx";
import {Icons} from "../../../components/Icon/icon.types.ts";
import Menu from "../../../components/DropdownMenu/components/Menu.tsx";
import MenuOption from "../../../components/DropdownMenu/components/MenuOption.tsx";
import MenuDivider from "../../../components/DropdownMenu/components/MenuDivider.tsx";

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
                    <MenuOption icon={{name: Icons.PROGRAMS_FOLDER, size: "md"}} text={"Programs"}>
                        <Menu>
                            <MenuOption icon={{name: Icons.PROGRAMS_FOLDER, size: "sm"}} text={"Accessories"}/>
                            <MenuOption icon={{name: Icons.PROGRAMS_FOLDER, size: "sm"}} text={"StartUp"}/>
                            <MenuOption icon={{name: Icons.PROGRAMS_FOLDER, size: "sm"}} text={"sal"}/>
                        </Menu>
                    </MenuOption>
                    <MenuOption icon={{name: Icons.WEB_DOCUMENTS, size: "md"}} text={"Documents"}/>
                    <MenuOption icon={{name: Icons.COMPUTER_WITH_PROGRAMS, size: "md"}} text={"Settings"}/>
                    <MenuOption icon={{name: Icons.FIND_FILE, size: "md"}} text={"Find"}/>
                    <MenuOption icon={{name: Icons.HELP_BOOK, size: "md"}} text={"Help"}/>
                    <MenuOption icon={{name: Icons.PROGRAM_WAIT, size: "md"}} text={"Run"}/>
                    <MenuDivider/>
                    <MenuOption icon={{name: Icons.SHUT_DOWN, size: "md"}} text={"Shut down"}/>
                </Menu>
            </div>
        )}
    </div>
}