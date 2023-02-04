import { client, urlFor } from "@/api/client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import { User } from "@/contstants/types";
import icons from "@/contstants/icons";

export default function Header({ user, headerImage }: { user: User, headerImage: string }) {
    const startTyping = useStartTypeWritinig()


    return (
        <motion.div
            className={styles["app__header"] + " app__header "}
            id="header"
            whileInView={{ x: [-50, 0], opacity: [0, 1] }}
            viewport={{once: true}}
            transition={{ duration: 0.5, delay: 0.05, staggerChildren: 0.3}}
            ref={startTyping.header}
        >
            <img
                className={styles["app__header-image"]}
                src={urlFor(headerImage).url()}
            />
            <div className={styles["app__header-frontfilter"]}></div>
            <div className={styles["app__header-content"]}>
                <div className={styles["app__header-roles"]}>
                    {true && ( //startTyping.write
                        <Typewriter
                            onInit={(typewritter) => {
                                typewritter
                                    .typeString("I'm a <br>")
                                    .start();
                                user.roles.forEach((role) => {
                                    typewritter
                                        .typeString(role)
                                        .start()
                                        .pauseFor(1000)
                                        .deleteChars(role.length);
                                });
                                typewritter
                                    .typeString(user.roles[0])
                                    .callFunction(() => {
                                        document
                                            .querySelector(
                                                ".Typewriter__cursor"
                                            )
                                            ?.classList.add("hidden");
                                    });
                            }}
                            options={{
                                delay: 90,
                                deleteSpeed: 10,
                            }}
                        />
                    )}
                </div>
                <h2 className={styles["app__header-name"] + " head-text"}>
                    {user.name}
                </h2>
                <ul className={styles["app__header-socials"]}>
                    {user.socials.map((social, index) => (
                        <motion.li
                            key={index}
                            whileInView={{ x: [-50, 0], opacity: [0, 1] }}
                            transition={{
                                duration: 0.5,
                                delay: 0.05 + Math.random() * 0.09,
                            }}
                        >
                            <a href={social.url}>
                                {icons[social.platform.toLowerCase()]}
                            </a>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

//Determine when to start typewriting
gsap.registerPlugin(Observer);
const useStartTypeWritinig = () : {write: boolean, header: React.RefObject<HTMLDivElement>} => {
        //Get header to check whether or not we should start typing
        const header = useRef<HTMLDivElement>(null);

        //Define flag to start Typewritter
        const [write, setWrite] = useState(false);
    
        useEffect(() => {
            //Observe changes in header's class list to know when it is visible
            const obs = Observer.create({
                target: header.current,
                onStop: () => {
                    const visible = header.current?.classList.contains("visible")! //shorthand variable
                    setWrite(visible); //toggle write flag to start
                    setTimeout(() => {
                        setWrite(visible); //just in case redundant toggle
                    }, 250);
                    visible && obs.kill(); //kill obeserver 
                },
            });
        }, [write]);
    
    return {
        write,
        header
    };
}