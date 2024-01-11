import { defineType } from 'sanity';

export default defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      description: 'Titre du banner',
      type: 'string',
    },
  ],
});
