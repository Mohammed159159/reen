import { defineType } from "sanity";

export default defineType({
    name: "social",
    type: "object",
    fields: [
        {
            name: "platform",
            title: "Platform",
            type: "string",
        },
        {
            name: "url",
            title: "URL",
            type: "string",
        },
    ],
});
