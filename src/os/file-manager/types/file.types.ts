import {ContextAction} from "../../../types/context-menu.types.ts";

export type FileRef = {
    handleContextMenu: (response: ContextAction) => void,
    setHighlight: (value: boolean) => void,
    isClicked: (event: MouseEvent) => boolean,
}