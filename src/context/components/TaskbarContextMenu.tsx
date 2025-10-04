import {JSX} from "react";
import DropdownMenuOption from "../../components/DropdownMenu/components/DropdownMenuOption.tsx";
import DropdownDivider from "../../components/DropdownMenu/components/DropdownDivider.tsx";
import DropdownMenu from "../../components/DropdownMenu/components/DropdownMenu.tsx";
import {ContextAction, ContextMenuProps} from "../../types/context-menu.types.ts";

export default function TaskbarContextMenu({onResolve, onReject}: ContextMenuProps<ContextAction>): JSX.Element {
    return <DropdownMenu>
        <DropdownMenuOption text='Cascade' command={() => onResolve(ContextAction.CASCADE)}></DropdownMenuOption>
        <DropdownMenuOption text='Tile Horizontally' command={() => onResolve(ContextAction.TILE_HORIZONTALLY)}></DropdownMenuOption>
        <DropdownMenuOption text='Tile Vertically' command={() => onResolve(ContextAction.TILE_VERTICALLY)}></DropdownMenuOption>
        <DropdownDivider></DropdownDivider>
        <DropdownMenuOption text='Minimize All Windows' disabled={true} command={() => onResolve(ContextAction.MINIMIZE_ALL_WINDOWS)}></DropdownMenuOption>
        <DropdownDivider></DropdownDivider>
        <DropdownMenuOption text='Properties' command={() => onResolve(ContextAction.PROPERTIES)}></DropdownMenuOption>
    </DropdownMenu>}