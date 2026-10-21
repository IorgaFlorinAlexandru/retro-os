import styles from "./Window.module.css"
import {ReactNode, useCallback, useRef, useState} from "react";
import {useSettings} from "../../../contexts/SettingsContext.tsx";
import {WindowContext} from "../context/WindowContext.tsx";
import {useMoveWindow} from "../hooks/useMoveWindow.ts";

import {useResize} from "../hooks/useResize.tsx";
import WindowResizeHandlers from "./WindowResizeHandlers.tsx";

export function Window({ children }: { children: ReactNode }) {
    const osSettings = useSettings();
    const windowRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState({ x: 500, y: 30});
    const [windowSize, setWindowSize] = useState({ width: 800, height: 500 });
    //TODO: Rewrite this as useResize
    const moveWindow = useMoveWindow(windowRef,osSettings,setPosition);
    const resize = useResize(windowRef, useCallback((width: number, height: number, x: number, y: number) => {
        setWindowSize({width, height});
        setPosition({x,y});
    },[]))

    return (
        <WindowContext value={{moveWindow, resize}}>
            <div ref={windowRef}
                 className={`
                        win95-control 
                        ${styles.win95Window}`}
                 style={{ transform: `translate(${position.x}px,${position.y}px)`,
                     width: `${windowSize.width}px`, height: `${windowSize.height}px` }}>
                <div className={styles.win95WindowContent}>
                    {children}
                </div>
                <WindowResizeHandlers resize={resize} />
            </div>
        </WindowContext>
    );
}