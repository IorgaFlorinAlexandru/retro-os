import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useLayoutEffect,
    useMemo,
    useRef,
    useState
} from "react";
import {createPortal} from "react-dom";
import {ContextMenuService, OpenedContextMenu, OpenFn} from "../types/context-menu.types.ts";

export const OUTSIDE_CLICK = "OUTSIDE_CLICK";
export const ANOTHER_CONTEXT_OPENED = "ANOTHER_CONTEXT_OPENED";

const MenuContext = createContext<ContextMenuService | null>(null);

export function useContextMenuService() {
    const ctx = useContext(MenuContext);
    if(!ctx)
        throw new Error('useContextMenu must be used within an MenuContext');
    return ctx;
}

export function ContextMenuProvider({children}: {children: ReactNode}) {
    const [contextMenu, setContextMenu] = useState<OpenedContextMenu | null>(null);
    const nodeRef = useRef<HTMLDivElement | null>(null);
    useLayoutEffect(() => {
        if(nodeRef.current === null) return;
        const contextHeight = nodeRef.current.children[0].clientHeight;
        const contextTopOffset = nodeRef.current.offsetTop;
        const contextBottom = contextHeight + contextTopOffset + 10;
        if(contextBottom >= window.innerHeight) {
            const overflowAmount = contextBottom - window.innerHeight + 10;
            nodeRef.current.style.top = `${contextTopOffset - overflowAmount}px`;
        }
    }, [contextMenu]);

    const close = useCallback((result?: unknown) => {
        setContextMenu((curr) => {
            curr?.resolve(result);
            cleanup();
            return null;
        });
    },[]);

    const cancel = useCallback((reason?: string, error?: any) => {
        setContextMenu((curr) => {
            curr?.reject(reason);
            cleanup();
            return null;
        });
    },[]);

    const handleClickEvent = useCallback((event) => {
        const node = nodeRef.current;
        if(node === null || !node.contains(event.target)) {
            cancel(OUTSIDE_CLICK);
        }
    },[contextMenu, nodeRef]);

    const cleanup = useCallback(() => {
        document.body.removeEventListener('mousedown',handleClickEvent, false);
    },[handleClickEvent]);

    const open: OpenFn = useCallback((Comp, pos, props) => {
        setContextMenu((curr) => {
            if(curr !== null) {
                curr.reject(ANOTHER_CONTEXT_OPENED);
                cleanup();
            }
            return null;
        });

        return new Promise((resolve, reject) => {
            const node = <div ref={nodeRef} style={{
                position: 'absolute',
                top: `${pos.y}px`,
                left: `${pos.x}px`,
                zIndex: 9999}}>
                <Comp {...props}
                    onResolve={(value) => close(value)}
                    onReject={(reason) => cancel(reason)}>
                </Comp>
            </div> as ReactNode;
            document.body.addEventListener('mousedown',handleClickEvent, false);
            setContextMenu({ node, resolve, reject });
        });
    },[])

    const value = useMemo<ContextMenuService>(() => ({open,close, cancel}),[open, close, cancel]);

    return <MenuContext value={value}>
        {children}
        {typeof window !== "undefined" && createPortal(contextMenu?.node, document.body)}
    </MenuContext>;
}
