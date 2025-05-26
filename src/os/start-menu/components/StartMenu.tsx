import styles from './StartMenu.module.css';
import {RefObject} from "react";
import Button from "../../../components/Button/Button.tsx";

export default function StartMenu({open, ref, onClose}: StartMenuProps) {

    if(open) {
        return <div ref={ref} className={`win95-control ${styles.win95StartMenu}`}>
            {/*<input type='password'/>*/}
            <Button onClick={onClose}>Test</Button>
        </div>
    }
}

interface StartMenuProps {
    open: boolean;
    ref?: RefObject<HTMLDivElement | null>;
    onClose: () => void;
}