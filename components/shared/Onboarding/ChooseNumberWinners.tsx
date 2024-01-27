'use client';

import { z } from 'zod';

import { AutoForm, AutoFormSubmit, useToast } from '@/components/ui';
import { useOnboardingStore } from '@/store';

export default function ChooseNumberWinners() {
  const { gameConfig, setGameConfig, setStep } = useOnboardingStore();
  const { toast } = useToast();

  const ChooseNumberWinnersSchema = z.object({
    winners: z
      .string()
      .min(1)
      .describe('Nombre de gagnants')
      .default(gameConfig.numberWinners ? (String(gameConfig.numberWinners) as string) : ''),
  });

  type ChooseNumberWinnersSchemaType = z.infer<typeof ChooseNumberWinnersSchema>;

  const handleSubmit = function (values: ChooseNumberWinnersSchemaType) {
    if (!isNaN(Number(values.winners)) && Number(values.winners) > 0) {
      setGameConfig({ numberWinners: Number(values.winners) });

      setStep('chooseSecretCode');

      return toast({
        description: `Nombre de gagnants : ${values.winners} a bien été enregistré`,
      });
    }

    return toast({
      title: 'error',
      description: `Nombre de gagnants : ${values.winners} n'est pas un nombre valide`,
      variant: 'destructive',
    });
  };

  return (
    <div>
      <AutoForm onSubmit={handleSubmit} formSchema={ChooseNumberWinnersSchema}>
        <AutoFormSubmit>Confirmer</AutoFormSubmit>
      </AutoForm>
    </div>
  );
}
