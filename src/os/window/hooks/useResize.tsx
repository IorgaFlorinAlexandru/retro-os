import {RefObject, useCallback, useEffect, useRef, MouseEvent as ReactMouseEvent} from "react";
import {useSettings} from "../../../contexts/SettingsContext.tsx";
import {WindowAnimation} from "../window.types.ts";
import {createClassicBorderElement} from "../utils/borderUtils.ts";

type ResizeState = {
    element: HTMLDivElement;
    windowElement: HTMLDivElement | null;
    animationFrame: number | null;
    initialRect: DOMRect;
    finalRect: DOMRect | null;
}

export const useResize = (
    windowRef: RefObject<HTMLDivElement | null>,
    callback: (width: number, height: number, x: number, y: number) => void
): ((event: ReactMouseEvent, direction: string) => void) => {
    const osSettings = useSettings();
    const resizeRef = useRef<ResizeState | null>(null);

    const finishResize = useCallback((commit: boolean) => {
        const resize = resizeRef.current;

        if (!resize) {
            return;
        }

        if(resize.animationFrame !== null) {
            cancelAnimationFrame(resize.animationFrame);
        }

        if(osSettings.windowAnimation === WindowAnimation.CLASSIC) {
            resize.element.remove();
        }

        if(commit) {
            const rect = resize.finalRect ? resize.finalRect : resize.initialRect;
            callback(rect.width,rect.height,rect.x,rect.y);
        }

        resizeRef.current = null;
    },[callback, osSettings]);

    useEffect(() => {
        return () => finishResize(false);
    }, [finishResize]);

    return useCallback((event: ReactMouseEvent, direction: string) => {
        const window = windowRef.current;
        if(!window) {
            return;
        }

        event.preventDefault();
        finishResize(false);

        const rect = window.getBoundingClientRect();
        let element = window;
        if(osSettings.windowAnimation === WindowAnimation.CLASSIC && window.parentElement) {
            element = createClassicBorderElement(rect.height, rect.width);
            window.parentElement.appendChild(element);
        }

        resizeRef.current = {
            windowElement: window,
            element: element,
            animationFrame: null,
            initialRect: rect,
            finalRect: null
        };

        const handleMouseMove = (e: MouseEvent) => {
            const resize = resizeRef.current;

            if(!resize) {
                return;
            }

            if(resize.animationFrame !== null) {
                return;
            }

            const [width, height, x,y] = getPropertiesAfterResize(rect,direction,e);
            resize.animationFrame = requestAnimationFrame(() => {
                resize.element.style.transform = `translate(${x}px,${y}px)`;
                resize.element.style.width = `${width}px`;
                resize.element.style.height = `${height}px`;

                resize.animationFrame = null;
            });
        }

        document.addEventListener("mousemove",handleMouseMove,false);
        document.addEventListener("mouseup", (e: MouseEvent) => {
            document.removeEventListener("mousemove",handleMouseMove);
            const resize = resizeRef.current;

            if(!resize) {
                return;
            }

            const [width, height, x,y] = getPropertiesAfterResize(rect,direction,e);
            resize.finalRect = {width,height,x,y} as DOMRect;

            finishResize(true);
        }, {once: true});

    }, [windowRef, osSettings, finishResize]);
}

function getPropertiesAfterResize(rect: DOMRect, direction: string, e: MouseEvent): [number,number,number,number] {
    let width = rect.width, height = rect.height;
    let x = rect.x, y = rect.y;

    if (direction.includes("N")) {
        height = rect.height + rect.y - e.clientY;
        y = e.y;
    }

    if (direction.includes("S")) {
        height = e.clientY - rect.y;
    }

    if (direction.includes("W")) {
        width = rect.width + rect.x - e.clientX;
        x = e.x;
    }

    if (direction.includes("E")) {
        width = e.clientX - rect.x;
    }

    return [width,height,x,y];
}