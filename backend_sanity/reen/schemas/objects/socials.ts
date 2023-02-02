import { defineType } from "sanity";

export default defineType({
    name: "social",
    type: "object",
    fields: [
        {
            name: "platform",
            title: "Platform",
            type: "string",
            options: {
                list: [
                    "Facebook",
                    "Twitter",
                    "Instagram",
                    {title: "LinkedIn", value: "LinkedIn"}  
                ]
            }
        },
        {
            name: "url",
            title: "URL",
            type: "string",
        },
    ],
});
