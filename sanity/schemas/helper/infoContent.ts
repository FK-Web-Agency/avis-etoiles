import { defineField } from "sanity";

export default {
    name: 'infoContent',
    type: 'object',
    fields: [
        defineField({
          name: 'title',
          title: 'Titre',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Contenu',
          type: 'array',
          of: [
            {
              type: 'block',
            },
          ],
        }),
      ],
}