import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'gameWinners',
  title: 'Les reports de victoire',
  type: 'document',
  fields: [
    defineField({
      name: 'user',
      title: 'Propriétaire du report',
      type: 'reference',
      to: [{ type: 'users' }],
    }),
    defineField({
      name: 'winners',
      title: 'Les gagnants',
      type: 'array',
      of: [{ type: 'winner' }],
    }),
  ],
});
