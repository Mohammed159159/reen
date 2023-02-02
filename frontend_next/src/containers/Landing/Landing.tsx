/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import useQuote from "@/hooks/Quote";
import style from "./Landing.module.scss";
import Letters from "@/components/Letters";
import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import Header from "../Header/Header";

//Register Observer plugin from gsap
gsap.registerPlugin(Observer);

export default function Landing({ strings, NextSection }: { strings: string[], NextSection: React.FunctionComponent }) {
    //Set animation control variables
    const animating = useRef(false);
    const currentIndex = useRef(-1);

    //Create animated sections in Landing according to the length of splitQuote then animate to nextSection
    useEffect(() => {
        //Get .app__landing elements to animate
        let landing = document.querySelector(".app__landing")!; //landing section container
        let sections = landing.querySelectorAll("section"), //sections containing animation elements
            images = landing.querySelectorAll(".bg"), //background images
            headings = gsap.utils.toArray(
                landing.querySelectorAll(".section-heading")
            ), //headings' text container
            outerWrappers = gsap.utils.toArray(
                landing.querySelectorAll(".outer")
            ), //headings' outer wrappers
            innerWrappers = gsap.utils.toArray(
                landing.querySelectorAll(".inner")
            ), //headings' inner wrappers
            wrap = gsap.utils.wrap(0, sections.length), //wrap index from 0 to sections.length - 1
            splitLetters: NodeList[] = []; //letters of text inside headings
        //An alternative way to split text to letter divs using <Letters/> (aside from SplitText premium gsap util)
        let head, splitLetter;
        headings.forEach((_heading, index) => {
            head = landing.querySelector("#head" + index)!; //each .section_heading has an id
            splitLetter = head.querySelectorAll(".letter"); //get the letters of the corresponding .section_heading
            splitLetters.push(splitLetter); //push them to the splitLetters
        });

        //Set wrappers' initial conditions
        gsap.set(outerWrappers, { yPercent: 100 });
        gsap.set(innerWrappers, { yPercent: -100 });

        //Animation function to navigate between sections
        function gotoSection(index: number, direction: number) {
            //Prepare animation variables
            index = wrap(index); //wrap index between 0 and sections.length - 1 inclusive
            animating.current = true; //set animating flag to true
            let fromTop = direction === -1, //understand which direction to animate to (1 = to up | -1 = to down)
                dFactor = fromTop ? -1 : 1;

            //Initialize gsap timeline
            const tl = gsap.timeline({
                defaults: { duration: 1.5, ease: "power1.inOut" },
                onComplete: () => {
                    animating.current = false;
                },
            });

            //Hide previous section
            if (currentIndex.current >= 0) {
                // The first time this function runs, current is -1
                gsap.set(sections[currentIndex.current], { zIndex: 0 });
                tl.to(images[currentIndex.current], {
                    yPercent: -15 * dFactor,
                }).set(sections[currentIndex.current], { autoAlpha: 0 });
            }

            //Allow next section to be visible
            gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });

            //Animate .section_heading Wrappers of next section
            tl.fromTo(
                [outerWrappers[index], innerWrappers[index]],
                {
                    yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
                },
                {
                    yPercent: 0,
                },
                0
            )
                //Animate .bg of next section
                .fromTo(
                    images[index],
                    { yPercent: 15 * dFactor },
                    { yPercent: 0 },
                    0
                )
                //Animate .section_heading letters of next section
                .fromTo(
                    splitLetters[index],
                    {
                        autoAlpha: 0,
                        yPercent: 150 * dFactor,
                    },
                    {
                        autoAlpha: 1,
                        yPercent: 0,
                        duration: 1,
                        ease: "power2",
                        stagger: {
                            each: 0.02,
                            from: "random",
                        },
                    },
                    0.2
                );

            //Update currentIndex to next section
            currentIndex.current = index;
        }

        //Get .app__nextSection elements to animate
        let nextSection = document.querySelector(".app__nextSection")!, //landing section container
            section = nextSection.querySelector("section"), //section containing animation elements
            image = nextSection.querySelector(".bg"), //background image
            outerWrapper = nextSection.querySelector(".outer"), //heading's outer wrapper
            innerWrapper = nextSection.querySelector(".inner"); //heading's inner wrapper
        
        //Set wrappers' initial conditions
        gsap.set(outerWrapper, { yPercent: 100 });
        gsap.set(innerWrapper, { yPercent: -100 });

        //Know when we should end the animation
        const duration: number = 1.5;
        //Animation function to navigate to nextSection
        function gotoNextSection() {
            //Prepare animation variables
            animating.current = true; //set animating flag to true
            let dFactor = 1; //direction factor set to go navigate down (push previous section up)

            //Initialize gsap timeline
            const tl = gsap.timeline({
                defaults: { duration: duration, ease: "power1.inOut" },
                onComplete: () => {
                    animating.current = false;
                },
            });

            //Hide previous section
            if (currentIndex.current >= 0) {
                // The first time this function runs, current is -1
                gsap.set(sections[currentIndex.current], { zIndex: 0 });
                tl.to(images[currentIndex.current], {
                    yPercent: -15 * dFactor,
                }).set(sections[currentIndex.current], { autoAlpha: 0 });
            }

            //Allow nextSection to be visible
            gsap.set(section, { autoAlpha: 1, zIndex: 1 });

            //Animate .section_heading Wrappers of nextSection
            tl.fromTo(
                [outerWrapper, innerWrapper],
                {
                    yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
                },
                {
                    yPercent: 0,
                },
                0
            )
                //Animate .bg of nextSection
                .fromTo(image, { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);
            setTimeout(() => {
                obs.kill(); //kill observer to start normal scrolling
                    document
                        .getElementById("nextSectionContent")
                    ?.style.setProperty("position", "absolute"); //change position fixed  to absolute on nextSectionContent
                    document.getElementById("nextSection")?.style.setProperty("position", "relative")
                    document.getElementById("landing")?.style.setProperty("display", "none"); //hide .app__landing
            }, duration * 1000)

        }

        let obs = Observer.create({
            type: "wheel,touch,pointer",
            wheelSpeed: -1,
            onUp: () => {
                !animating.current &&
                    (currentIndex.current == sections.length - 1
                        ? gotoNextSection()
                        : gotoSection(currentIndex.current + 1, 1));

            },
            onDown: () => {
                !animating.current && gotoSection(currentIndex.current - 1, -1);
            },
            tolerance: 10,
            preventDefault: true,
        });

        gotoSection(0, 1);

        

    }, []);
    return (
        <>
            <div className={style["app__landing"] + " app__landing "} id="landing">
                {strings.map((string, index) => (
                    <section
                        className={style[`app__landing-quote`]}
                        key={index}
                    >
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
                                        {Letters(
                                            string,
                                            "word " + style.word,
                                            "letter " + style.letter
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
            <div className={style["app__nextSection"] + " app__nextSection "} id="nextSection">
                <section
                    className={style[`app__nextSection-content`]}
                    id="nextSectionContent"
                >
                    <div className={style["outer"] + " outer "}>
                        <div className={style["inner"] + " inner "}>
                            <div className={style["bg"] + " bg "}>
                                <NextSection/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
