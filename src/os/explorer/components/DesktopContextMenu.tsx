import Menu from "../../../components/DropdownMenu/components/Menu.tsx";
import MenuOption from "../../../components/DropdownMenu/components/MenuOption.tsx";
import MenuDivider from "../../../components/DropdownMenu/components/MenuDivider.tsx";
import {ContextAction, ContextMenuProps} from "../../../types/context-menu.types.ts";
import {JSX} from "react";

export default function DesktopContextMenu({onResolve, onReject}: ContextMenuProps<ContextAction>): JSX.Element {
    return <Menu>
        <MenuOption text='Arrange Icons' command={() => onResolve(ContextAction.ARRANGE_ICONS)}></MenuOption>
        <MenuOption text='Line up Icons' command={() => onResolve(ContextAction.LINE_UP_ICONS)}></MenuOption>
        <MenuDivider></MenuDivider>
        <MenuOption text='Paste' disabled={true} command={() => onResolve(ContextAction.PASTE)}></MenuOption>
        <MenuOption text='Paste Shortcut' disabled={true} command={() => onResolve(ContextAction.PASTE_SHORTCUT)}></MenuOption>
        <MenuDivider></MenuDivider>
        <MenuOption text='New'>
            <Menu>
                <MenuOption text='Folder' command={() => onResolve(ContextAction.NEW_FOLDER)}></MenuOption>
                <MenuOption text='Shortcut' command={() => onResolve(ContextAction.NEW_SHORTCUT)}></MenuOption>
                <MenuDivider></MenuDivider>
                <MenuOption text='Text Document' command={() => onResolve(ContextAction.NEW_TEXT_DOCUMENT)}></MenuOption>
                <MenuOption text='WordPad Document' command={() => onResolve(ContextAction.NEW_WORDPAD_DOCUMENT)}></MenuOption>
                <MenuOption text='Bitmap Image' command={() => onResolve(ContextAction.NEW_BITMAP_IMAGE)}></MenuOption>
            </Menu>
        </MenuOption>
        <MenuOption text='Properties' command={() => onResolve(ContextAction.PROPERTIES)}></MenuOption>
    </Menu>
}