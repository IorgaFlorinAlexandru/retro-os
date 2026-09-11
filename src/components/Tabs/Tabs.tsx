import {Children, isValidElement, ReactElement, ReactNode, useMemo, useState} from "react";
import styles from './Tabs.module.css';

interface TabProps {
    id: string;
    label: string;
    children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Tab(_: TabProps) {
    return null;
}

export function Tabs({ children, defaultTabId }: { children: ReactNode, defaultTabId?: string }) {
    const tabs = useMemo(() => {
       return Children.toArray(children)
           .filter((child): child is ReactElement<TabProps> =>
               isValidElement(child) && child.type === Tab);
    },[children]);

    const initialTabId = getInitialActiveTabId(tabs.map(t => t.props.id), defaultTabId);
    const [activeTabId, setActiveTabId] = useState<string | null>(initialTabId);

    return <div className={styles.osTabs}>
        <ul className={styles.osTabList}>
            {tabs.map((tab, index) => (
                <li key={index}
                    className={`win95-control ${styles.osTab} ${activeTabId === tab.props.id ? styles.activeTab : ''}`}
                    onMouseDown={() => setActiveTabId(tab.props.id)}>{tab.props.label}</li>
            ))}
        </ul>
        <div className={`win95-control ${styles.osTabContent}`}>
            {activeTabId && (tabs.find(t => t.props.id === activeTabId)?.props.children)}
        </div>
    </div>
}

function getInitialActiveTabId(tabIds: string[] ,defaultTabId?: string): string | null {
    if(tabIds.length === 0) {
        return null;
    }

    if (defaultTabId && tabIds.includes(defaultTabId)) {
        return defaultTabId;
    }

    return tabIds[0];
}