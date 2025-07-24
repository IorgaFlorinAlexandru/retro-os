import styles from "./Window.module.css"
import TitleBar from "./TitleBar.tsx";
import {useEffect, useRef, useState} from "react";

export default function Window() {
    const windowRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState({ x: 500, y: 30});

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
        const onMouseMove = (event) => {
            windowContainer.style.left = `${event.clientX - offset.x}px`
            windowContainer.style.top = `${event.clientY - offset.y}px`
            //setPosition({ x: event.clientX - offset.x, y: event.clientY - offset.y });
        };
        document.addEventListener("mousemove", onMouseMove, false);

        const onMouseUp = (event) => {
            document.removeEventListener("mousemove", onMouseMove, false);
            document.removeEventListener("mouseup", onMouseUp, false);
        };
        document.addEventListener("mouseup", onMouseUp, false);
    }

    return <div ref={windowRef}
                className={`
                    win95-control 
                    ${styles.win95Window}`}
                style={{
                    left: position.x,
                    top: position.y}}>
            <TitleBar title='My computer' onMouseDown={onMouseDown}></TitleBar>
            <div className={styles.win95WindowContent}>
            </div>
        </div>
}