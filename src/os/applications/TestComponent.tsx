import {Window} from "../window";
import styles from './TestComponent.module.css';
import {Icons} from "../../components/Icon/icon.types.ts";

export function TestComponent() {
    return <>
        <Window.Root>
            <Window.TitleBar title={"My computer Test"} icon={Icons.MY_COMPUTER}></Window.TitleBar>
            <Window.MenuBar></Window.MenuBar>
            <div className={styles.testContent}>
                hello
            </div>
            <Window.StatusBar></Window.StatusBar>
        </Window.Root>
    </>
}