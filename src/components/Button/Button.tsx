import styles from './Button.module.css';
import {ReactNode, RefObject} from "react";

export default function Button({id, className, onClick, ref, children}: ButtonProps) {
    return (
        <button className={`win95-control ${styles.win95Button} ${className}`}
                id={id}
                ref={ref}
                onClick={onClick}>
            {children}
        </button>
    )
}

interface ButtonProps {
    className?: string;
    id?: string;
    onClick?: () => void;
    children?: ReactNode;
    ref?: RefObject<HTMLButtonElement | null>
}