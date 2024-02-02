import { z } from "zod";

const UserIds = z.object({
  clerkId: z.string().optional(),
  sanityId: z.string().optional(),
});

export const GameConfigSchema = z.object({
  user: z
    .object({
      _type: z.string(),
      _ref: z.string(),
    })
    .optional(),
  logo: z.any().optional(),
  background: z.any().optional(),
  color: z.string().optional(),
  actions: z.array(z.object({ socialNetworkName: z.string(), value: z.string() })).optional(),
  rewards: z.array(z.string()).optional(),
  numberWinners: z.number().optional(),
  secretCode: z.string().optional(),
  qrCode: z.any().optional(),
  easel: z.any().optional(),
});

const OnboardingSchema = z.object({
  step: StepSchema,
  userIds: UserIds,
  gameConfig: GameConfigSchema,
  setStep: z.function().args(z.string()).returns(z.void()),
  setUserIds: z.function().args(UserIds).returns(z.void()),
  setGameConfig: z.function().args(GameConfigSchema).returns(z.void()),
});

type Onboarding = z.infer<typeof OnboardingSchema>;
type UserIdsProps = z.infer<typeof UserIds>;
type GameConfigProps = z.infer<typeof GameConfigSchema>;