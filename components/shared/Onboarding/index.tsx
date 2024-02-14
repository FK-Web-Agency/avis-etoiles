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
import { createAnalytics, uploadFileToSanity } from '@/sanity/lib/helper';
import { useOnboardingStore } from '@/store';
import { Icons } from '@/components/shared';
import { useCreate } from '@refinedev/core';

export default function Onboarding({ user }: { user: any }) {
  const [previousNavigation, setPreviousNavigation] = useState({
    status: false,
    step: '',
  });
  const { mutate } = useCreate();

  const [loading, setLoading] = useState(false);
  const nextButtonRef = useRef(null);
  const { toast } = useToast();

  const { step, gameConfig, userIds, setStep } = useOnboardingStore();
console.log(userIds);

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

/*       case 'Choisir votre arrière plan':
        setStep('chooseColor');
        setPreviousNavigation({ status: true, step: 'Choisir vos couleurs' });
        break;

      case 'Choisir vos couleurs':
        setStep('chooseRewards');
        setPreviousNavigation({ status: true, step: 'Choisir vos cadeaux' });
        break;
 */
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

/*       case 'Choisir vos cadeaux':
        setStep('chooseColor');
        break;

      case 'Choisir vos couleurs':
        setStep('chooseBackground');
        break; */

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

    const user = {
      _type: 'reference',
      _ref: userIds?.sanityId as string,
    };

    copyGameConfig.user = user;

    const salt = await bcrypt.genSalt(10);
    copyGameConfig.secretCode = await bcrypt.hash(copyGameConfig.secretCode, salt);
    try {
      // const { status, message, gameConfig: config } = await createGameConfig({ ...copyGameConfig, _type: 'gameConfig' });
      mutate({ resource: 'gameConfig', values: { ...copyGameConfig } });
      // Create analytics
      mutate({ resource: 'gameAnalytics', values: { user, analytics: createAnalytics() } });
      toast({
        title: 'Succès',
        description: 'Votre jeu de la roulette a été configuré avec succès',
      });
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
        <h1 className="h4-medium text-white mb-4">
          Bienvenue <span className="capitalize">{user?.firstName}</span>
        </h1>
        <p>
          pour votre première connexion il faut configurer votre espace personnel et personnalisé votre jeu de la
          roulette
        </p>
      </div>
      <section>
        <Card>
          <CardHeader>
            <CardTitle> {step?.title} </CardTitle>
            <CardDescription> {step?.description} </CardDescription>
          </CardHeader>
          <CardContent className="min-h-60">
            <Content />
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
