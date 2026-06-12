import {createContext, Dispatch, ReactNode, useContext, useReducer} from "react";
import {Icons} from "../components/Icon/icon.types.ts";

// TODO: Move to separate file
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
    fileIds?: string[];
}

export interface StorageState {
    partitionIds: string[];
    files: SystemFile[];
}

export type StorageDispatchAction =
    { type: "add_file", parentFileId: string, file: SystemFile } |
    { type: "update_file", file: SystemFile } |
    { type: "remove_file", fileId: string };

const StorageContext = createContext<StorageState | null>( null );
const StorageDispatchContext = createContext<Dispatch<StorageDispatchAction> | null>( null );

function storageReducer(state: StorageState, action: StorageDispatchAction) {
    switch (action.type) {
        case "add_file":
            throw new Error("not implemented!");
        case "update_file":
            throw new Error("not implemented!");
        case "remove_file":
            throw new Error("not implemented!");
        default:
            return state;
    }
}

export function StorageProvider({children} : {children: ReactNode}) {
    const [state, dispatch] = useReducer(storageReducer, initialState);

    return (
      <StorageContext.Provider value={state}>
          <StorageDispatchContext.Provider value={dispatch}>
              {children}
          </StorageDispatchContext.Provider>
      </StorageContext.Provider>
    );
}

export function useStorage(): StorageState {
    const context = useContext(StorageContext);

    if (!context) {
        throw new Error("useStorage must be used within StorageProvider");
    }

    return context;
}

export function useStorageDispatch() {
    const context = useContext(StorageContext);

    if(!context) {
        throw new Error("useStorageDispatch must be used within StorageProvider");
    }

    return context;
}

const initialState: StorageState = {
    partitionIds: ["C"],
    files: [
        {
            id: "C",
            name: "C",
            path: "C",
            type: "folder",
            icon: Icons.DRIVE,
            size: 0,
            isShortcut: false,
            createdAt: new Date(),
            fileIds: ["Users"]
        },
        {
            id: "Users",
            name: "Users",
            path: "C:\\Users",
            type: "folder",
            icon: Icons.FOLDER,
            size: 0,
            isShortcut: false,
            createdAt: new Date(),
            parentId: "C",
            fileIds: ["iorgflo"]
        },
        {
            id: "iorgflo",
            name: "iorgflo",
            path: "C:\\Users\\iorgflo",
            type: "folder",
            icon: Icons.FOLDER,
            size: 0,
            isShortcut: false,
            createdAt: new Date(),
            parentId: "Users",
            fileIds: ["Desktop"]
        },
        {
            id: "Desktop",
            name: "Desktop",
            path: "C:\\Users\\iorgflo\\Desktop",
            type: "folder",
            icon: Icons.FOLDER,
            size: 0,
            isShortcut: false,
            createdAt: new Date(),
            parentId: "iorgflo",
            fileIds: ["1", "2", "3"]
        },
        {
            id: "1",
            name: "My computer",
            path: "C:\\Users\\iorgflo\\Desktop\\home",
            type: "my_computer",
            icon: Icons.MY_COMPUTER,
            size: 0,
            isShortcut: false,
            createdAt: new Date(),
            parentId: "Desktop",
            fileIds: []
        },
        {
            id: "2",
            name: "Secret notes",
            path: "C:\\Users\\iorgflo\\Desktop\\text_document.txt",
            type: "text_document",
            icon: Icons.TEXT_DOCUMENT,
            size: 0,
            isShortcut: true,
            createdAt: new Date(),
            parentId: "Desktop",
        },
        {
            id: "3",
            name: "Games",
            path: "C:\\Users\\iorgflo\\Desktop\\Games",
            type: "folder",
            icon: Icons.FOLDER,
            size: 0,
            isShortcut: false,
            createdAt: new Date(),
            parentId: "Desktop",
        }
    ]
}