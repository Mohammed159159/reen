import "./objects/image"

export default {
    name: "gallery",
    title: "Gallery",
    type: "document",
    fields: [
        {
            name: "images",
            title: "Images",
            type: "array",
            of: [{ type: "galleryImage" }],
            description: "Add images to your gallery"
        }
    ]
}