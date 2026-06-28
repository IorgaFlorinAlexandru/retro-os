import {ContextAction, ContextMenuProps} from "../../../types/context-menu.types.ts";
import {JSX} from "react";
import Menu from "../../../components/DropdownMenu/components/Menu.tsx";
import MenuOption from "../../../components/DropdownMenu/components/MenuOption.tsx";
import MenuDivider from "../../../components/DropdownMenu/components/MenuDivider.tsx";

export default function FileContextMenu({onResolve, onReject}: ContextMenuProps<ContextAction>): JSX.Element {
    return <Menu>
        <MenuOption text='Open' command={() => onResolve(ContextAction.OPEN)}></MenuOption>
        <MenuOption text='Explore' command={() => onResolve(ContextAction.EXPLORE)}></MenuOption>
        <MenuOption text='Find...' command={() => onResolve(ContextAction.FIND)}></MenuOption>
        <MenuDivider></MenuDivider>
        <MenuOption text='Cut' command={() => onResolve(ContextAction.CUT)}></MenuOption>
        <MenuOption text='Copy' command={() => onResolve(ContextAction.COPY)}></MenuOption>
        <MenuDivider></MenuDivider>
        <MenuOption text='Create Shortcut' command={() => onResolve(ContextAction.CREATE_SHORTCUT)}></MenuOption>
        <MenuOption text='Delete' command={() => onResolve(ContextAction.DELETE)}></MenuOption>
        <MenuOption text='Rename' command={() => onResolve(ContextAction.RENAME)}></MenuOption>
        <MenuDivider></MenuDivider>
        <MenuOption text='Properties' command={() => onResolve(ContextAction.PROPERTIES)}></MenuOption>
    </Menu>}