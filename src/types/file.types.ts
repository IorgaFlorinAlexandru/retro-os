import {Icons} from "../components/Icon/icon.types.ts";

export abstract class SystemFile {
    public id: string;
    public name: string;
    public type: string;
    public icon: Icons = Icons.FOLDER;
    public size: number;
    public path: string;
    public modifiedDate: Date;

    protected constructor(name: string, icon: Icons, type: string) {
        this.id = 'random';
        this.name = name;
        this.type = type;
        this.icon = icon;
        this.path = "path";
        this.size = 0;
        this.modifiedDate = new Date();
    }

    public open(): void {
        console.log('opening', this.type);
    }
}

export class FileFolder extends SystemFile {
    files: SystemFile[] = [];

    constructor(name: string) {
        super(name, Icons.FOLDER, 'File Folder');
    }
}

export class ComputerFileFolder extends SystemFile {
    constructor() {
        super("My Computer", Icons.MY_COMPUTER, 'Computer file folder');
    }
}

export class TextDocument extends SystemFile {
    public content: string = '';

    constructor(name: string) {
        super(name, Icons.TEXT_DOCUMENT, 'Text Document');
    }
}