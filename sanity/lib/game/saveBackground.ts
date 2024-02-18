import { z } from 'zod';
import { client } from '..';

const saveBackgroundSchema = z.object({
  id: z.string(),
  background: z.object({
    _type: z.string(),
    asset: z.object({
      _ref: z.string(),
    }),
  }),
});

export type SaveBackgroundProps = z.infer<typeof saveBackgroundSchema>;

export default async function saveBackground({ id, background }: SaveBackgroundProps) {
  try {
    const fileUpload = await client.patch(id).set({ background }).commit();
    return fileUpload;
  } catch (error) {
    return error;
  }
}
