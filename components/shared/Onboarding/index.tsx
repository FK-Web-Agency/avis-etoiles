'use client';

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import { useOnboardingStore } from '@/store';
import { useRef, useState } from 'react';

export default function Onboarding({ user }: { user: any }) {
  const [previousNavigation, setPreviousNavigation] = useState({
    status: false,
    step: '',
  });
  const nextButtonRef = useRef(null);

  const { step, gameConfig, setStep } = useOnboardingStore();

  // Components for each step
  const Content = step?.Content;

  const handleNextStep = function () {
    console.log(step);

    if (previousNavigation.step === step.title) {
      setPreviousNavigation({ status: false, step: '' });
      console.log(nextButtonRef.current);

      return;
    }

    setPreviousNavigation({ status: true, step: step.title });

    switch (step.title) {
      case 'Télécharger votre logo':
        setStep('chooseBackground');
        setPreviousNavigation({ status: true, step: 'Choisir votre arrière plan' });
        break;

      case 'Choisir votre arrière plan':
        setStep('chooseColor');
        setPreviousNavigation({ status: true, step: 'Choisir vos couleurs' });
        break;

      case 'Choisir vos couleurs':
        setStep('chooseRewards');
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

      case 'Choisir vos cadeaux':
        setStep('chooseColor');
        break;

      case 'Choisir vos couleurs':
        setStep('chooseBackground');
        break;

      default:
        setStep('uploadLogo');
        break;
    }
  };

  return (
    <main className="wrapper flex flex-col gap-8">
      <div>
        <h1 className="h4-medium text-white mb-4">
          Bienvenu <span className="capitalize">{user?.firstName}</span>
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
                <Button disabled={!gameConfig?.qrCode} variant="gradient">
                  Terminer
                </Button>
              ) : previousNavigation.status && previousNavigation.step !== step.title ? (
                <Button
                  ref={nextButtonRef}
                  variant="secondary"
                  onClick={handleNextStep}>
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
