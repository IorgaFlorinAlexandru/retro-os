import {Icons} from "../../Icon/icon.types.ts";

export interface MenuItem {
    id: string;
    label: string;
    icon?: MenuOptionIcon;
    items?: MenuItem[];
}

export interface MenuOptionIcon {
    name: Icons;
    size: "sm" | "md" | "lg";
}