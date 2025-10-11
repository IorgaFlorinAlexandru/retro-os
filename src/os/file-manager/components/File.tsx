import Icon from "../../../components/Icon/Icon.tsx";
import styles from './File.module.css';
import {useImperativeHandle, useRef, useState} from "react";
import {ContextAction} from "../../../types/context-menu.types.ts";

export default function File({ file, ref }) {
    const [highlight,setHighlight] = useState<boolean>(false);
    const divRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
        handleContextMenu(response: ContextAction): void {
          console.log(response);
        },
        highlight(): void {
            setHighlight(true);
        },
        unhighlight(): void {
            setHighlight(false);
        },
        clicked(event): boolean {
            if(!divRef.current) return false;
            return divRef.current.contains(event.target);
        }
    }),[]);

    return <div ref={divRef} className={`${styles.win95File} ${highlight ? styles.win95FileHighlight : ''}`}>
        <Icon src={file.icon} size='lg'></Icon>
        <p>{file.name}</p>
    </div>
}