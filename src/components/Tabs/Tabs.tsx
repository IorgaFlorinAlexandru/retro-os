import {Children, isValidElement, ReactElement, ReactNode, useMemo} from "react";
import Tab, {TabProps} from "./Tab.tsx";

export default function Tabs({ children }: { children: ReactNode }) {
    const tabs = useMemo(() => {
       return Children.toArray(children)
           .filter((child): child is ReactElement<TabProps> =>
               isValidElement(child) && child.type === Tab);
    },[children])

    return <div>
        <div>
            {tabs.map((tab, index) => (
                <div key={index}>{tab.props.label}</div>
            ))}
        </div>
        <div>
            {children}
        </div>
    </div>
}