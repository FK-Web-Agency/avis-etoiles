'use client';

import { Button, useToast } from '@/components/ui';
import { useOnboardingStore } from '@/store';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export default function ChooseColor() {
  const { setGameConfig, setStep, gameConfig } = useOnboardingStore();
  const [color, setColor] = useState(gameConfig.color || '#aabbcc');
  const { toast } = useToast();

  const handleSave = function () {
    setGameConfig({ color });

    setStep('chooseRewards');

    toast({
      description: 'Couleur enregistrée',
    });
  };

  return (
    <div className="flex flex-col gap-5 items-start">
      <HexColorPicker color={color} onChange={setColor} />

      <Button variant={"gradient"} onClick={handleSave}>Confirmer</Button>
    </div>
  );
}
