import {SystemFile} from "./file.types.ts";
import {WindowAnimation} from "../os/window/window.types.ts";

export interface MemoryContext {
    storage: SystemFile[];
    desktop: {
        files: SystemFile[];
        backgroundImage: string;
    };
    settings: {
        windowAnimation: WindowAnimation;
    }
}