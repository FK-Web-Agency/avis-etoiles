import { z } from 'zod';
import { DefaultSchema } from './sanity';

const userSchema = DefaultSchema.merge(
  z.object({
    clerkId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    companyName: z.string().optional(),
    email: z.string(),
    phone: z.string().optional(),
    role: z.string().optional(),
    logo: z.string().optional(),
    address: z
      .object({
        street: z.string(),
        city: z.string(),
        zip: z.string(),
        country: z.string(),
      })
      .optional(),
    game: z
      .object({
        rewards: z.array(z.string()),
        secretCode: z.string(),
      })
      .optional(),

    subscription: z
      .object({
        status: z.boolean(),
        expirationDate: z.date(),
      })
      .optional(),

    analytics: z
      .array(
        z.object({
          month: z.string(),
          year: z.string(),
          google: z.number(),
          facebook: z.number(),
          instagram: z.number(),
          visitors: z.number(),
        })
      )
      .optional(),
  })
);

type IUser = z.infer<typeof userSchema>;