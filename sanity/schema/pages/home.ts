import { defineType } from "sanity";

export default defineType({
    name: "home",
    title: "Home",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "description",
            title: "Description",
            type: "text",
        },
    ],
})