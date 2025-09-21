import {createContext, ReactNode, useCallback, useContext, useMemo, useState} from "react";
import {createPortal} from "react-dom";
import {ContextMenuService, OpenedContextMenu, OpenFn} from "../types/contextMenu.types.ts";

const MenuContext = createContext<ContextMenuService | null>(null);

export function useContextMenu() {
    const ctx = useContext(MenuContext);
    if(!ctx)
        throw new Error('useContextMenu must be used within an MenuContext');
    return ctx;
}

export function ContextMenuProvider({children}: {children: ReactNode}) {
    const [contextMenu, setContextMenu] = useState<OpenedContextMenu | null>(null);

    const close = useCallback((result?: unknown) => {
        setContextMenu((curr) => {
            curr?.resolve(result);
            return null;
        });
    },[contextMenu]);

    const open: OpenFn = useCallback((Comp, pos, props) => {
        return new Promise((resolve, reject) => {
            const node = <div style={{
                position: 'absolute',
                top: `${pos.y}px`,
                left: `${pos.x}px`,
                zIndex: 9999}}>
                <Comp {...props}
                    onResolve={(value) => close(value)}
                    onReject={(value) => close(value)}>
                </Comp>
            </div> as ReactNode;
            setContextMenu({ node, resolve, reject });
        });
    },[])

    const value = useMemo<ContextMenuService>(() => ({open,close}),[open, close]);

    return <MenuContext.Provider value={value}>
        {children}
        {typeof window !== "undefined" && createPortal(contextMenu?.node, document.body)}
    </MenuContext.Provider>;
}
