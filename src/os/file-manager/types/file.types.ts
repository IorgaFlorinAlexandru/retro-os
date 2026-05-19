import {ContextAction} from "../../../types/context-menu.types.ts";

export type FileRef = {
    handleContextMenu: (response: ContextAction) => void,
    highlight: () => void,
    unhighlight: () => void,
    getHTMLElement: () => HTMLElement,
    moveTo: (x: number, y: number) => void,
    hasHighlight: () => boolean,
    clicked: (event: MouseEvent) => boolean,
    execute: () => void
}