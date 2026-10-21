import {Icons} from "../components/Icon/icon.types.ts";

export interface SystemFile {
    id: string;
    name: string;
    path: string;
    type: string;
    icon: Icons;
    size: number;
    isHidden: boolean;
    isShortcut: boolean;
    createdAt: Date;
    modifiedAt?: Date;
    parentId?: string;
}

export enum SpecialFolder {
    SHELL = "shell",
    DESKTOP = 'desktop',
    RECYCLE_BIN = 'recycle_bin',
    PICTURES = 'pictures',
    DOCUMENTS = 'documents',
    DOWNLOADS = 'downloads',
}