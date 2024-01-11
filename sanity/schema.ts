import { type SchemaTypeDefinition } from 'sanity';
import { home } from './schemas/pages';
import { seo } from './schemas/helper';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [seo, home],
};
