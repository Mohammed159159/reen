import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import Observer from "gsap/dist/Observer";

gsap.registerPlugin(Observer);

export default function useLandingAnimation() {
    const animating = useRef(false);
    const currentIndex = useRef(-1);

        useEffect(() => {
            let sections = document.querySelectorAll("section"),
                images = document.querySelectorAll(".bg"),
                headings = gsap.utils.toArray(".section-heading"),
                outerWrappers = gsap.utils.toArray(".outer"),
                innerWrappers = gsap.utils.toArray(".inner"),
                splitHeadings: NodeList[] = [],
                wrap = gsap.utils.wrap(0, sections.length),
                splitLetters: NodeList[] = [];
            console.log(headings[0])            
            let head, splitheading, splitLetter;
            headings.forEach((heading, index) => {
                head = document.querySelector("#head" + index);
                splitheading = head!.querySelectorAll(".word");
                splitHeadings.push(splitheading);
                splitLetter = head!.querySelectorAll(".letter");
                splitLetters.push(splitLetter);
            });
            gsap.set(outerWrappers, { yPercent: 100 });
            gsap.set(innerWrappers, { yPercent: -100 });

            function gotoSection(index: number, direction: number) {
                index = wrap(index); // make sure it's valid
                animating.current = true;
                let fromTop = direction === -1,
                    dFactor = fromTop ? -1 : 1;
                const tl = gsap.timeline({
                    defaults: { duration: 1.5, ease: "power1.inOut" },
                    onComplete: () => {
                        animating.current = false;
                    },
                }); ////

                if (currentIndex.current >= 0) {
                    // The first time this function runs, current is -1
                    gsap.set(sections[currentIndex.current], { zIndex: 0 });
                    tl.to(images[currentIndex.current], {
                        yPercent: -15 * dFactor,
                    }).set(sections[currentIndex.current], { autoAlpha: 0 });
                }
                gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
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
                    .fromTo(
                        images[index],
                        { yPercent: 15 * dFactor },
                        { yPercent: 0 },
                        0
                    )
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
                currentIndex.current = index;
            }

            Observer.create({
                type: "wheel,touch,pointer",
                wheelSpeed: -1,
                onUp: () =>
                    !animating.current &&
                    gotoSection(currentIndex.current + 1, 1),
                onDown: () =>
                    !animating.current &&
                    gotoSection(currentIndex.current - 1, -1),
                tolerance: 10,
                preventDefault: true,
            });
            gotoSection(0, 1);
        }, []);
}
