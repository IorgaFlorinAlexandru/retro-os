import {createContext, Dispatch, ReactNode, useContext, useReducer} from "react";
import {Icons} from "../components/Icon/icon.types.ts";
import {createPartition, createSystemFile} from "../utils/fileUtils.ts";
import {SpecialFolder, SystemFile} from "../types/file.types.ts";

export interface StorageState {
    partitionIds: string[];
    files: SystemFile[];
    specialFolderMap: Map<string, string>;
}

export type StorageDispatchAction =
    { type: "add_file", file: SystemFile } |
    { type: "update_file", file: SystemFile } |
    { type: "remove_file", fileId: string };

const StorageContext = createContext<StorageState | null>( null );
const StorageDispatchContext = createContext<Dispatch<StorageDispatchAction> | null>( null );

function storageReducer(state: StorageState, action: StorageDispatchAction) {
    switch (action.type) {
        case "add_file":
            return {
                ...state,
                files: [...state.files,action.file]
            }
        case "update_file":
            return {
                ...state,
                files: state.files.map((f: SystemFile) => {
                    if(f.id === action.file.id) {
                        return action.file;
                    }
                    return f;
                }),
            }
        case "remove_file":
            return {
                ...state,
                files: state.files.filter((f: SystemFile) => f.id !== action.fileId)
            }
        default:
            return state;
    }
}

export function StorageProvider({children} : {children: ReactNode}) {
    const [state, dispatch] = useReducer(storageReducer, createInitialState());

    return (
      <StorageContext value={state}>
          <StorageDispatchContext value={dispatch}>
              {children}
          </StorageDispatchContext>
      </StorageContext>
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
    const context = useContext(StorageDispatchContext);

    if(!context) {
        throw new Error("useStorageDispatch must be used within StorageProvider");
    }

    return context;
}

function createInitialState(): StorageState {
    const partition = createPartition("C");
    const usersFolder = createSystemFile(partition.id, partition.path ,"Users", "folder", Icons.FOLDER);
    const currentUserFolder = createSystemFile(usersFolder.id, usersFolder.path ,"iorflo", "folder", Icons.FOLDER);
    const desktop = createSystemFile(currentUserFolder.id, currentUserFolder.path, "Desktop", "folder", Icons.FOLDER);

    //Desktop files
    const myComputerFile = createSystemFile(desktop.id, desktop.path, "My Computer", "folder", Icons.MY_COMPUTER);
    const textDocument = createSystemFile(desktop.id, desktop.path, "Secret notes", "text_document", Icons.TEXT_DOCUMENT);
    const gamesFolder = createSystemFile(desktop.id, desktop.path, "Games", "folder", Icons.FOLDER);

    const files: SystemFile[] = [
        partition,
        usersFolder,
        currentUserFolder,
        desktop,
        myComputerFile,
        textDocument,
        gamesFolder
    ];

    const specialFolderMap = new Map<string, string>();
    specialFolderMap.set(SpecialFolder.DESKTOP, desktop.id);

    return {
        partitionIds: [partition.id],
        files,
        specialFolderMap
    }
}