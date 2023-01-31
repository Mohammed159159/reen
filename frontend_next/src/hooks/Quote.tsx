/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export default function useQuote() {
    const [quote, setQuote] = useState<string[]>([]);
    const [retry, setRetry] = useState<boolean>(false);
    const category = "inspirational";

    const divQuote = (quote: string) => {
        const words = quote.split(" ");
        if (words.length > 9) {
            console.log("No: " + words.length)
            setRetry((retry) => !retry);
            return;
        }
        console.log("Yes: " + words.length)
        let splitQuote = [];
        for (var i = 0; i < words.length; i += 3) {
            splitQuote[i] =
                words[i] +
                " " +
                (words[i + 1] || "") +
                " " +
                (words[i + 2] || "");
        }
        setQuote(splitQuote);
    };
    useEffect(() => {
        fetch("https://api.api-ninjas.com/v1/quotes?category=" + category, {
            method: "GET",
            headers: {
                "X-Api-Key": "mrWZ2uqGYThgLlxDOn50qA==DWP0KYHNXrbDV3aH",
        
            },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("quote: " + res[0]["quote"])
                divQuote(res[0]["quote"])
            })
            .catch((err) => console.log(err.message));
    }, [retry]);

    return quote;
}
