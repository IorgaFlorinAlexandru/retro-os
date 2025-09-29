import DropdownMenu from "../../components/DropdownMenu/components/DropdownMenu.tsx";
import DropdownMenuOption from "../../components/DropdownMenu/components/DropdownMenuOption.tsx";
import DropdownDivider from "../../components/DropdownMenu/components/DropdownDivider.tsx";
import {ContextAction, ContextMenuProps} from "../../types/context-menu.types.ts";
import {JSX} from "react";

export default function DesktopContextMenu({onResolve, onReject}: ContextMenuProps<ContextAction>): JSX.Element {
    return <DropdownMenu>
        <DropdownMenuOption text='Arrange Icons' command={() => onResolve(ContextAction.ARRANGE_ICONS)}></DropdownMenuOption>
        <DropdownMenuOption text='Line up Icons' command={() => onResolve(ContextAction.LINE_UP_ICONS)}></DropdownMenuOption>
        <DropdownDivider></DropdownDivider>
        <DropdownMenuOption text='Paste' disabled={true} command={() => onResolve(ContextAction.PASTE)}></DropdownMenuOption>
        <DropdownMenuOption text='Paste Shortcut' disabled={true} command={() => onResolve(ContextAction.PASTE_SHORTCUT)}></DropdownMenuOption>
        <DropdownDivider></DropdownDivider>
        <DropdownMenuOption text='New'>
            <DropdownMenu>
                <DropdownMenuOption text='Folder' command={() => onResolve(ContextAction.NEW_FOLDER)}></DropdownMenuOption>
                <DropdownMenuOption text='Shortcut' command={() => onResolve(ContextAction.NEW_SHORTCUT)}></DropdownMenuOption>
                <DropdownDivider></DropdownDivider>
                <DropdownMenuOption text='Text Document' command={() => onResolve(ContextAction.NEW_TEXT_DOCUMENT)}></DropdownMenuOption>
                <DropdownMenuOption text='WordPad Document' command={() => onResolve(ContextAction.NEW_WORDPAD_DOCUMENT)}></DropdownMenuOption>
                <DropdownMenuOption text='Bitmap Image' command={() => onResolve(ContextAction.NEW_BITMAP_IMAGE)}></DropdownMenuOption>
            </DropdownMenu>
        </DropdownMenuOption>
        <DropdownMenuOption text='Properties' command={() => onResolve(ContextAction.PROPERTIES)}></DropdownMenuOption>
    </DropdownMenu>
}