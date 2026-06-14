import {createContext, Dispatch, ReactNode, useContext, useReducer} from "react";


import {SystemFile} from "../types/file.types.ts";

export interface ClipboardState {
    type: "file" | "text" | null;
    mode?: "copy" | "cut";
    value?: string | SystemFile;
}

type ClipboardDispatchAction =
    { type: "clip", mode: "copy" | "cut", valueType: "text" | "file",value: string | SystemFile };

const ClipboardContext = createContext<ClipboardState | null>( null );
const ClipboardDispatchContext = createContext<Dispatch<ClipboardDispatchAction> | null>( null );

function clipboardReducer(state: ClipboardState, action: ClipboardDispatchAction) {
    switch (action.type) {
        case "clip":
            return {
                type: action.valueType,
                value: action.value,
                mode: action.mode,
            };
        default:
            return state;
    }
}

export function ClipboardProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(clipboardReducer, {
        type: null
    });

    return (
        <ClipboardContext value={state}>
            <ClipboardDispatchContext value={dispatch}>
                {children}
            </ClipboardDispatchContext>
        </ClipboardContext>
    )
}

export function useClipboard() {
    const context = useContext(ClipboardContext);

    if (!context) {
        throw new Error("useClipboard must be used within ClipboardProvider");
    }

    return context;
}

export function useClipboardDispatch() {
    const context = useContext(ClipboardDispatchContext);

    if (!context) {
        throw new Error("useClipboardDispatch must be used within ClipboardProvider");
    }

    return context;
}