import {JSX} from "react";
import DropdownMenuOption from "../../components/DropdownMenu/components/DropdownMenuOption.tsx";
import DropdownDivider from "../../components/DropdownMenu/components/DropdownDivider.tsx";
import DropdownMenu from "../../components/DropdownMenu/components/DropdownMenu.tsx";
import {ContextAction, ContextMenuProps} from "../../types/context-menu.types.ts";

export default function TaskbarContextMenu({onResolve, onReject}: ContextMenuProps<ContextAction>): JSX.Element {
    return <DropdownMenu>
        <DropdownMenuOption text='Taskbar' command={() => onResolve(ContextAction.ARRANGE_ICONS)}></DropdownMenuOption>
        <DropdownMenuOption text='Line up Icons' command={() => onResolve(ContextAction.LINE_UP_ICONS)}></DropdownMenuOption>
        <DropdownDivider></DropdownDivider>
        <DropdownMenuOption text='Paste' disabled={true} command={() => onResolve(ContextAction.PASTE)}></DropdownMenuOption>
        <DropdownMenuOption text='Paste Shortcut' disabled={true} command={() => onResolve(ContextAction.PASTE_SHORTCUT)}></DropdownMenuOption>
    </DropdownMenu>}