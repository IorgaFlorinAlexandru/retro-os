import {ContextAction, ContextMenuProps} from "../../types/context-menu.types.ts";
import {JSX} from "react";
import DropdownMenu from "../../components/DropdownMenu/components/DropdownMenu.tsx";
import DropdownMenuOption from "../../components/DropdownMenu/components/DropdownMenuOption.tsx";
import DropdownDivider from "../../components/DropdownMenu/components/DropdownDivider.tsx";

export default function FileContextMenu({onResolve, onReject}: ContextMenuProps<ContextAction>): JSX.Element {
    return <DropdownMenu>
        <DropdownMenuOption text='Open' command={() => onResolve(ContextAction.OPEN)}></DropdownMenuOption>
        <DropdownMenuOption text='Explore' command={() => onResolve(ContextAction.EXPLORE)}></DropdownMenuOption>
        <DropdownMenuOption text='Find...' command={() => onResolve(ContextAction.FIND)}></DropdownMenuOption>
        <DropdownDivider></DropdownDivider>
        <DropdownMenuOption text='Cut' command={() => onResolve(ContextAction.CUT)}></DropdownMenuOption>
        <DropdownMenuOption text='Copy' command={() => onResolve(ContextAction.COPY)}></DropdownMenuOption>
        <DropdownDivider></DropdownDivider>
        <DropdownMenuOption text='Create Shortcut' command={() => onResolve(ContextAction.CREATE_SHORTCUT)}></DropdownMenuOption>
        <DropdownMenuOption text='Delete' command={() => onResolve(ContextAction.DELETE)}></DropdownMenuOption>
        <DropdownMenuOption text='Rename' command={() => onResolve(ContextAction.RENAME)}></DropdownMenuOption>
        <DropdownDivider></DropdownDivider>
        <DropdownMenuOption text='Properties' command={() => onResolve(ContextAction.PROPERTIES)}></DropdownMenuOption>
    </DropdownMenu>}