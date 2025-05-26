import styles from "./Window.module.css"
import TitleBar from "./TitleBar.tsx";

export default function Window() {

    const mouseMove = () => {
        console.log("MouseMove");
    }

    return <>
        <div className={`win95-control ${styles.win95Window}`}>
            <TitleBar title='test' onMouseHold={mouseMove}></TitleBar>
            <div className={styles.win95WindowContent}>
            </div>
        </div>
    </>
}