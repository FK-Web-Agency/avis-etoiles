import ChangePassword from '@/components/shared/Onboarding/ChangePassword';
import ChooseBackground from '@/components/shared/Onboarding/ChooseBackground';
import UploadLogo from '@/components/shared/Onboarding/UploadLogo';
import { z } from 'zod';
import { create } from 'zustand';

/* 
Steps: All steps of onboarding
SetStep: Set the current step of onboarding
All Components wil have access to the current step of onboarding
*/

const StepSchema = z.object({
  title: z.string(),
  description: z.string(),
  Content: z.function().args(z.any()).returns(z.any()),
});

type Step = z.infer<typeof StepSchema>;

const steps: Record<string, Step> = {
  createPassword: {
    title: 'Créer un nouveau mot de passe',
    description: 'Pour votre sécurité, veuillez créer un nouveau mot de passe',
    Content: ChangePassword,
  },
  uploadLogo: {
    title: 'Télécharger votre logo',
    description: 'Télécharger votre logo pour le personnaliser',
    Content: UploadLogo,
  },
  chooseBackground: {
    title: 'Choisir votre arrière plan',
    description: 'Choisir votre arrière plan pour le personnaliser ou télécharger le votre',
    Content: ChooseBackground,
  },
  chooseColors: {
    title: 'Choisir vos couleurs',
    description: 'Choisir vos couleurs pour le personnaliser',
    Content: ChangePassword,
  },
  chooseGifts: {
    title: 'Choisir vos cadeaux',
    description: 'Choisir vos cadeaux que vous allez offrir',
    Content: ChangePassword,
  },
  chooseActions: {
    title: 'Choisir vos actions',
    description: 'Choisir vos actions que les utilisateurs vont effectuer',
    Content: ChangePassword,
  },
  chooseNumberWinners: {
    title: 'Choisir le nombre de gagnants',
    description: 'Choisir le nombre de gagnants par mois',
    Content: ChangePassword,
  },
};

const UserIds = z.object({
  clerkId: z.string().optional(),
  sanityId: z.string().optional(),
});

const GameConfigSchema = z.object({
  user: z.string().optional(),
  logo: z.instanceof(File).optional(),
  background: z.instanceof(File).optional(),
  color: z.string().optional(),
  rewards: z.array(z.string()).optional(),
  numberWinners: z.number().optional(),
  secretCode: z.string().optional(),
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

const useOnboardingStore = create<Onboarding>((set) => ({
  step: steps.createPassword,
  userIds: {
    clerkId: undefined,
    sanityId: undefined,
  },
  gameConfig: {
    user: undefined,
    logo: undefined,
    background: undefined,
    color: undefined,
    rewards: undefined,
    numberWinners: undefined,
    secretCode: undefined,
  },
  setStep: (stepName: keyof typeof steps) => set({ step: steps[stepName] }),
  setUserIds: ({ clerkId, sanityId }: UserIdsProps) => set({ userIds: { clerkId, sanityId } }),
  setGameConfig: (params: Partial<z.infer<typeof GameConfigSchema>>) =>
    set((state) => ({ gameConfig: { ...state.gameConfig, ...params } })),
}));

export default useOnboardingStore;
