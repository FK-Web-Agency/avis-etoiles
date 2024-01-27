'use client';

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import { useOnboardingStore } from '@/store';

export default function Onboarding({ user }: { user: any }) {
  const { step, gameConfig, setStep } = useOnboardingStore();

  // Components for each step
  const Content = step?.Content;

  const handleNextStep = function () {
    switch (step.title) {
      case 'Créer un nouveau mot de passe':
        setStep('uploadLogo');
        break;

      case 'Télécharger votre logo':
        setStep('chooseBackground');
        break;

      case 'Choisir votre arrière plan':
        setStep('chooseColor');
        break;

      case 'Choisir vos couleurs':
        setStep('chooseRewards');
        break;

      case 'Choisir vos cadeaux':
        setStep('chooseActions');
        break;
      default:
        setStep('chooseNumberWinners');
        break;
    }
  };

  const handlePreviousStep = function () {
    switch (step.title) {
      case 'Générer votre QR Code':
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
          <CardFooter>
            <div className="flex justify-between gap-4">
              <Button
                disabled={step.title.includes('mot de passe') || step.title.includes('logo')}
                variant="secondary"
                onClick={handlePreviousStep}>
                Précédent
              </Button>
              {step.title.includes('QR Code') ? (
                <Button disabled={!gameConfig?.qrCode} variant="gradient">Terminer</Button>
              ) : (
                <Button disabled={step.title.includes('gagnants')} variant="secondary" onClick={handleNextStep}>
                  Suivant
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
