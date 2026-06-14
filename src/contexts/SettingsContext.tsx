import {WindowAnimation} from "../os/window/window.types.ts";
import {createContext, Dispatch, ReactNode, useContext, useReducer} from "react";

export interface SettingsState {
    theme: string;
    windowAnimation: WindowAnimation;
    interfaceScale: number;
    volume: number;
    language: "en" | "es" | "ro";
}

type SettingsStateAction =
    { type: "change_theme", theme: string } |
    { type: "change_window_animation", animation: WindowAnimation } |
    { type: "change_interface_scale", scale: number } |
    { type: "change_volume", volume: number } |
    { type: "change_language", language: "en" | "es" | "ro" };

const SettingsContext = createContext<SettingsState | null>( null );
const SettingsDispatchContext = createContext<Dispatch<SettingsStateAction> | null>( null );

function settingsReducer(state: SettingsState, action: SettingsStateAction) {
    switch (action.type) {
        case "change_theme":
            return {
                ...state,
                theme: action.theme
            };
        case "change_window_animation":
            return {
                ...state,
                windowAnimation: action.animation
            };
        case "change_interface_scale":
            return {
                ...state,
                interfaceScale: action.scale
            };
        case "change_volume":
            return {
                ...state,
                volume: action.volume
            };
        case "change_language":
            return {
                ...state,
                language: action.language
            };
        default:
            return state;
    }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(settingsReducer, {
        theme: "win95",
        windowAnimation: WindowAnimation.CLASSIC,
        interfaceScale: 0,
        volume: 0,
        language: "en"
    });

    return (
        <SettingsContext value={state}>
            <SettingsDispatchContext value={dispatch}>
                {children}
            </SettingsDispatchContext>
        </SettingsContext>
    )
}

export function useSettings() {
    const context = useContext(SettingsContext);

    if(!context) {
        throw new Error("useSettings() must be used within SettingsProvider");
    }

    return context;
}

export function useSettingsDispatch() {
    const context = useContext(SettingsDispatchContext);
    if(!context) {
        throw new Error("useSettingsDispatch() must be used within SettingsProvider");
    }
    return context;
}