import styles from './TitleBar.module.css';
import Button from "../../../components/Button/Button.tsx";
import {useEffect} from "react";

export default function TitleBar({title, onMouseHold}: TitleBarProps) {
    useEffect(() => {
        const handler = () => {
            onMouseHold();
        };

        document.body.addEventListener("mmmm", handler, false);

        return () => {
            document.body.removeEventListener("mmmm", handler, false);
        }
    }, []);

    return <div className={styles.win95TitleBar}>
        <span>{title}</span>
        <div className={styles.win95TitleBarButtons}>
            <Button className={styles.win95TitleBarButton}>
                <span className={styles.hideIcon}></span>
            </Button>
            <Button className={styles.win95TitleBarButton}>
                <span className={styles.maximiseIcon}></span>
            </Button>
            <Button className={styles.win95TitleBarButton}>
                <span className={styles.closeIcon}></span>
            </Button>
        </div>
    </div>
}

interface TitleBarProps {
    title: string;
    onMouseHold: () => void;
}