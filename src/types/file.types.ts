import {Icons} from "../components/Icon/icon.types.ts";

export interface SystemFile {
    id: string;
    name: string;
    path: string;
    type: string;
    icon: Icons;
    size: number;
    isShortcut: boolean;
    createdAt: Date;
    modifiedAt?: Date;
    parentId?: string;
}

export enum SpecialFolder {
    DESKTOP = 'desktop',
    PICTURES = 'pictures',
    DOCUMENTS = 'documents',
    DOWNLOADS = 'downloads',
}