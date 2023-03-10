import images from "@/contstants/images";
import { motion } from "framer-motion";
import Head from "next/head";

export default function Loading({title}: {title: string}) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name="Photography Website"
                    content="Photography Portfolio Gallery"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href={images.logo.src} />
            </Head>
            <motion.img
                whileInView={{ rotate: [0, 90, 180, 360], scale: [1, 0.85, 1] }}
                transition={{
                    duration: 1.5,
                    ease: "anticipate",
                    repeat: Infinity,
                    repeatDelay: 0.3,
                }}
                src={images.loading.src}
                style={{
                    position: "absolute",
                    width: "10%",
                    top: "50%",
                    left: "50%",
                    translateX: "-50%",
                    translateY: "-50%",
                    margin: 0,
                }}
            ></motion.img>
        </>
    );
}
[];
