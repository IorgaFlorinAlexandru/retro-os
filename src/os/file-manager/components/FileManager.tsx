import styles from './FileManager.module.css'
import File from "./File.tsx";
import {Fragment, useCallback, useRef, MouseEvent as ReactMouseEvent, useState} from "react";
import {logger} from "../../../utils/logger.ts";
import {ANOTHER_CONTEXT_OPENED, OUTSIDE_CLICK, useContextMenuService} from "../../../contexts/MenuContext.tsx";
import {ContextAction} from "../../../types/context-menu.types.ts";
import DesktopContextMenu from "../../explorer/components/DesktopContextMenu.tsx";
import FileContextMenu from "./FileContextMenu.tsx";
import {FileRef} from "../types/file.types.ts";
import {SystemFile} from "../../../types/file.types.ts";

export default function FileManager({ files = [] }: { files: SystemFile[] }) {
    const fileRefs = useRef<FileRef[]>([]);
    const contextMenuService = useContextMenuService();
    // TODO: selected files variable will be added when working on drag to select more functionality
    const [,setSelectedFiles] = useState<FileRef[]>([]);

    const handleMouseDown = useCallback((event: ReactMouseEvent) => {
        const file = findAssociatedFileRef(event.target);

        setSelectedFiles(prev => {
            prev.forEach(file => file.setHighlight(false));

            if(file) {
                file.setHighlight(true);
                return [file];
            }

            return [];
        });
    },[]);

    const handleDoubleClick = useCallback((event: ReactMouseEvent) => {
        console.log(event);
    },[]);

    const handleContextMenu = useCallback(async (e: ReactMouseEvent) => {
        e.preventDefault();
        try {
            const file = findAssociatedFileRef(e.target);
            if(file) {
                const response = await contextMenuService.open<ContextAction>(FileContextMenu, {x: e.clientX, y: e.clientY});
                file.handleContextMenu(response);
            }
            else {
                const response = await contextMenuService.open<ContextAction>(DesktopContextMenu, {x: e.clientX, y: e.clientY});
                console.log(response);
            }
        } catch (error) {
            if(error === OUTSIDE_CLICK) {
                logger.info("User clicked outside the context menu.");
                return;
            }
            if(error === ANOTHER_CONTEXT_OPENED) {
                logger.info("Another context menu has been opened.");
                return;
            }
            logger.error("An error occurred while opening the context menu.", error);
        }
    },[contextMenuService]);

    const setFileElementRef = (el: FileRef, index: number) => {
        fileRefs.current[index] = el;
    };

    const findAssociatedFileRef = (target: EventTarget) => {
        for(const ref of fileRefs.current) {
            if(ref.isClicked(target)) {
                return ref;
            }
        }
    }

    return <div className={styles.fileManager}
                onMouseDown={handleMouseDown}
                onDoubleClick={handleDoubleClick}
                onContextMenu={handleContextMenu}>
        {files.map((file, index) => (
            <Fragment key={file.id}>
                <File file={file}
                      ref={(f: FileRef) => setFileElementRef(f,index)}>
                </File>
            </Fragment>
        ))}
    </div>
}