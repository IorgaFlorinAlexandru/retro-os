import {Window} from "../window";
import styles from './TestComponent.module.css';
import {Icons} from "../../components/Icon/icon.types.ts";

export function TestComponent() {
    return <>
        <Window.Root>
            <Window.TitleBar title={"Test Component"} icon={Icons.FOLDER}></Window.TitleBar>
            <Window.MenuBar></Window.MenuBar>
            <div className={styles.testContent}>
                hello
            </div>
            <Window.StatusBar></Window.StatusBar>
        </Window.Root>
    </>
}