import {RefObject, useCallback, useEffect, useRef, MouseEvent as ReactMouseEvent} from "react";
import {useSettings} from "../../../contexts/SettingsContext.tsx";
import {WindowAnimation} from "../window.types.ts";
import {createClassicBorderElement} from "../utils/borderUtils.ts";

type MoveWindowState = {
  element: HTMLDivElement;
  window: HTMLDivElement | null;
  animationFrame: number | null;
  offset: { x: number; y: number };
  initialPosition: { x: number; y: number };
  finalPosition: { x: number; y: number } | null;
};

export const useMoveWindow = (
    windowRef: RefObject<HTMLDivElement | null>,
    callback: (x: number, y: number) => void
): (event: ReactMouseEvent) => void => {
    const settings = useSettings();
    const moveRef = useRef<MoveWindowState | null>(null);

    const finishMove = useCallback((commit: boolean) => {
        const move = moveRef.current;

        if(!move) {
            return;
        }

        if(move.animationFrame !== null) {
            cancelAnimationFrame(move.animationFrame);
        }

        if(settings.windowAnimation === WindowAnimation.CLASSIC) {
            move.element.remove();
        }

        if(commit) {
            const pos = move.finalPosition ? move.finalPosition : move.initialPosition;
            callback(pos.x, pos.y);
        }
    }, [callback, settings]);

    useEffect(() => {
        return () => { finishMove(false) }
    }, [finishMove]);

    return useCallback((event: ReactMouseEvent) => {
        if ((event.target as HTMLElement).closest("button")) {
            return;
        }

        const window = windowRef.current;
        if (!window) {
            return;
        }

        event.preventDefault();
        finishMove(false);

        const rect = window.getBoundingClientRect();
        let element = window;
        if(settings.windowAnimation === WindowAnimation.CLASSIC && window.parentElement) {
            element = createClassicBorderElement(rect.height, rect.width);
            window.parentElement.appendChild(element);
        }

        moveRef.current = {
            element,
            window,
            animationFrame: null,
            offset: { x: event.clientX - rect.left, y: event.clientY - rect.top },
            initialPosition: { x: rect.left, y: rect.top },
            finalPosition: null
        }

        const handleMouseMove = (e: MouseEvent) => {
            const move = moveRef.current;
            if(!move) {
                return;
            }

            if(move.animationFrame !== null) {
                return;
            }

            move.animationFrame = requestAnimationFrame(() => {
                move.element.style.transform = `translate(${e.clientX - move.offset.x}px,${e.clientY-move.offset.y}px)`;
                move.animationFrame = null;
            });
        }

        document.addEventListener("mousemove",handleMouseMove,false);
        document.addEventListener("mouseup", (e: MouseEvent) => {
            document.removeEventListener("mousemove",handleMouseMove);
            const move = moveRef.current;

            if(!move) {
                return;
            }

            move.finalPosition = { x: e.clientX - move.offset.x, y: e.clientY - move.offset.y };

            finishMove(true);
        }, {once: true});

    },[windowRef, settings, finishMove]);
}