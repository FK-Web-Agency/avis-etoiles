import { z } from 'zod';

const orderSchema = z.object({
  stripeId: z.string().description("Numéro Stripe ID de l'abonnement"),
  plan: z.string(),
  buyerId: z.string(),
  seller: z.string(),
  price: z.number(),
  interval: z.string(),
  createdAt: z.date(),
});

const CustomerSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  companyName: z.string(),
  address: z.object({
    line1: z.string(),
    city: z.string(),
    zipCode: z.string(),
    country: z.string(),
  }),
  seller: z.string(),
  clerkId: z.string().optional(),
});

type ICustomer = z.infer<typeof CustomerSchema>;
type IOrder = z.infer<typeof orderSchema>;
