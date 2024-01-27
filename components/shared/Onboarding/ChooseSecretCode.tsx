'use client';

import { z } from 'zod';

import { AutoForm, AutoFormSubmit, useToast } from '@/components/ui';
import { useOnboardingStore } from '@/store';

export default function ChooseSecretCode() {
  const { gameConfig, setGameConfig, setStep } = useOnboardingStore();
  const { toast } = useToast();

  const ChooseSecretCodeSchema = z.object({
    secretCode: z
      .string()
      .min(4)
      .max(6)
      .describe('Code secret de 4 à 6 caractères')
      .default(gameConfig.secretCode as string),
  });

  type ChooseSecretCodeSchemaType = z.infer<typeof ChooseSecretCodeSchema>;

  const onSubmit = async function (values: ChooseSecretCodeSchemaType) {
    setGameConfig({ secretCode: values.secretCode });

    toast({
      description: 'Code secret enregistré',
    });

    setStep('generateQRCode');
  };

  return (
    <div>
      <AutoForm onSubmit={onSubmit} formSchema={ChooseSecretCodeSchema}>
        <AutoFormSubmit>Valider</AutoFormSubmit>
      </AutoForm>
    </div>
  );
}
