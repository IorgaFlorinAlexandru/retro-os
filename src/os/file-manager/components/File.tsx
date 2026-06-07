import Icon from "../../../components/Icon/Icon.tsx";
import styles from './File.module.css';
import {useImperativeHandle, useRef, useState} from "react";
import {ContextAction} from "../../../types/context-menu.types.ts";
import {SystemFile} from "../../../types/file.types.ts";

export default function File({ file, ref }: { file: SystemFile, ref: any}) {
    const [highlight,setHighlight] = useState<boolean>(false);
    const divRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
        handleContextMenu(response: ContextAction): void {
          switch (response) {
              case ContextAction.OPEN:
                  file.open();
                  break;
              default:
                  console.log(response);
                  break;
          }
        },
        highlight(): void {
            setHighlight(true);
        },
        unhighlight(): void {
            setHighlight(false);
        },
        getHTMLElement(): HTMLElement {
            const element = divRef.current!.cloneNode(true) as HTMLElement;
            element.style.opacity = "50%"
            element.style.position = "absolute";
            return element;
        },
        moveTo(x: number, y: number) {
          console.log(x, y);
        },
        hasHighlight(): boolean {
            return highlight;
        },
        clicked(event: MouseEvent): boolean {
            return divRef.current?.contains(event.target as HTMLElement) ?? false;
        },
        execute(): void {
            file.open();
        }
    }),[highlight]);

    return <div ref={divRef} className={`${styles.win95File} ${highlight ? styles.win95FileHighlight : ''}`}>
        <Icon src={file.icon} size='lg'></Icon>
        <p>{file.name}</p>
    </div>
}