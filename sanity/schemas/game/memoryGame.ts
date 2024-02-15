import { defineField, defineType } from 'sanity';

export default defineType({
  name: process.env.NEXT_PUBLIC_SANITY_MEMORY_GAME!,
  title: 'Memory Game',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID du propriétaire',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'winningTime',
      title: 'Les temps gagnants',
      type: 'array',
      of: [{ type: 'number' }],
      readOnly: true,
    }),
    defineField({
      name: 'winners',
      title: 'Gagnants',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'attempts',
      title: 'Tentatives',
      type: 'number',
      readOnly: true,
    }),
  ],
});
