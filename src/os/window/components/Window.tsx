import styles from "./Window.module.css"
import {ReactNode, useCallback, useRef, useState} from "react";
import {WindowAnimation} from "../window.types.ts";
import {useSettings} from "../../../contexts/SettingsContext.tsx";

const DRAG_OUTLINE_CLASS = 'win95-drag-outline';

export function Window({ children }: { children: ReactNode }) {
    const osSettings = useSettings();
    const windowRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState({ x: 500, y: 30});
    let classicBorderElement: HTMLDivElement;

    const onMouseDown = useCallback((e: MouseEvent) => {
        if ((e.target as HTMLElement).closest("button")) return;

        const window = windowRef.current;
        if(window === null) {
            console.error("window not found", windowRef);
            return;
        }
        const rect = window.getBoundingClientRect();
        const offset = { x: e.clientX - rect.left, y: e.clientY - rect.top };

        let elementToMove = window;
        if(osSettings.windowAnimation === WindowAnimation.CLASSIC) {
            classicBorderElement = createClassicBorderElement(window.offsetHeight, window.offsetWidth);
            elementToMove = classicBorderElement;
            window.parentElement?.appendChild(classicBorderElement);
        }

        const onMouseMove = (event: MouseEvent) => {
            elementToMove.style.left = `${event.clientX - offset.x}px`
            elementToMove.style.top = `${event.clientY - offset.y}px`
        };
        document.addEventListener("mousemove", onMouseMove, false);

        const onMouseUp = (event: MouseEvent) => {
            if(osSettings.windowAnimation === WindowAnimation.CLASSIC) {
                classicBorderElement.remove();
            }
            document.removeEventListener("mousemove", onMouseMove, false);
            setPosition({ x: event.clientX - offset.x, y: event.clientY - offset.y });
        };
        document.addEventListener("mouseup", onMouseUp, {capture: false, once: true});
    }, []);

    return <div ref={windowRef}
                className={`
                    win95-control 
                    ${styles.win95Window}`}
                style={{
                    left: position.x,
                    top: position.y}}>
        <div className={styles.win95WindowContent}>
            {children}
        </div>
    </div>
}

function createClassicBorderElement(height: number, width: number): HTMLDivElement {
    const divElement = document.createElement("div");
    divElement.className = DRAG_OUTLINE_CLASS
    divElement.style.width = width + "px";
    divElement.style.height = height + "px";
    divElement.style.left = `-${window.innerWidth}px`
    divElement.style.top = `-${window.innerHeight}px`

    return divElement;
}