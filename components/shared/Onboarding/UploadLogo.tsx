'use client';

import React, { useState } from 'react';
import { Image as ImageSanity } from 'sanity';
import { Button, Input, Label, useToast } from '@/components/ui';
import { useOnboardingStore } from '@/store';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib';

type UploadLogoProps = {
  onSave?: (file: File) => void;
  logo?: ImageSanity;
};

export default function UploadLogo({ onSave, logo }: UploadLogoProps) {
  const [file, setFile] = useState<null | File>(null);
  const { toast } = useToast();
  const { setGameConfig, setStep } = useOnboardingStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => e?.target.files && setFile(e?.target?.files[0]);

  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) return;
    try {
      if (onSave) return onSave(file);
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
      {logo && (
        <div className="mb-8">
          <p>Logo actuel</p>
          <Image
            className="w-56 h-56 object-cover shadow-lg"
            src={file ? URL.createObjectURL(file) : urlForImage(logo)}
            alt="Logo"
            width={128}
            height={128}
          />
        </div>
      )}
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
