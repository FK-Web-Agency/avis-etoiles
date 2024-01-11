import { defineField, defineType } from 'sanity';

const groups = [
  {
    name: 'banner_content',
    title: "Bannière de la page d'accueil",
    icon: () => '🏞️',
    default: true,
  },
];

export default defineType({
  name: 'home',
  title: 'Page d\'accueil',
  type: 'document',
  groups,
  fields: [
    defineField({
      name: 'banner',
      title: "Bannière d'accueil",
      type: 'object',
      group: 'banner_content',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Sous-titre',
          type: 'text',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'banner.title',
      subtitle: 'banner.subtitle',
      media: 'banner.image',
    },
  }
});
