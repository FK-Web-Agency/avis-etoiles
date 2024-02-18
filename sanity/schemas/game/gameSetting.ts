import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'gameSetting',
  title: 'Design du jeu',
  type: 'object',
  fields: [
    defineField({
      name: 'background',
      title: 'Arriere plan',
      type: 'image',
    }),
    defineField({
      name: 'color',
      title: 'Couleur',
      type: 'string',
    }),
  ],
});
