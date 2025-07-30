import styles from "./Window.module.css"
import TitleBar from "./TitleBar.tsx";
import {ReactNode, useRef, useState} from "react";
import MenuBar from "./MenuBar.tsx";
import StatusBar from "./StatusBar.tsx";
import {WindowAnimation} from "../window.types.ts";

const ANIMATION_TYPE = WindowAnimation.CLASSIC;

export default function Window({title}: WindowProps) {
    const windowRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState({ x: 500, y: 30});
    let classicBorderElement: HTMLDivElement;

    const onMouseDown = (e) => {
        if(e.target.tagName === 'BUTTON' || e.target.parentElement.tagName === 'BUTTON') {
            return;
        }
        const windowContainer = windowRef.current;
        if(windowContainer === null) {
            console.error("window not found", windowRef);
            return;
        }
        const rect = windowContainer.getBoundingClientRect();
        const offset = { x: e.clientX - rect.left, y: e.clientY - rect.top };

        let elementToMove = windowContainer;
        if(ANIMATION_TYPE === WindowAnimation.CLASSIC) {
            console.log(windowContainer);
            classicBorderElement = createClassicBorderElement(windowContainer.offsetHeight, windowContainer.offsetWidth);
            elementToMove = classicBorderElement;
            windowContainer.parentElement?.appendChild(classicBorderElement);
        }

        const onMouseMove = (event) => {
            elementToMove.style.left = `${event.clientX - offset.x}px`
            elementToMove.style.top = `${event.clientY - offset.y}px`
        };
        document.addEventListener("mousemove", onMouseMove, false);

        const onMouseUp = (event) => {
            console.log('mouseup', event);
            if(ANIMATION_TYPE === WindowAnimation.CLASSIC) {
                windowContainer.parentElement?.removeChild(classicBorderElement);
            }
            document.removeEventListener("mousemove", onMouseMove, false);
            setPosition({ x: event.clientX - offset.x, y: event.clientY - offset.y });
        };
        document.addEventListener("mouseup", onMouseUp, {capture: false, once: true});
    }

    return <div ref={windowRef}
                className={`
                    win95-control 
                    ${styles.win95Window}`}
                style={{
                    left: position.x,
                    top: position.y}}>
            <TitleBar title={title} onMouseDown={onMouseDown}></TitleBar>
            <MenuBar></MenuBar>
            <div className={styles.win95WindowContent}>
            </div>
            <StatusBar></StatusBar>
        </div>
}

function createClassicBorderElement(height: number, width: number): HTMLDivElement {
    const divElement = document.createElement("div");
    divElement.style.width = width + "px";
    divElement.style.height = height + "px";
    divElement.style.border = "5px solid white";
    divElement.style.mixBlendMode = "difference";
    divElement.style.position = "absolute";
    divElement.style.left = `-${window.window.innerWidth}px`
    divElement.style.top = `-${window.window.innerHeight}px`
    divElement.style.zIndex = "9000";

    return divElement;
}

interface WindowProps {
    title: string;
    children?: ReactNode[]
}