import { defineField, defineType } from 'sanity';

export default defineType({
  type: 'document',
  name: 'game-config',
  title: 'Jeu',
  fields: [
    defineField({
      name: 'user',
      title: 'Membre',
      type: 'reference',
      to: [{ type: 'users' }],
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'background',
      title: 'Arrière plan',
      type: 'reference',
      to: [{ type: 'gameBackgrounds' }],
    }),
    defineField({
      name: 'color',
      title: 'Couleur',
      type: 'string',
    }),
    defineField({
      name: 'rewards',
      title: 'Récompenses',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'numberWinners',
      title: 'Nombre de gagnants',
      type: 'number',
    }),
    defineField({
      name: 'secretCode',
      title: 'Code secret',
      description: 'Code secret pour confirmer la recupération de la récompense',
      type: 'string',
    }),
  ],
});
