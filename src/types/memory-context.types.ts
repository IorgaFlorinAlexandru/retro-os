import {SystemFile} from "./file.types.ts";
import {WindowAnimation} from "../os/window/window.types.ts";

export interface MemoryContext {
    storage: SystemFile[]; // Placeholder type, replace when implementing file folder application
    desktopFiles: SystemFile[];
}

export interface SettingsContext {
    theme: string;
    windowAnimation: WindowAnimation;
    interfaceScale: number;
    volume: number;
    language: "en" | "es" | "ro";
}

export interface ClipboardContext {
    type: "file" | "text" | null;
    mode?: "copy" | "cut";
    value?: string; // Placeholder type, replace when implementing feature
}