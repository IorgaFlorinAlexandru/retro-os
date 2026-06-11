import {SystemFile} from "../../../types/file.types.ts";
import {createContext,type Dispatch, ReactNode, useContext, useReducer} from "react";

interface WindowState {
    id: string;
    appId: string;
    title: string;
    pos: {x: number, y: number};
    width: number;
    height: number;
    minimized: boolean;
    maximized: boolean;
    zIndex: number;
}

export interface DesktopState {
    files: SystemFile[];
    windows: WindowState[];
    backgroundImage: string | null;
}

type DesktopStateAction =
    { type: "change_background", imagePath: string } |
    { type: "add_file", file: SystemFile } |
    { type: "update_file", file: SystemFile } |
    { type: "remove_file", fileId: string };

const DesktopContext = createContext<DesktopState | null>( null );
const DesktopDispatchContext = createContext<Dispatch<DesktopStateAction> | null>( null );

function desktopReducer(state: DesktopState, action: DesktopStateAction) {
    switch (action.type) {
        case "change_background":
            return {
                ...state,
                backgroundImage: action.image
            };
        case "add_file":
            return {
                ...state,
                files: [...state.files, action.file]
            };
        case "update_file":
            return {
                ...state,
                files: state.files.map(f => {
                  if(f.id === action.file.id) {
                      return action.file;
                  }
                  return f;
                })
            };
        case "remove_file":
            return {
                ...state,
                files: state.files.filter(f => f.id !== action.fileId)
            }
        default:
            return state;
    }
}

export function DesktopProvider({ children, files }: { children: ReactNode, files: SystemFile[] }) {
    const [state, dispatch] = useReducer(desktopReducer, {
        files: files,
        windows: [],
        backgroundImage: null
    });

    return (
        <DesktopContext.Provider value={state}>
            <DesktopDispatchContext.Provider value={dispatch}>
                {children}
            </DesktopDispatchContext.Provider>
        </DesktopContext.Provider>
    );
}

export function useDesktopState(): DesktopState {
    const context = useContext(DesktopContext);

    if (!context) {
        throw new Error("useDesktopState must be used inside DesktopProvider");
    }

    return context;
}

export function useDesktopDispatch(): Dispatch<DesktopStateAction> {
    const context = useContext(DesktopDispatchContext);

    if (!context) {
        throw new Error("useDesktopDispatch must be used inside DesktopProvider");
    }

    return context;
}
