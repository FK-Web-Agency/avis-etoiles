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
      .default(gameConfig.numberWinners?.winners ? (String(gameConfig.numberWinners?.winners) as string) : ''),
    attempts: z
      .string()
      .min(1)
      .describe('Sur combien de tentatives')
      .default(gameConfig.numberWinners?.attempts ? (String(gameConfig.numberWinners?.attempts) as string) : ''),
  });

  type ChooseNumberWinnersSchemaType = z.infer<typeof ChooseNumberWinnersSchema>;

  const handleSubmit = function (values: ChooseNumberWinnersSchemaType) {
    if (
      !isNaN(Number(values.winners)) &&
      Number(values.winners) > 0 &&
      !isNaN(Number(values.attempts)) &&
      Number(values.attempts) > 0
    ) {
      if (Number(values.winners) > Number(values.attempts))
        return toast({
          title: 'error',
          description: `Nombre de gagnants : ${values.winners} ne peut pas être supérieur à ${values.attempts}`,
          variant: 'destructive',
        });

      setGameConfig({ numberWinners: { winners: Number(values.winners), attempts: Number(values.attempts) } });

      setStep('chooseSecretCode');

      return toast({
        description: `Nombre de gagnants : ${values.winners}/${values.attempts} a bien été enregistré`,
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
