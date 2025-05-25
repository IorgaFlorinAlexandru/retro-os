import styles from "./Window.module.css"
import TitleBar from "./TitleBar.tsx";
import Button from "../../../components/Button/Button.tsx";

export default function Window() {

    function handleClick() {
        console.log("Window");
    }

    const mouseMove = () => {
        console.log("MouseMove");
    }

    return <>
        <div className={`win95-control ${styles.win95Window}`}>
            <TitleBar title='test' onMouseHold={mouseMove}></TitleBar>
            <div className={styles.win95WindowContent}>
                <br/>
                <Button onClick={handleClick}>
                    Terminator
                </Button>
            </div>
        </div>
    </>
}