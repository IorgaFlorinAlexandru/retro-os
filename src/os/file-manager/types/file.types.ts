import {ContextAction} from "../../../types/context-menu.types.ts";
import {SystemFile} from "../../../types/file.types.ts";

export type FileRef = {
    handleContextMenu: (response: ContextAction) => void,
    setHighlight: (value: boolean) => void,
    isClicked: (target: EventTarget) => boolean,
    getSystemFile: () => SystemFile
}