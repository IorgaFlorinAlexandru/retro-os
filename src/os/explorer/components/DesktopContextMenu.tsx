import DropdownMenu from "../../../components/DropdownMenu/components/DropdownMenu.tsx";
import DropdownMenuOption from "../../../components/DropdownMenu/components/DropdownMenuOption.tsx";
import DropdownDivider from "../../../components/DropdownMenu/components/DropdownDivider.tsx";
import {DesktopMenuActions} from "../desktop.types.ts";
import {ContextMenuProps} from "../../../types/contextMenu.types.ts";
import {JSX} from "react";

export default function DesktopContextMenu({onResolve, onReject}: ContextMenuProps<DesktopMenuActions>): JSX.Element {
    return <DropdownMenu>
        <DropdownMenuOption text='Arrange Icons' command={() => onResolve(DesktopMenuActions.ARRANGE_ICONS)}></DropdownMenuOption>
        <DropdownMenuOption text='Line up Icons' command={() => onResolve(DesktopMenuActions.LINE_UP_ICONS)}></DropdownMenuOption>
        <DropdownDivider></DropdownDivider>
        <DropdownMenuOption text='Paste' disabled={true} command={() => onResolve(DesktopMenuActions.PASTE)}></DropdownMenuOption>
        <DropdownMenuOption text='Paste Shortcut' disabled={true} command={() => onResolve(DesktopMenuActions.PASTE_SHORTCUT)}></DropdownMenuOption>
        <DropdownDivider></DropdownDivider>
        <DropdownMenuOption text='New'>
            <DropdownMenu>
                <DropdownMenuOption text='Folder' command={() => onResolve(DesktopMenuActions.NEW_FOLDER)}></DropdownMenuOption>
                <DropdownMenuOption text='Shortcut' command={() => onResolve(DesktopMenuActions.NEW_SHORTCUT)}></DropdownMenuOption>
                <DropdownDivider></DropdownDivider>
                <DropdownMenuOption text='Text Document' command={() => onResolve(DesktopMenuActions.NEW_TEXT_DOCUMENT)}></DropdownMenuOption>
                <DropdownMenuOption text='WordPad Document' command={() => onResolve(DesktopMenuActions.NEW_WORDPAD_DOCUMENT)}></DropdownMenuOption>
                <DropdownMenuOption text='Bitmap Image' command={() => onResolve(DesktopMenuActions.NEW_BITMAP_IMAGE)}></DropdownMenuOption>
            </DropdownMenu>
        </DropdownMenuOption>
        <DropdownMenuOption text='Properties' command={() => onResolve(DesktopMenuActions.PROPERTIES)}></DropdownMenuOption>
    </DropdownMenu>
}