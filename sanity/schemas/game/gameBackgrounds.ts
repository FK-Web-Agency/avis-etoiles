import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'gameBackgrounds',
  title: 'Arriere plans du jeu',
  type: 'document',
  fields: [
    defineField({
      name: 'background',
      title: 'Les arriere plans',
      type: 'image',
    }),
  ],

  preview: {
    select: {
      media : 'background',
    }
  }
});
