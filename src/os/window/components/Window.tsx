import styles from "./Window.module.css"
import {ReactNode, useCallback, useRef, useState} from "react";
import {useSettings} from "../../../contexts/SettingsContext.tsx";
import {WindowContext} from "../context/WindowContext.tsx";
import {useMoveWindow} from "../hooks/useMoveWindow.ts";

import {useResize} from "../hooks/useResize.tsx";

export function Window({ children }: { children: ReactNode }) {
    const osSettings = useSettings();
    const windowRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState({ x: 500, y: 30});
    const [windowSize, setWindowSize] = useState({ width: 800, height: 500 });
    const moveWindow = useMoveWindow(windowRef,osSettings,setPosition);

    const handleOnResize = useCallback((width: number, height: number, x: number, y: number) => {
        setWindowSize({width, height});
        setPosition({x,y});
    },[]);

    const resize = useResize(windowRef, handleOnResize)

    return (
        <WindowContext value={{moveWindow: moveWindow}}>
            <div ref={windowRef}
                 className={`
                        win95-control 
                        ${styles.win95Window}`}
                 style={{ transform: `translate(${position.x}px,${position.y}px)`,
                     width: `${windowSize.width}px`, height: `${windowSize.height}px` }}>
                <div className={styles.win95WindowContent}>
                    {children}
                </div>
                {/*Resize Handlers*/}
                <div className={`${styles.resizeHandle} ${styles.resizeN}`}
                     onMouseDown={(e) => resize(e, "N")}/>
                <div className={`${styles.resizeHandle} ${styles.resizeS}`}
                     onMouseDown={(e) => resize(e, "S")}/>
                <div className={`${styles.resizeHandle} ${styles.resizeW}`}
                     onMouseDown={(e) => resize(e, "W")}/>
                <div className={`${styles.resizeHandle} ${styles.resizeE}`}
                     onMouseDown={(e) => resize(e, "E")}/>
                <div className={`${styles.resizeHandle} ${styles.resizeNwLeft}`}
                     onMouseDown={(e) => resize(e, "NW")}/>
                <div className={`${styles.resizeHandle} ${styles.resizeNwTop}`}
                     onMouseDown={(e) => resize(e, "NW")}/>
                <div className={`${styles.resizeHandle} ${styles.resizeNeRight}`}
                     onMouseDown={(e) => resize(e, "NE")}/>
                <div className={`${styles.resizeHandle} ${styles.resizeNeTop}`}
                     onMouseDown={(e) => resize(e, "NE")}/>
                <div className={`${styles.resizeHandle} ${styles.resizeSwLeft}`}
                     onMouseDown={(e) => resize(e, "SW")}/>
                <div className={`${styles.resizeHandle} ${styles.resizeSwBottom}`}
                     onMouseDown={(e) => resize(e, "SW")}/>
                <div className={`${styles.resizeHandle} ${styles.resizeSeBottom}`}
                     onMouseDown={(e) => resize(e, "SE")}/>
                <div className={`${styles.resizeHandle} ${styles.resizeSeRight}`}
                     onMouseDown={(e) => resize(e, "SE")}/>
            </div>
        </WindowContext>
    );
}