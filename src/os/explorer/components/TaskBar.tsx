import styles from './TaskBar.module.css';
import Button from "../../../components/Button/Button.tsx";
import Icon from "../../../components/Icon/Icon.tsx";
import { Icons } from "../../../components/Icon/icon.types.ts";
import StartMenu from "../../start-menu/components/StartMenu.tsx";
import {useState} from "react";

export default function TaskBar() {
    const [open, setOpen] = useState(false);

    const handleStartAction = () => {
        setOpen(!open);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return <div className={styles.container}>
        <StartMenu open={open} onClose={handleClose}></StartMenu>
        <div className={styles.win95TaskBar}>
            <Button id='win95-start-btn'
                    className={styles.startButton}
                    onClick={handleStartAction}>
                <Icon src={Icons.WINDOWS} size='sm'></Icon>
                <span>Start</span>
            </Button>
            <div className={`win95-inset ${styles.systemTray}`}>
                <span>12:35 AM</span>
            </div>
        </div>
    </div>
}