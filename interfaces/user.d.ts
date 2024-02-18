import { z } from 'zod';

const Seller = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

const ClerkMember = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  seller: Seller,
});

const SellerSanity = z.object({
  _type: 'reference',
  _ref: z.string(),
});

const SanityMember = ClerkMember.merge(
  z.object({
    clerkId: z.string(),
    stripeId: z.string().optional(),
    seller: SellerSanity,
  })
);



type ISanityMember = z.infer<typeof SanityMember>;
type ISeller = z.infer<typeof Seller>;
type ISellerSanity = z.infer<typeof SellerSanity>;
type IClerkMember = z.infer<typeof ClerkMember>;
