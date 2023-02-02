import { client, urlFor } from "@/api/client";
import React, { useEffect, useRef, useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import styles from "./Header.module.scss";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import gsap from "gsap";
import Observer from "gsap/dist/Observer";

//Define types of incoming data
type User = {
    //User object
    name: string;
    phone: string;
    email: string;
    profile: string;
    roles: string[];
    socials: Social[];
};

type Social = {
    //Social object
    platform: string;
    url: string;
};
const icons: Record<string, JSX.Element> = {
    //Define icons to map user choices
    facebook: <FaFacebook />,
    twitter: <FaTwitter />,
    instagram: <FaInstagram />,
    linkedin: <FaLinkedin />,
};

//Register observer from gsap
gsap.registerPlugin(Observer);

export default function Header() {
    //Store user data in stateful variable
    const [user, setUser] = useState<User>();

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

        //Fetch User data for Header from Sanity
        const query = "*[_type == 'user']";
        client
            .fetch(query)
            .then((user: User[]) => setUser(user[0]))
            .catch((err) => console.log(err));
    }, [write]);

    //Display Loading till data is fetched
    if (!user) return <h2 className="head-text">Loading</h2>;

    //Display section
    return (
        <motion.div
            className={styles["app__header"] + " app__header "}
            id="header"
            whileInView={{ x: [-50, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.05, staggerChildren: 0.3 }}
            ref={header}
        >
            <img
                className={styles["app__header-image"]}
                src={urlFor(user.profile).url()}
            />
            <div className={styles["app__header-frontfilter"]}></div>
            <div className={styles["app__header-content"]}>
                <div className={styles["app__header-roles"]}>
                    {write && (
                        <Typewriter
                            onInit={(typewritter) => {
                                typewritter
                                    .typeString("Hi, I am a <br>")
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
