import styles from './TitleBar.module.css';
import Button from "../../../components/Button/Button.tsx";
import {Icons} from "../../../components/Icon/icon.types.ts";
import Icon from "../../../components/Icon/Icon.tsx";

export default function TitleBar({title, icon, onMouseDown}: TitleBarProps) {
    return <div className={styles.win95TitleBar}
                onMouseDown={onMouseDown}>
        {icon ? <Icon src={icon} size='sm'></Icon> : null}
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
    icon?: Icons;
    onMouseDown?: (event: React.MouseEvent<HTMLElement>) => void;
}