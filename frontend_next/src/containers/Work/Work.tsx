import { styleIcons } from "@/contstants/icons";
import { WorkStyle } from "@/contstants/types";
import { RiCameraLensFill } from "react-icons/ri";
import styles from "./Work.module.scss";
export default function Work({ workStyle }: { workStyle: WorkStyle }) {
    return (
        <div className={styles["app__work"]}>
            <ul className={styles["app__work-standards"]}>
                {workStyle.standards.map((standard, index) => (
                    <li key={index} className={styles["app__work-standard"]}>
                        <div>
                            <RiCameraLensFill/>
                            </div>
                        <p><span className="head-text">{standard.title}.</span> {standard.description}</p>
                    </li>
                ))}
            </ul>
            <ul className={styles["app__work-styles"]}>
                {workStyle.styles.map((style, index) => (
                    <li key={index} className={styles["app__work-style"]}>
                        {styleIcons[style]}
                        <p>{style}</p>
                    </li>
                ))
                }
            </ul>
        </div>
    );
}
