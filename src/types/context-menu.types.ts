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

export enum ContextAction {
    // DESKTOP
    ARRANGE_ICONS = 'ARRANGE_ICONS',
    LINE_UP_ICONS = 'LINE_UP_ICONS',
    PASTE = 'PASTE',
    PASTE_SHORTCUT = 'PASTE_SHORTCUT',
    NEW_FOLDER = 'NEW_FOLDER',
    NEW_SHORTCUT = 'NEW_SHORTCUT',
    NEW_TEXT_DOCUMENT = 'NEW_TEXT_DOCUMENT',
    NEW_WORDPAD_DOCUMENT = 'NEW_WORDPAD_DOCUMENT',
    NEW_BITMAP_IMAGE = 'NEW_BITMAP_IMAGE',

    // TASKBAR
    CASCADE = 'CASCADE',
    TILE_HORIZONTALLY = 'TILE_HORIZONTALLY',
    TILE_VERTICALLY = 'TILE_VERTICALLY',
    MINIMIZE_ALL_WINDOWS = 'MINIMIZE_ALL_WINDOWS',

    //FILE
    OPEN = 'OPEN',
    EXPLORE = 'EXPLORE',
    FIND = 'FIND',
    CUT = 'CUT',
    COPY = 'COPY',
    CREATE_SHORTCUT = 'CREATE_SHORTCUT',
    DELETE = 'DELETE',
    RENAME = 'RENAME',

    // DEFAULTS
    PROPERTIES = 'PROPERTIES',
}