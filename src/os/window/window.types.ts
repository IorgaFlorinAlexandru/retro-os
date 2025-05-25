export interface MenuItem {
    label: string;
    type: MenuItemType;
    icon?: string;
    items?: MenuItem[];
}

export enum MenuItemType {
    MENU,
    COMMAND
}

export enum WindowMove {
    CLASSIC,
    NORMAL
}