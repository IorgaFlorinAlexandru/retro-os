import {ANOTHER_CONTEXT_OPENED, OUTSIDE_CLICK, useContextMenuService} from "../context/MenuContext.tsx";
import {JSX, useEffect} from "react";
import {ContextMenuProps} from "../types/contextMenu.types.ts";

export function useContextMenu<R>(comp: (props: ContextMenuProps<R>) => JSX.Element,callback: (value: R) => void, onError?: (error: any) => void) {
    const contextMenuService = useContextMenuService();
    useEffect(() => {
        const handleContextMenu = async (e) => {
            console.log(e);
            e.preventDefault();
            try {
                const response = await contextMenuService.open<R>(comp, {x: e.clientX, y: e.clientY});
                callback(response);
            } catch (error) {
                if(error === OUTSIDE_CLICK) {
                    console.log("User clicked outside the context menu.");
                    return;
                }
                if(error === ANOTHER_CONTEXT_OPENED) {
                    console.log("Another context menu has been opened.");
                    return;
                }
                console.error(error);
            }

        };
        document.body.addEventListener('contextmenu', handleContextMenu, false);

        return () => document.body.removeEventListener('contextmenu', handleContextMenu, false);
    }, [contextMenuService]);
}