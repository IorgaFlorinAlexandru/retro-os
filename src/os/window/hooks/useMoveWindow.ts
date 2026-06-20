import {RefObject, useCallback, SetStateAction, MouseEvent as ReactMouseEvent} from "react";
import {WindowAnimation} from "../window.types.ts";
import {SettingsState} from "../../../contexts/SettingsContext.tsx";
import {createClassicBorderElement} from "../utils/borderUtils.ts";
import {logger} from "../../../utils/logger.ts";

export const useMoveWindow = (
    windowRef: RefObject<HTMLElement | null>,
    osSettings: SettingsState,
    setPosition: (value: SetStateAction<{x: number,y: number}>) => void
) => useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;

    const window = windowRef.current;
    if(window === null) {
        logger.error("window not found", windowRef);
        return;
    }
    const rect = window.getBoundingClientRect();
    const offset = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    let elementToMove = window;
    let classicBorderElement: HTMLDivElement;
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
}, [osSettings, windowRef, setPosition]);