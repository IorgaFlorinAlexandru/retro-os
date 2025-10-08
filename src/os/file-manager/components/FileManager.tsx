import styles from './FileManager.module.css'
import File from "./File.tsx";
import {FileFolder} from "../../../types/memory.type.ts";
import {useEffect, useRef} from "react";
import {logger} from "../../../utils/logger.ts";
import {ANOTHER_CONTEXT_OPENED, OUTSIDE_CLICK, useContextMenuService} from "../../../context/MenuContext.tsx";
import {ContextAction} from "../../../types/context-menu.types.ts";
import DesktopContextMenu from "../../../context/components/DesktopContextMenu.tsx";
import FileContextMenu from "../../../context/components/FileContextMenu.tsx";

export default function FileManager({ folder }: { folder: FileFolder }) {
    const fileElements = useRef<HTMLElement[]>([]);
    const containerRef = useRef<HTMLElement | null>(null);
    const contextMenuService = useContextMenuService();

    useEffect(() => {
        const container = containerRef.current;
        if(!container) return;
        const handleContextMenu = async (e) => {
            e.preventDefault();
            try {
                const isFileRightClicked = fileElements.current.some((element) => element.contains(e.target));
                if(isFileRightClicked) {
                    const response = await contextMenuService.open<ContextAction>(FileContextMenu, {x: e.clientX, y: e.clientY});
                    console.log(response);
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

        };
        container.addEventListener('contextmenu', handleContextMenu, false);

        return () => container.removeEventListener('contextmenu', handleContextMenu, false);
    }, [contextMenuService]);

    const setFileElementRef = (el, index) => {
        fileElements.current[index] = el;
    };

    return <div ref={containerRef} className={styles.fileManager}>
        {folder.files.map((file, index) => (
            <div key={index}
                 ref={(e) => setFileElementRef(e,index)}>
                <File file={file}></File>
            </div>
        ))}
    </div>
}