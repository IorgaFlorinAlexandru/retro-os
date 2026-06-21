import styles from "./Window.module.css"
import {ReactNode, useRef, useState} from "react";
import {useSettings} from "../../../contexts/SettingsContext.tsx";
import {WindowContext} from "../context/WindowContext.tsx";
import {useMoveWindow} from "../hooks/useMoveWindow.ts";

export function Window({ children }: { children: ReactNode }) {
    const osSettings = useSettings();
    const windowRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState({ x: 500, y: 30});
    const moveWindow = useMoveWindow(windowRef,osSettings,setPosition);

    return (
        <WindowContext value={{moveWindow: moveWindow}}>
            <div ref={windowRef}
                 className={`
                        win95-control 
                        ${styles.win95Window}`}
                 style={{ transform: `translate(${position.x}px,${position.y}px)` }}>
                <div className={styles.win95WindowContent}>
                    {children}
                </div>
            </div>
        </WindowContext>
    );
}