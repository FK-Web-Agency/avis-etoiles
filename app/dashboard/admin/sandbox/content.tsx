'use client';

import { useRef, useState } from 'react';
import bcrypt from 'bcryptjs-react';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  useToast,
} from '@/components/ui';
import { useOnboardingStore } from '@/store';
import { Icons } from '@/components/shared';
import { useCreate } from '@refinedev/core';
import { uploadFileToSanity } from '@/sanity/lib/helper';
import sendEmail from '@/lib/actions/resend.actions';
import { urlForImage } from '@/sanity/lib';

export default function Content() {
  const [previousNavigation, setPreviousNavigation] = useState({
    status: false,
    step: '',
  });
  const { mutate } = useCreate();

  const [loading, setLoading] = useState(false);
  const nextButtonRef = useRef(null);
  const { toast } = useToast();

  const { step, gameConfig, userIds, buyer, setStep } = useOnboardingStore();

  // Components for each step
  const Content = step?.Content;

  const handleNextStep = function () {
    if (previousNavigation.step === step.title) {
      setPreviousNavigation({ status: false, step: '' });

      return;
    }

    setPreviousNavigation({ status: true, step: step.title });

    switch (step.title) {
      case 'Télécharger votre logo':
        setStep('chooseBackground');
        setPreviousNavigation({ status: true, step: 'Choisir vos cadeaux' });
        break;

      case 'Choisir vos cadeaux':
        setStep('chooseActions');
        setPreviousNavigation({ status: true, step: 'Choisir vos actions' });
        break;

      case 'Choisir vos actions':
        setStep('chooseNumberWinners');
        setPreviousNavigation({ status: true, step: 'Choisir le nombre de gagnants' });
        break;

      case 'Choisir le nombre de gagnants':
        setStep('chooseSecretCode');
        setPreviousNavigation({ status: true, step: 'Choisir votre code secret' });
        break;

      default:
        setStep('generateQRCode');
        setPreviousNavigation({ status: true, step: 'Choisir votre code secret' });
        break;
    }
  };

  const handlePreviousStep = function () {
    setPreviousNavigation({ status: true, step: step.title });

    switch (step.title) {
      case 'Générer votre QR Code':
        setStep('chooseSecretCode');
        break;

      case 'Choisir votre code secret':
        setStep('chooseNumberWinners');
        break;

      case 'Choisir le nombre de gagnants':
        setStep('chooseActions');
        break;

      case 'Choisir vos actions':
        setStep('chooseRewards');
        break;

      default:
        setStep('uploadLogo');
        break;
    }
  };

  const handleFinish = async function () {
    setLoading(true);

    const copyGameConfig: any = { ...gameConfig };

    const fileProperties: string[] = [];

    // Parcourir toutes les propriétés de l'objet "step" et vérifier si elles sont de type "file"
    for (const property in copyGameConfig) {
      // Vérifier si la propriété est bien une propriété de l'objet et si elle est de type "file"
      // @ts-ignore
      if (copyGameConfig.hasOwnProperty(property) && copyGameConfig[property] instanceof File) {
        fileProperties.push(property);
      }
    }

    for (const property of fileProperties) {
      // @ts-ignore
      const doc = await uploadFileToSanity(copyGameConfig[property] as File);

      copyGameConfig[property] = doc;
    }
    const seller = {
      _type: 'reference',
      _ref: userIds?.sanityId as string,
    };

    copyGameConfig.seller = seller;

    const salt = await bcrypt.genSalt(10);
    copyGameConfig.secretCode = await bcrypt.hash(copyGameConfig.secretCode, salt);

    const createdAt = new Date().toISOString();
    try {
      // const { status, message, gameConfig: config } = await createGameConfig({ ...copyGameConfig, _type: 'gameConfig' });
      mutate(
        { resource: 'sandbox', values: { ...copyGameConfig, buyer, createdAt } },
        {
          async onSuccess() {
            await sendEmail({
              email: buyer?.email,
              subject: 'Votre jeu de la roulette - Avis Étoiles',
              emailTemplate: 'sandbox-qrcode',
              QRCode: urlForImage(copyGameConfig.qrCode),
            });

            toast({
              title: 'Succès',
              description: 'Votre jeu de la roulette a été configuré avec succès',
            });
          },
          onError(error: any) {
            toast({
              title: 'Erreur',
              description: error.message,
            });
          },
        }
      );
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
      });
    }

    setLoading(false);
  };

  return (
    <main className="wrapper flex flex-col gap-8">
      <div>
        <h1 className="h4-medium text-white mb-4">Création Jeu de test</h1>
        <p>
          Créer un jeu de test pour un client le Qrcode sera généré et envoyé par mail au client. Il sera valide pour
          24H
        </p>
      </div>
      <section>
        <Card>
          <CardHeader>
            <CardTitle> {step?.title} </CardTitle>
            <CardDescription> {step?.description} </CardDescription>
          </CardHeader>
          <CardContent className="min-h-60">
            {step.title.includes('QR Code') ? <Content sandbox /> : <Content />}
          </CardContent>
          <CardFooter className="border-t border-gay-600 pt-5">
            <div className="flex justify-between gap-4">
              <Button
                disabled={step.title.includes('mot de passe') || step.title.includes('logo')}
                variant="secondary"
                onClick={handlePreviousStep}>
                Précédent
              </Button>
              {step.title.includes('QR Code') ? (
                <Button disabled={!gameConfig?.qrCode || loading} onClick={handleFinish} variant="gradient">
                  {loading && <Icons.Spinner className="animate-spin mr-2 w-4 h-4" />}
                  Terminer
                </Button>
              ) : previousNavigation.status && previousNavigation.step !== step.title ? (
                <Button ref={nextButtonRef} variant="secondary" onClick={handleNextStep}>
                  Suivant
                </Button>
              ) : undefined}
            </div>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
