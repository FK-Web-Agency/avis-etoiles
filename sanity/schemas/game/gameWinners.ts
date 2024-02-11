import { Icons } from '@/components/shared';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'gameWinners',
  title: 'Les reports de victoire',
  type: 'document',
  icon: Icons.Trophy,
  fields: [
    defineField({
      name: 'user',
      title: 'Propriétaire du report',
      type: 'reference',
      to: [{ type: process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS! }],
    }),
    defineField({
      name: 'winners',
      title: 'Les gagnants',
      type: 'array',
      of: [{ type: 'winner' }],
    }),
  ],
});
