import { client, urlFor } from "@/api/client";
import {useRef } from "react";
import styles from "./About.module.scss";

export default function About({
    about,
    profilePic,
}: {
    about: string;
    profilePic: string;
    }) {

    // leftContainer.current?.style.setProperty('height', rightContainer.current?.style.height)

    return (
        <div className={styles["app__about"] + " app__wrap app__flex"}>
            <div className={styles["app__about-left"] + " app__flex "}>
                <img
                    className={styles["app__about-profile"]}
                    src={urlFor(profilePic).url()}
                />
                <div className={styles["app__about-profile--filter"]} />
            </div>
            <div className={styles["app__about-right"]}>
                <h1 className={styles["app__about-title"] + " head-text "}>
                    About Me
                    <div />
                </h1>
                <p className={styles["app__about-bio"] + " p-text "}>{about}</p>
            </div>
        </div>
    );
}
