import {JSX, ReactNode} from "react";

export type ContextMenuProps<TResult> = {
    onResolve: (value?: TResult) => void;
    onReject: (reason?: any) => void;
}

export type OpenFn = <TResult>(comp: (props: ContextMenuProps<TResult>) => JSX.Element,
                        pos: {x: number, y: number},
                        props?: Record<string, any>)
    => Promise<TResult>;

export type OpenedContextMenu = {
    node: ReactNode;
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
}

export type ContextMenuService = {
    open: OpenFn;
    close: (result?: unknown) => void;
    cancel: (reason?: string, error?: any) => void;
};