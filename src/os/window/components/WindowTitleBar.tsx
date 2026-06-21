import styles from './WindowTitleBar.module.css';
import Button from "../../../components/Button/Button.tsx";
import {Icons} from "../../../components/Icon/icon.types.ts";
import Icon from "../../../components/Icon/Icon.tsx";
import {useWindowContext} from "../context/WindowContext.tsx";

export function WindowTitleBar({title, icon}: TitleBarProps) {
    const windowContext = useWindowContext();

    return <div className={styles.win95TitleBar}
                onMouseDown={windowContext.moveWindow}>
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
}