import styles from './FileManager.module.css'
import File from "./File.tsx";
import {Fragment, useCallback, useEffect, useRef, MouseEvent as ReactMouseEvent, useState} from "react";
import {logger} from "../../../utils/logger.ts";
import {ANOTHER_CONTEXT_OPENED, OUTSIDE_CLICK, useContextMenuService} from "../../../contexts/MenuContext.tsx";
import {ContextAction} from "../../../types/context-menu.types.ts";
import DesktopContextMenu from "../../explorer/components/DesktopContextMenu.tsx";
import FileContextMenu from "./FileContextMenu.tsx";
import {FileRef} from "../types/file.types.ts";
import {SystemFile} from "../../../types/file.types.ts";

export default function FileManager({ files = [] }: { files: SystemFile[] }) {
    const fileRefs = useRef<FileRef[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const contextMenuService = useContextMenuService();
    const [selectedFiles, setSelectedFiles] = useState<FileRef[]>([]);

    const handleMouseDown = useCallback((event: ReactMouseEvent) => {
        removeHighlight();
        for(const ref of fileRefs.current) {
            if(ref.isClicked(event)) {
                ref.setHighlight(true);
                selectedFiles.push(ref);
                break;
            }
        }
    },[]);

    const handleDragOver = useCallback(() => {
        throw Error("Not implemented");
    },[]);

    const handleDoubleClick = useCallback((event: MouseEvent) => {
        console.log(event);
    },[]);

    const handleContextMenu = useCallback(async (e: MouseEvent) => {
        e.preventDefault();
        try {
            const file = fileRefs.current.find((element) => element.isClicked(e));
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

    const removeHighlight = () => {
        selectedFiles.forEach((file: FileRef) => {file.setHighlight(false)});
        setSelectedFiles([]);
    };

    useEffect(() => {
        // TODO: Move events directly into the div
        const container = containerRef.current;
        if(!container) return;

        container.addEventListener("dblclick", handleDoubleClick, false);
        container.addEventListener('contextmenu', handleContextMenu, false);
        //TODO: What is dragover
        container.addEventListener("dragover", handleDragOver, false);

        return () => {
            container.removeEventListener("dblclick", handleDoubleClick, false);
            container.removeEventListener('contextmenu', handleContextMenu, false);
            container.removeEventListener("dragover", handleDragOver, false);
        }
    }, []);

    return <div ref={containerRef} className={styles.fileManager}
            onMouseDown={handleMouseDown}>
        {files.map((file, index) => (
            <Fragment key={file.id}>
                <File file={file}
                      ref={(f: FileRef) => setFileElementRef(f,index)}>
                </File>
            </Fragment>
        ))}
    </div>
}