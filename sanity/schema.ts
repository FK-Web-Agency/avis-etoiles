import { type SchemaTypeDefinition } from 'sanity';
import { home } from './schemas/pages';
import { infoContent, seo } from './schemas/helper';
import general from './schemas/general';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [infoContent, seo, general, home],
};
