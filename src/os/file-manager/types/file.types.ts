import {ContextAction} from "../../../types/context-menu.types.ts";

export type FileRef = {
    handleContextMenu: (response: ContextAction) => void,
    highlight: () => void,
    unhighlight: () => void,
    clicked: (event) => boolean
}