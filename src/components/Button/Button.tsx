import styles from './Button.module.css';
import {ReactNode} from "react";

export default function Button(props: ButtonProps) {
    return (
        <button className={`win95-control ${styles.win95Button} ${props.className}`}
                id={props.id}
                onClick={props.onClick}>
            {props.children}
        </button>
    )
}

interface ButtonProps {
    text?: string;
    className?: string;
    id?: string;
    onClick?: () => void;
    children?: ReactNode;
}