'use client';

import { Button, useToast } from '@/components/ui';
import { useOnboardingStore } from '@/store';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export default function ChooseColor() {
  const [color, setColor] = useState('#aabbcc');
  const { toast } = useToast();
  const { setGameConfig, setStep } = useOnboardingStore();

  const handleSave = function () {
    setGameConfig({ color });

    setStep('chooseGifts');

    toast({
      description: 'Couleur enregistrée',
    });
  };

  return (
    <div className="flex flex-col gap-5 items-start">
      <HexColorPicker color={color} onChange={setColor} />

      <Button onClick={handleSave}>Confirmer</Button>
    </div>
  );
}
