import styles from "./WindowResizeHandlers.module.css";
import {MouseEvent} from "react";

export default function WindowResizeHandlers({ resize }: { resize: ((event: MouseEvent, direction: string) => void) }) {
    return <>
        <div className={`${styles.resizeHandle} ${styles.resizeN}`}
             onMouseDown={(e) => resize(e, "N")}/>
        <div className={`${styles.resizeHandle} ${styles.resizeS}`}
             onMouseDown={(e) => resize(e, "S")}/>
        <div className={`${styles.resizeHandle} ${styles.resizeW}`}
             onMouseDown={(e) => resize(e, "W")}/>
        <div className={`${styles.resizeHandle} ${styles.resizeE}`}
             onMouseDown={(e) => resize(e, "E")}/>
        <div className={`${styles.resizeHandle} ${styles.resizeNwLeft}`}
             onMouseDown={(e) => resize(e, "NW")}/>
        <div className={`${styles.resizeHandle} ${styles.resizeNwTop}`}
             onMouseDown={(e) => resize(e, "NW")}/>
        <div className={`${styles.resizeHandle} ${styles.resizeNeRight}`}
             onMouseDown={(e) => resize(e, "NE")}/>
        <div className={`${styles.resizeHandle} ${styles.resizeNeTop}`}
             onMouseDown={(e) => resize(e, "NE")}/>
        <div className={`${styles.resizeHandle} ${styles.resizeSwLeft}`}
             onMouseDown={(e) => resize(e, "SW")}/>
        <div className={`${styles.resizeHandle} ${styles.resizeSwBottom}`}
             onMouseDown={(e) => resize(e, "SW")}/>
        <div className={`${styles.resizeHandle} ${styles.resizeSeBottom}`}
             onMouseDown={(e) => resize(e, "SE")}/>
        <div className={`${styles.resizeHandle} ${styles.resizeSeRight}`}
             onMouseDown={(e) => resize(e, "SE")}/>
    </>
}