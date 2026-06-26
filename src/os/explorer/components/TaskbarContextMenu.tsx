import {JSX} from "react";
import MenuOption from "../../../components/DropdownMenu/components/MenuOption.tsx";
import DropdownDivider from "../../../components/DropdownMenu/components/DropdownDivider.tsx";
import Menu from "../../../components/DropdownMenu/components/Menu.tsx";
import {ContextAction, ContextMenuProps} from "../../../types/context-menu.types.ts";

export default function TaskbarContextMenu({onResolve, onReject}: ContextMenuProps<ContextAction>): JSX.Element {
    return <Menu>
        <MenuOption text='Cascade' command={() => onResolve(ContextAction.CASCADE)}></MenuOption>
        <MenuOption text='Tile Horizontally' command={() => onResolve(ContextAction.TILE_HORIZONTALLY)}></MenuOption>
        <MenuOption text='Tile Vertically' command={() => onResolve(ContextAction.TILE_VERTICALLY)}></MenuOption>
        <DropdownDivider></DropdownDivider>
        <MenuOption text='Minimize All Windows' disabled={true} command={() => onResolve(ContextAction.MINIMIZE_ALL_WINDOWS)}></MenuOption>
        <DropdownDivider></DropdownDivider>
        <MenuOption text='Properties' command={() => onResolve(ContextAction.PROPERTIES)}></MenuOption>
    </Menu>}