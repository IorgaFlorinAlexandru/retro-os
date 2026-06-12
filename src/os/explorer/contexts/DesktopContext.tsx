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
    windows: WindowState[];
    backgroundImage: string | null;
}

type DesktopStateAction = { type: "change_background", imagePath: string };

const DesktopContext = createContext<DesktopState | null>( null );
const DesktopDispatchContext = createContext<Dispatch<DesktopStateAction> | null>( null );

function desktopReducer(state: DesktopState, action: DesktopStateAction) {
    switch (action.type) {
        case "change_background":
            return {
                ...state,
                backgroundImage: action.image
            };
        default:
            return state;
    }
}

export function DesktopProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(desktopReducer, {
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
