import styles from "./Window.module.css"
import {ReactNode, useCallback, useRef, useState} from "react";
import {WindowContext} from "../context/WindowContext.tsx";

import {useResize} from "../hooks/useResize.tsx";
import {useMoveWindow} from "../hooks/useMoveWindow.tsx";

export function Window({ children }: { children: ReactNode }) {
    const windowRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState({ x: 500, y: 30});
    const [windowSize, setWindowSize] = useState({ width: 800, height: 500 });

    const moveWindow = useMoveWindow(
        windowRef,
        useCallback((x: number, y: number) => {
            setPosition({ x, y });
        }, []));

    const resize = useResize(
        windowRef,
        useCallback((width: number, height: number, x: number, y: number) => {
            setWindowSize({width, height});
            setPosition({x,y});
        },[])
    );

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
                {/*Resize Handlers TODO: Move to a separate component*/}
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