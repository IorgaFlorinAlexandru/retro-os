import styles from "./Window.module.css"
import TitleBar from "./TitleBar.tsx";
import {ReactNode, useCallback, useRef, useState} from "react";
import MenuBar from "./MenuBar.tsx";
import StatusBar from "./StatusBar.tsx";
import {WindowAnimation} from "../window.types.ts";
import {Icons} from "../../../components/Icon/icon.types.ts";

const ANIMATION_TYPE = WindowAnimation.CLASSIC;
const DRAG_OUTLINE_CLASS = 'win95-drag-outline';

export default function Window({title, icon, children}: WindowProps) {
    const windowRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState({ x: 500, y: 30});
    let classicBorderElement: HTMLDivElement;

    const onMouseDown = useCallback((e) => {
        if ((e.target as HTMLElement).closest("button")) return;

        const window = windowRef.current;
        if(window === null) {
            console.error("window not found", windowRef);
            return;
        }
        const rect = window.getBoundingClientRect();
        const offset = { x: e.clientX - rect.left, y: e.clientY - rect.top };

        let elementToMove = window;
        if(ANIMATION_TYPE === WindowAnimation.CLASSIC) {
            classicBorderElement = createClassicBorderElement(window.offsetHeight, window.offsetWidth);
            elementToMove = classicBorderElement;
            window.parentElement?.appendChild(classicBorderElement);
        }

        const onMouseMove = (event) => {
            elementToMove.style.left = `${event.clientX - offset.x}px`
            elementToMove.style.top = `${event.clientY - offset.y}px`
        };
        document.addEventListener("mousemove", onMouseMove, false);

        const onMouseUp = (event) => {
            if(ANIMATION_TYPE === WindowAnimation.CLASSIC) {
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
            <TitleBar title={title} icon={icon} onMouseDown={onMouseDown}></TitleBar>
            <MenuBar></MenuBar>
            <div className={styles.win95WindowContent}>
                {children}
            </div>
            <StatusBar></StatusBar>
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

interface WindowProps {
    title: string;
    icon?: Icons;
    children?: ReactNode[]
}