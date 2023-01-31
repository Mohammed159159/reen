import { defineType } from "sanity";

export default defineType({
    name: "galleryImage",
    type: "object",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            description: "Add image title"
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: { hotspot: true },
            description: "Upload image"

        },
        {
            name: "tags",
            title: "Tags",
            type: "array",
            of: [
                {
                    name: "tag",
                    title: "Tag",
                    type: "string",
                },
            ],
            description: "Add tags to your image"

        },
        {
            name: "ratings",
            title: "Ratings",
            type: "array",
            of: [{
                name: "rating",
                title: "rating",
                type: "number",
            }],
            readOnly: true,
            description: "Ratings given to your image by the website's visitors",
        },
    ],
});
