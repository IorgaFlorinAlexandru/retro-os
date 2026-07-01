import Icon from "../../../components/Icon/Icon.tsx";
import styles from './File.module.css';
import {Ref, useImperativeHandle, useRef, useState} from "react";
import {ContextAction} from "../../../types/context-menu.types.ts";
import {SystemFile} from "../../../types/file.types.ts";
import {Icons} from "../../../components/Icon/icon.types.ts";

export default function File({ file, ref }: { file: SystemFile, ref: Ref<unknown> | undefined}) {
    const [highlight,setHighlight] = useState<boolean>(false);
    const divRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
        handleContextMenu(response: ContextAction): void {
          switch (response) {
              default:
                  console.log(response);
                  break;
          }
        },
        setHighlight(value: boolean): void {
            setHighlight(value);
        },
        isClicked(event: MouseEvent): boolean {
            return divRef.current?.contains(event.target as HTMLElement) ?? false;
        },
    }),[]);

    return <div ref={divRef} className={styles.win95File}>
        <div className={styles.fileIcon}>
            <Icon src={file.icon} size='lg'/>
            <span className={styles.maskedIcon}
                  style={{maskImage: `url(/icons/${file.icon})`,
                      visibility: highlight ? 'visible' : 'hidden'}}>
            </span>
            {file.isShortcut ? <span className={styles.shortcutIcon}>
                <Icon src={Icons.SHORTCUT} size='lg'/></span> : null}
        </div>
        <p className={`${styles.fileName} ${highlight ? styles.highlight : ''}`}>{file.name}</p>
    </div>
}