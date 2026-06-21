import {WindowTitleBar} from "./components/WindowTitleBar.tsx";
import {WindowStatusBar} from "./components/WindowStatusBar.tsx";
import {WindowMenuBar} from "./components/WindowMenuBar.tsx";
import {Window as win} from "./components/Window.tsx";

export const Window = {
    Root: win,
    TitleBar: WindowTitleBar,
    StatusBar: WindowStatusBar,
    MenuBar: WindowMenuBar
}