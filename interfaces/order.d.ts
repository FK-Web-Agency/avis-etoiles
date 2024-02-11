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

type IOrder = z.infer<typeof orderSchema>;


