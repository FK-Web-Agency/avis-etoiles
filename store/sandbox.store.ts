import { z } from 'zod';
import { create } from 'zustand';

import ChooseActions from '@/components/shared/Onboarding/ChooseActions';
import ChooseNumberWinners from '@/components/shared/Onboarding/ChooseNumberWinners';
import ChooseRewards from '@/components/shared/Onboarding/ChooseRewards';
import ChooseSecretCode from '@/components/shared/Onboarding/ChooseSecretCode';
import GenerateQRCode from '@/components/shared/Onboarding/GenerateQRCode';
import UploadLogo from '@/components/shared/Onboarding/UploadLogo';

const StepSchema = z.object({
  title: z.string(),
  description: z.string(),
  Content: z.function().args(z.any()).returns(z.any()),
});

type Step = z.infer<typeof StepSchema>;

const steps: Record<string, Step> = {
  uploadLogo: {
    title: 'Télécharger votre logo',
    description: 'Télécharger votre logo pour le personnaliser',
    Content: UploadLogo,
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

const SandboxSchema = z.object({
  config: z.object({
    logo: z.any().optional(),
    rewards: z.array(z.string()).optional(),
    actions: z.array(z.object({ socialNetworkName: z.string(), value: z.string(), _key: z.string() })).optional(),
    numberWinners: z.object({ winners: z.number().optional(), attempts: z.number().optional() }).optional(),
    secretCode: z.string().optional(),
    qrCode: z.any().optional(),
    createdAt: z.date().optional(),
    seller: z
      .object({
        _type: z.string(),
        _ref: z.string(),
      })
      .optional(),
  }),
});

type SandboxProps = z.infer<typeof SandboxSchema>;

const useSandboxStore = create<SandboxProps>((set) => ({
  config: {},
}));
