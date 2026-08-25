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
                    <Tab value="1" label="General">
                        hello
                    </Tab>
                    <Tab value="2" label="Device Manager">
                        hello
                    </Tab>
                    <Tab value="3" label="Hardware Profiles">
                        hello
                    </Tab>
                    <Tab value="4" label="Performance">
                        hello
                    </Tab>
                </Tabs>
            </div>
            <Window.StatusBar></Window.StatusBar>
        </Window.Root>
    </>
}