export interface MenuItem {
    label: string;
    options: MenuOption[];
}

export interface MenuOption {
    label: string;
    icon?: string;
    options: MenuItem[];
    command: () => void;
}

export enum WindowAnimation {
    CLASSIC,
    NORMAL
}