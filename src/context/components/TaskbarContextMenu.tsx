import {JSX} from "react";
import DropdownMenuOption from "../../components/DropdownMenu/components/DropdownMenuOption.tsx";
import {DesktopMenuActions} from "../../os/explorer/desktop.types.ts";
import DropdownDivider from "../../components/DropdownMenu/components/DropdownDivider.tsx";
import DropdownMenu from "../../components/DropdownMenu/components/DropdownMenu.tsx";
import {ContextMenuProps} from "../../types/contextMenu.types.ts";

export default function TaskbarContextMenu({onResolve, onReject}: ContextMenuProps<DesktopMenuActions>): JSX.Element {
    return <DropdownMenu>
        <DropdownMenuOption text='Arrange Icons' command={() => onResolve(DesktopMenuActions.ARRANGE_ICONS)}></DropdownMenuOption>
        <DropdownMenuOption text='Line up Icons' command={() => onResolve(DesktopMenuActions.LINE_UP_ICONS)}></DropdownMenuOption>
        <DropdownDivider></DropdownDivider>
        <DropdownMenuOption text='Paste' disabled={true} command={() => onResolve(DesktopMenuActions.PASTE)}></DropdownMenuOption>
        <DropdownMenuOption text='Paste Shortcut' disabled={true} command={() => onResolve(DesktopMenuActions.PASTE_SHORTCUT)}></DropdownMenuOption>
    </DropdownMenu>}