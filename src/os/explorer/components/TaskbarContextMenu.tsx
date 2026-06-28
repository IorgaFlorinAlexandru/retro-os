import {JSX} from "react";
import MenuOption from "../../../components/Menu/components/MenuOption.tsx";
import MenuDivider from "../../../components/Menu/components/MenuDivider.tsx";
import Menu from "../../../components/Menu/components/Menu.tsx";
import {ContextAction, ContextMenuProps} from "../../../types/context-menu.types.ts";

export default function TaskbarContextMenu({onResolve, onReject}: ContextMenuProps<ContextAction>): JSX.Element {
    return <Menu>
        <MenuOption text='Cascade' command={() => onResolve(ContextAction.CASCADE)}></MenuOption>
        <MenuOption text='Tile Horizontally' command={() => onResolve(ContextAction.TILE_HORIZONTALLY)}></MenuOption>
        <MenuOption text='Tile Vertically' command={() => onResolve(ContextAction.TILE_VERTICALLY)}></MenuOption>
        <MenuDivider></MenuDivider>
        <MenuOption text='Minimize All Windows' disabled={true} command={() => onResolve(ContextAction.MINIMIZE_ALL_WINDOWS)}></MenuOption>
        <MenuDivider></MenuDivider>
        <MenuOption text='Properties' command={() => onResolve(ContextAction.PROPERTIES)}></MenuOption>
    </Menu>}