import {Children, isValidElement, ReactElement, ReactNode, useMemo, useState} from "react";
import Tab, {TabProps} from "./Tab.tsx";
import styles from './Tabs.module.css';

export default function Tabs({ children }: { children: ReactNode }) {
    const tabs = useMemo(() => {
       return Children.toArray(children)
           .filter((child): child is ReactElement<TabProps> =>
               isValidElement(child) && child.type === Tab);
    },[children])

    const [activeTab, setActiveTab] = useState<ReactElement<TabProps> | null>(null)

    return <div className={styles.osTabs}>
        <ul className={styles.osTabList}>
            {tabs.map((tab, index) => (
                <li className={`win95-control ${styles.osTab}`} key={index}>{tab.props.label}</li>
            ))}
        </ul>
        <div className={`win95-control ${styles.osTabContent}`}>
            {activeTab && (activeTab.props.children)}
        </div>
    </div>
}