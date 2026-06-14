import {Icons} from "../components/Icon/icon.types.ts";
import {SystemFile} from "../types/file.types.ts";

export function createPartition(partitionName: string): SystemFile {
    return {
        id: partitionName,
        name: partitionName,
        path: partitionName,
        type: "drive",
        icon: Icons.DRIVE,
        size: 0,
        isShortcut: false,
        createdAt: new Date(),
    };
}

export function createSystemFile(parentId: string, parentPath: string, fileName: string, fileType: string, icon: Icons): SystemFile {
    return {
        id: fileName,
        name: fileName,
        path: parentPath + ":\\" + fileName,
        type: fileType,
        icon: icon,
        size: 0,
        isShortcut: false,
        createdAt: new Date(),
        parentId: parentId,
    };
}