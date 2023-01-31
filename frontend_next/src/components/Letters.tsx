import React from "react";
import { motion } from "framer-motion";

export default function Letters(
    text: string,
    wordClassName: string,
    letterClassName: string
) {
    let words = text.split(" ");
    let splitWords: string[][] = [[]];
    let letters: string[] = []

    words.forEach((word, index) => {
        for (var i = 0; i < word.length; i++) {
            letters.push(word[i])
        }

        splitWords[index] = letters
        letters = []
    });


    return (
        <>
            {splitWords!.map((word, index) => (
                <div
                    className={wordClassName}
                    key={index}
                    style={{ display: "flex"}}

                >
                    {word.map((letter, index) => (
                        <div
                            className={letterClassName}
                            key={index}
                        >
                            {letter}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}

{
    /* <motion.div className="letter"
                    style={{display: 'inline'}}
                    key={index}
                    animate={{
                        y: [-100 - Math.random() * 50, 0],
                        opacity: [0, 0.3, 0.9, 1],
                    }}
                    transition={{
                        delay: 0.3 + Math.random() * 0.09,
                        ease: [0.075, 0.82, 0.165, 1],
                        duration: 2,
                    }}
                >
                    {letter}
                </motion.div> */
}

// export default function Letters({ text, className, id } : { text: string, className: string, id?: number}) {
//     let letters: string[] = [];
//     for (var i = 0; i < text.length; i++) {
//         letters.push(text[i]);
//     }

//     return (
//         <motion.h1 className={className} id={"head" + id!.toString()}
//         >
//             {letters.map((letter, index) => (
//                 <motion.div className="letter"
//                     style={{display: 'inline'}}
//                     key={index}
//                     animate={{
//                         y: [-100 - Math.random() * 50, 0],
//                         opacity: [0, 0.3, 0.9, 1],
//                     }}
//                     transition={{
//                         delay: 0.3 + Math.random() * 0.09,
//                         ease: [0.075, 0.82, 0.165, 1],
//                         duration: 2,
//                     }}
//                 >
//                     {letter}
//                 </motion.div>
//             ))}
//         </motion.h1>
//     );
// }
