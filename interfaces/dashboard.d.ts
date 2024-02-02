import { z } from 'zod';

const DefaultSchema = z.object({
  _ref: z.string(),
  _type: z.string(),
  _id: z.string(),
});

const monthSchema = z.object({
  month: z.string(),
  facebook: z.number(),
  google: z.number(),
  instagram: z.number(),
  _key: z.string(),
  visitors: z.number(),
});

const analyticsSchema = z.object({
  year: z.string(),
  _type: z.literal('analytic'),
  _key: z.string(),
  months: z.array(monthSchema),
});

const winnerSchema = z.object({
  winnerLastName: z.string(),
  winnerFirstName: z.string(),
  winnerPhone: z.string(),
  _type: z.literal('winner'),
  winnerEmail: z.string().email(),
  winnerZipAddress: z.string(),
  _key: z.string(),
});

const gameWinnersSchema = z.object({
  winners: z.array(winnerSchema),
  _type: z.literal('gameWinners'),
  _id: z.string(),
  _createdAt: z.string(),
  _rev: z.string(),
  _updatedAt: z.string(),
});

const assetSchema = z.object({
  _ref: z.string(),
});

const imageSchema = z.object({
  _type: z.literal('image'),
  asset: assetSchema,
});

const actionSchema = z.object({
  _key: z.string(),
  value: z.string(),
  socialNetworkName: z.string(),
});

const gameConfigSchema = z.object({
  rewards: z.array(z.string()),
  secretCode: z.string(),
  background: imageSchema,
  _updatedAt: z.string(),
  user: z.object({
    _type: z.literal('reference'),
  }),
  easel: imageSchema,
  _createdAt: z.string(),
  qrCode: imageSchema,
  logo: imageSchema,
  _id: z.string(),
  actions: z.array(actionSchema),
  color: z.string(),
  numberWinners: z.number(),
  _rev: z.string(),
  _type: z.literal('gameConfig'),
});

type IGameConfig = z.infer<typeof gameConfigSchema>;

type IAnalytics = z.infer<typeof analyticsSchema>;
type IWinner = z.infer<typeof winnerSchema>;
type IGameWinners = z.infer<typeof gameWinnersSchema>;
