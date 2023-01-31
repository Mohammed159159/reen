/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import useQuote from "@/hooks/Quote";
import style from "./Landing.module.scss";
import Letters from "@/components/Letters";
import useLandingAnimation from "@/hooks/LandingAnimation"; //import problem?


export default function Landing() {

    const splitQuote = ["Hello World Go Stuff", "Animated with GSAP", "Three"];
    useLandingAnimation()
    return (
        <div className={style["app__landing"]}>
            {splitQuote.map((quote, index) => (
                <section className={style[`app__landing-quote`]} key={index}>
                    <div className={style["outer"] + " outer "}>
                        <div className={style["inner"] + " inner "}>
                            <div className={style["bg"] + " bg "}>
                                <div
                                    id={"head" + index}
                                    className={
                                        style["section-heading"] +
                                        " section-heading "
                                    }
                                >
                                    {Letters(quote, "word " + style.word, "letter " + style.letter)}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );


}
