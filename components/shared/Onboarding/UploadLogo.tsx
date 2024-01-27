'use client';

import React, { useState } from 'react';
import { Button, Input, Label, useToast } from '@/components/ui';
import { client } from '@/sanity/lib';
import { useOnboardingStore } from '@/store';

export default function UploadLogo() {
  const [file, setFile] = useState<null | File>(null);
  const { toast } = useToast();
  const { setGameConfig, setStep } = useOnboardingStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => e?.target.files && setFile(e?.target?.files[0]);

  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) return;
    try {
      setGameConfig({ logo: file });

      toast({
        description: 'Votre logo a été mis à jour',
      });

      setStep('chooseBackground');
    } catch (error: any) {
      console.log(error);

      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <Label>
            Logo
            <span className="text-red-600">*</span>
          </Label>
          <Input onChange={handleChange} type="file" name="logo" accept="image/*" required />
        </div>

        <Button variant={'gradient'} type="submit" className="mt-8">
          Enregistré
        </Button>
      </form>
    </div>
  );
}
