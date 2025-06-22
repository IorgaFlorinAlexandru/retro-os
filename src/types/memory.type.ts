import {Icons} from "../components/Icon/icon.types.ts";

export interface SystemState {
    openApps: SystemFile[];
    desktop: {
        files: any[];
        background: string;
    }
    settings: any;
}

export abstract class SystemFile {
    public id: string;
    public name: string;
    public type: string;
    public icon: Icons = Icons.FOLDER;
    public size: number;
    public modifiedDate: Date;

    protected constructor(name: string, icon: Icons, type: string) {
        this.id = 'random';
        this.name = name;
        this.type = type;
        this.icon = icon;
        this.size = 0;
        this.modifiedDate = new Date();
    }
}

export class FileFolder extends SystemFile {
    files: SystemFile[] = [];

    constructor(name: string) {
        super(name, Icons.FOLDER, 'File Folder');
    }

    public open(): string {
        return 'opening file folder'
    }
}

export class TextDocument extends SystemFile {
    public content: string = '';

    constructor(name: string) {
        super(name, Icons.TEXT_DOCUMENT, 'Text Document');
    }

    public open(): string {
        return 'opening text document'
    }
}