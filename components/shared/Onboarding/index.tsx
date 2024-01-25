'use client';

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import { useOnboardingStore } from '@/store';

export default function Onboarding({ user }: { user: any }) {
  const { step, setStep } = useOnboardingStore();

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
        setStep('chooseGifts');
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
      case 'Choisir le nombre de gagnants':
        setStep('chooseActions');
        break;

      case 'Choisir vos actions':
        setStep('chooseGifts');
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
          <CardContent className='min-h-60'>
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

              <Button disabled={step.title.includes('gagnants')} variant="secondary" onClick={handleNextStep}>
                Suivant
              </Button>
            </div>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
