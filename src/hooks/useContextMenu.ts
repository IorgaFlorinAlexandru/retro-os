import {ANOTHER_CONTEXT_OPENED, OUTSIDE_CLICK, useContextMenuService} from "../context/MenuContext.tsx";
import {JSX, useEffect, useState} from "react";
import {ContextMenuProps} from "../types/context-menu.types.ts";
import {logger} from "../utils/logger.ts";

export function useContextMenu<R>(comp: (props: ContextMenuProps<R>) => JSX.Element,callback: (value: R) => void, onError?: (error: any) => void) {
    const contextMenuService = useContextMenuService();
    const [element, setElement] = useState<HTMLElement | null>(null);
    useEffect(() => {
        if(element === null) {
            logger.error(`Current html element is null for component: ${comp.name}`);
            return;
        }
        const handleContextMenu = async (e) => {
            e.preventDefault();
            try {
                const response = await contextMenuService.open<R>(comp, {x: e.clientX, y: e.clientY});
                callback(response);
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
        element.addEventListener('contextmenu', handleContextMenu, false);

        return () => element.removeEventListener('contextmenu', handleContextMenu, false);
    }, [contextMenuService, element]);

    return setElement;
}