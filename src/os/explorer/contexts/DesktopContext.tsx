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

interface DesktopState {
    files: SystemFile[];
    windows: WindowState[];
    backgroundImage: string | null;
}

type DesktopStateAction =
    { type: "change_background", imagePath: string } |
    { type: "update_file", file: SystemFile } |
    { type: "open_window", window: WindowState } |
    { type: "close_window", windowId: string };

const DesktopContext = createContext<DesktopState | null>();
const DesktopDispatchContext = createContext<Dispatch<DesktopStateAction> | null>( null );

function desktopReducer(state: DesktopState, action: DesktopStateAction) {
    switch (action.type) {
        case "change_background":
            return {
                ...state,
                backgroundImage: action.image
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
        case "open_window":
            return {
                ...state,
                windows: state.windows.push(action.window)
            };
        case "close_window":
            return {
                ...state,
                windows: state.windows.remove()
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
        <DesktopContext value={state}>
            <DesktopDispatchContext value={dispatch}>
                {children}
            </DesktopDispatchContext>
        </DesktopContext>
    );
}

export function useDesktopState(): DesktopState {
    const context = useContext(DesktopContext);

    if (!context) {
        throw new Error("useDesktopState must be used inside DesktopProvider");
    }

    return context;
}

export function useDesktopDispatch() {
    const context = useContext(DesktopDispatchContext);

    if (!context) {
        throw new Error("useDesktopDispatch must be used inside DesktopProvider");
    }

    return context;
}
