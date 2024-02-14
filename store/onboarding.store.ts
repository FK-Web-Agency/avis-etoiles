import ChangePassword from '@/components/shared/Onboarding/ChangePassword';
import ChooseActions from '@/components/shared/Onboarding/ChooseActions';
import ChooseBackground from '@/components/shared/Onboarding/ChooseBackground';
import ChooseColor from '@/components/shared/Onboarding/ChooseColor';
import ChooseNumberWinners from '@/components/shared/Onboarding/ChooseNumberWinners';
import ChooseRewards from '@/components/shared/Onboarding/ChooseRewards';
import ChooseSecretCode from '@/components/shared/Onboarding/ChooseSecretCode';
import GenerateQRCode from '@/components/shared/Onboarding/GenerateQRCode';
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
  chooseColor: {
    title: 'Choisir vos couleurs',
    description: 'Choisir une couleur pour le personnaliser',
    Content: ChooseColor,
  },
  chooseRewards: {
    title: 'Choisir vos cadeaux',
    description: 'Choisir vos cadeaux que vous allez offrir',
    Content: ChooseRewards,
  },
  chooseActions: {
    title: 'Choisir vos actions',
    description: 'Choisir vos actions que les utilisateurs vont effectuer',
    Content: ChooseActions,
  },
  chooseNumberWinners: {
    title: 'Choisir le nombre de gagnants',
    description: 'Choisir le nombre de gagnants par semaine',
    Content: ChooseNumberWinners,
  },
  chooseSecretCode: {
    title: 'Choisir votre code secret',
    description: 'Choisir votre code secret pour confirmer la récupération des cadeaux par les gagnants',
    Content: ChooseSecretCode,
  },
  generateQRCode: {
    title: 'Générer votre QR Code',
    description: 'Générer votre QR Code pour le mettre sur votre site',
    Content: GenerateQRCode,
  },
};

const UserIds = z.object({
  clerkId: z.string().optional(),
  sanityId: z.string().optional(),
});

const GameConfigSchema = z.object({
  user: z
    .object({
      _type: z.string(),
      _ref: z.string(),
    })
    .optional(),
  logo: z.any().optional(),
  background: z.any().optional(),
  color: z.string().optional(),
  actions: z.array(z.object({ socialNetworkName: z.string(), value: z.string(), _key: z.string() })).optional(),
  rewards: z.array(z.string()).optional(),
  numberWinners: z.object({ winners: z.number().optional(), attempts: z.number().optional() }).optional(),
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

const useOnboardingStore = create<Onboarding>((set) => ({
  step: steps.uploadLogo,
  userIds: {
    clerkId: undefined,
    sanityId: undefined,
  },
  gameConfig: {
    user: undefined,
    logo: undefined,
    background: undefined,
    color: undefined,
    actions: undefined,
    rewards: undefined,
    numberWinners: undefined,
    secretCode: undefined,
    qrCode: undefined,
    easel: undefined,
  },
  setStep: (stepName: keyof typeof steps) => set({ step: steps[stepName] }),
  setUserIds: ({ clerkId, sanityId }: UserIdsProps) => set({ userIds: { clerkId, sanityId } }),
  setGameConfig: (params: Partial<z.infer<typeof GameConfigSchema>>) =>
    set((state) => ({ gameConfig: { ...state.gameConfig, ...params } })),
}));

export default useOnboardingStore;
