import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'generatedTextGradient',
  title: 'Titre principal',
  type: 'array',
  of: [
    defineField({
      name: 'textGradient',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Texte',
          description: 'Texte à afficher',
          type: 'string',
        }),
        defineField({
          name: 'gradient',
          description: 'Défini si le text est gradient ou pas',
          title: 'Defini si le texte doit être en gradient ou pas',
          type: 'boolean',
        }),
      ],
    }),
  ],
});
