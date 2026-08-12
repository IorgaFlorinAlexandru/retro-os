import {Window} from "../window";
import styles from './TestComponent.module.css';
import {Icons} from "../../components/Icon/icon.types.ts";
import Tabs from "../../components/Tabs/Tabs.tsx";
import Tab from "../../components/Tabs/Tab.tsx";

export function TestComponent() {
    return <>
        <Window.Root>
            <Window.TitleBar title={"My computer Test"} icon={Icons.MY_COMPUTER}></Window.TitleBar>
            <Window.MenuBar></Window.MenuBar>
            <div className={styles.testContent}>
                <Tabs>
                    <Tab value="Tab1" label="Tab1">
                        hello
                    </Tab>
                    <Tab value="Tab2" label="Tab2">
                        hello
                    </Tab>
                </Tabs>
            </div>
            <Window.StatusBar></Window.StatusBar>
        </Window.Root>
    </>
}