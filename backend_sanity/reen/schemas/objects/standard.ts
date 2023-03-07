import { defineType } from "sanity";

export default defineType({
    name: "standard",
    type: "object",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            description: "Add title for your standard"
        },
        {
            name: "description",
            title: "Description",
            type: "string",
            description: "Describe your standard"
        },
    ],
});
