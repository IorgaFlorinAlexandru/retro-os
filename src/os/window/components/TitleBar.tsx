import styles from './TitleBar.module.css';
import Button from "../../../components/Button/Button.tsx";
import {useEffect} from "react";

export default function TitleBar({title, onMouseDown}: TitleBarProps) {
    return <div className={styles.win95TitleBar}
                onMouseDown={onMouseDown}>
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
    onMouseDown?: (event: React.MouseEvent<HTMLElement>) => void;
}