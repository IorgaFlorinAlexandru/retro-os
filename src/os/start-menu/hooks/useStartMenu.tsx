import {MenuItem} from "../../../components/Menu/types/menu.types.ts";
import {Icons} from "../../../components/Icon/icon.types.ts";
import Menu from "../../../components/Menu/components/Menu.tsx";
import MenuOption from "../../../components/Menu/components/MenuOption.tsx";
import MenuDivider from "../../../components/Menu/components/MenuDivider.tsx";
import {Fragment} from "react";
import {generateRandomUUID} from "../../../utils/uuid.ts";

const startMenuOptions: MenuItem[] = [
    {
        id: generateRandomUUID().slice(0,6),
        label: "Programs",
        icon: {
            name: Icons.PROGRAMS_FOLDER,
            size: "md"
        },
        items: [
            {
                id: generateRandomUUID().slice(0,6),
                label: "Accessories",
                icon: {
                    name: Icons.PROGRAMS_FOLDER,
                    size: "sm"
                }
            },
            {
                id: generateRandomUUID().slice(0,6),
                label: "StartUp",
                icon: {
                    name: Icons.PROGRAMS_FOLDER,
                    size: "sm"
                }
            }
        ]
    },
    {
        id: generateRandomUUID().slice(0,6),
        label: "Documents",
        icon: {
            name: Icons.WEB_DOCUMENTS,
            size: "md"
        }
    },
    {
        id: generateRandomUUID().slice(0,6),
        label: "Settings",
        icon: {
            name: Icons.COMPUTER_WITH_PROGRAMS,
            size: "md"
        },
        items: [
            {
                id: generateRandomUUID().slice(0,6),
                label: "Control panel",
                icon: {
                    name: Icons.CONTROL_PANEL,
                    size: "sm"
                }
            },
            {
                id: generateRandomUUID().slice(0,6),
                label: "Taskbar",
                icon: {
                    name: Icons.WINDOWS,
                    size: "sm"
                }
            }
        ]
    },
    {
        id: generateRandomUUID().slice(0,6),
        label: "Find",
        icon: {
            name: Icons.FIND_FILE,
            size: "md"
        }
    },
    {
        id: generateRandomUUID().slice(0,6),
        label: "Help",
        icon: {
            name: Icons.HELP_BOOK,
            size: "md"
        }
    },
    {
        id: generateRandomUUID().slice(0,6),
        label: "Run",
        icon: {
            name: Icons.PROGRAM_WAIT,
            size: "md"
        }
    },
];

export function useStartMenu() {
    return <Menu style={"startMenu"}>
        {startMenuOptions.map((option) => (
            <Fragment key={option.id}>
                <MenuOption icon={option.icon} text={option.label}>
                    {option.items ? getMenuFromOptionItems(option.items) : null}
                </MenuOption>
            </Fragment>
        ))}

        <MenuDivider/>
        <MenuOption icon={{name: Icons.SHUT_DOWN, size: "md"}} text={"Shut down"}/>
    </Menu>
}

function getMenuFromOptionItems(options: MenuItem[]) {
    return <Menu>
        {options.map((option) => (
            <Fragment key={option.id}>
                <MenuOption icon={option.icon} text={option.label}>
                    {option.items ? getMenuFromOptionItems(option.items) : null}
                </MenuOption>
            </Fragment>
        ))}
    </Menu>
}