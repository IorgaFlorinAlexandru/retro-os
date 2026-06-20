import {createContext, useContext} from "react";
import {MouseEvent} from "react";

export interface WindowContext {
    moveWindow: (e: MouseEvent<HTMLDivElement>) => void;
}

export const WindowContext = createContext<WindowContext | null>(null);

export function useWindowContext() {
    const context = useContext(WindowContext);

    if(!context) {
        throw new Error("useWindowContext must be used within a WindowContext provider");
    }

    return context;
}