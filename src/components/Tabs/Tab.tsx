import {ReactNode, useState} from "react";

export default function Tab(_: TabProps) {
    const [isActive, setIsActive] = useState(false);

    return <>
        {isActive ? _.children : null}
    </>
}

export interface TabProps {
    value: string;
    label: string;
    children: ReactNode;
}