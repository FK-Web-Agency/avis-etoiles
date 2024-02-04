'use client';

import { Button, Input, Label, useToast } from '@/components/ui';
import { useOnboardingStore } from '@/store';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export default function ChooseColor({ onSave, colorDb }: { onSave?: (color: string) => void; colorDb?: string}) {
  const { setGameConfig, setStep, gameConfig } = useOnboardingStore();
  const [color, setColor] = useState(gameConfig.color || '#aabbcc');
  const { toast } = useToast();

  const handleSave = function () {
    if (onSave) return onSave(color);

    setGameConfig({ color });

    setStep('chooseRewards');

    toast({
      description: 'Couleur enregistrée',
    });
  };





  return (
    <div className="flex flex-col gap-5 items-start">
      <HexColorPicker color={colorDb || color} onChange={setColor} />

      <div className="flex flex-col gap-1">
        <Label>HEX</Label>
        <Input value={colorDb || color} onChange={(e) => setColor(e.target.value)} />
      </div>

      <Button variant={'gradient'} onClick={handleSave}>
        Confirmer
      </Button>
    </div>
  );
}
