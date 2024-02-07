'use client';

import React, { useState } from 'react';
import { Button, Input, Label, useToast } from '@/components/ui';
import { Icons } from '@/components/shared';
import { useOnboardingStore } from '@/store';

export default function ChooseRewards({
  onSave,
  rewardsDb,
}: {
  onSave?: (rewards: string[]) => void;
  rewardsDb?: string[];
}) {
  const { setGameConfig, setStep, gameConfig } = useOnboardingStore();
  const [textEntered, setTextEntered] = useState('');
  const [rewards, setRewards] = useState<string[]>(gameConfig?.rewards || rewardsDb || []);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTextEntered(e.target.value);

  // Add a reward to the list
  const handleAddReward = function () {
    if (textEntered === '')
      return toast({
        title: 'Erreur',
        description: 'Veuillez entrer une récompense',
        variant: 'destructive',
      });

    setRewards([...rewards, textEntered]);
    setTextEntered('');
  };

  // Edit a reward from the list
  const handleEditReward = (reward: string) => {
    const newReward = prompt('Entrez la récompense');

    if (!newReward) {
      return toast({
        title: 'Erreur',
        description: 'Veuillez entrer une récompense',
        variant: 'destructive',
      });
    }

    const index = rewards.findIndex((r) => r === reward);
    setRewards((prev) => prev.splice(index, 1, newReward));
  };

  // Remove a reward from the list
  const handleRemoveReward = (reward: string) => setRewards((prev) => prev.filter((r) => r !== reward));

  // Submit the rewards
  const handleSubmit = function () {
    if (onSave) return onSave(rewards);

    setGameConfig({ ...gameConfig, rewards });

    toast({
      description: 'Les récompenses ont été enregistrées',
    });

    setStep('chooseActions');
  };

  return (
    <div className="flex flex-col  gap-5">
      <div>
        {rewards.length === 0 ? (
          <span className="p-semibold-14">Aucune Récompense</span>
        ) : (
          <div className="flex flex-col gap-5">
            <p>Choississez au maximum 6 récompenses</p>
            {rewards.map((reward) => (
              <div
                className="bg-gray-900 text-slate-100 p-2 shadow-lg rounded-lg flex items-center justify-between"
                key={reward}>
                <span className="capitalize">{reward}</span>

                <div className="flex items-center gap-4">
                  <Button variant={'secondary'} onClick={() => handleEditReward(reward)}>
                    <Icons.Edit className="w-4 h-4" />
                  </Button>

                  <Button variant={'secondary'} onClick={() => handleRemoveReward(reward)}>
                    <Icons.Delete className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <Label>Récompense</Label>
        <Input
          disabled={rewards?.length === 6}
          type="text"
          value={textEntered}
          onChange={handleChange}
          placeholder="Choissir une récompense..."
        />
      </div>

      <div>
        <div className="flex items-center gap-4 mb-4">
          <Button disabled={!textEntered || rewards?.length === 6} variant="secondary" onClick={handleAddReward}>
            Ajouter
          </Button>
          <Button
            className="flex items-center gap-2"
            disabled={rewards.length === 0}
            variant={'destructive'}
            onClick={() => setRewards([])}>
            <Icons.Delete className="w-4 h-4" />
            Tout supprimer
          </Button>
        </div>

        <Button onClick={handleSubmit} disabled={rewards.length === 0} variant={'gradient'}>
          Confirmer
        </Button>
      </div>
    </div>
  );
}
