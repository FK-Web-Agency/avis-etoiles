// Import dependencies
import Link from 'next/link';
import { BaseRecord, useList } from '@refinedev/core';

import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui';
import { classNames, colorIsLight, hexToRgb } from '@/helper';
import { useGameStore } from '@/store';
import { GameStep } from '@/store/game.store';
import { Icons } from '../shared';

// Define the Starter component
export default function Starter({ config }: { config: BaseRecord | undefined }) {
  // Get necessary data and functions from the game store
  const { currentAction, gameStep, setGameStep, userLocalStorage } = useGameStore();
  const [userHistory, saveUserHistory] = userLocalStorage();

  // Fetch game data from the API
  const { data } = useList({
    resource: 'game',
  });

  // Get the content from the fetched data
  const content = data?.data[0];

  // Get the Google Place ID from the config
  const googlePlaceId = config?.actions?.find((action: any) => action.socialNetworkName === 'google')?.value;

  // Determine the URL based on the current action
  const url =
    currentAction?.title === 'google'
      ? `https://search.google.com/local/reviews?placeid=${googlePlaceId}`
      : config?.actions?.find((action: any) => action.socialNetworkName === currentAction?.title)?.value;

  // Convert the color from hex to RGB
  const color = hexToRgb(config?.color!);

  // Handle the user action
  const handleAction = function () {
    // Save the user's action history
    const user = {
      lastGamePlayed: new Date(),
      actions: userHistory ? [...userHistory?.actions!, currentAction?.title] : [currentAction?.title],
    };
    saveUserHistory(user);

    // Set the game step to "launchWheel"
    setGameStep(GameStep.launchWheel);
  };

  if (!url)
    return (
      <div className="h-screen flex-center">
        <h1>Plus d'action à faire</h1>
        <p>Merci de votre fidélité, il n'y a plus d'action</p>
      </div>
    );

  // Render the Starter component
  return (
    <section>
      <div
        style={{
          backgroundColor: `rgba(${color?.r}, ${color?.g}, ${color?.b}, 0.4)`,
          borderColor: `rgba(${color?.r}, ${color?.g}, ${color?.b}, 0.7)`,
        }}
        className={`glassmorphism`}>
        <h1 className="h3-bold text-center invert">{content?.starter_section?.title}</h1>

        <ul className="mt-8 font-mono flex flex-col space-y-8">
          {content?.starter_section?.procedure?.map((item: string, index: number) => (
            <li key={index} className="flex items-start space-x-5">
              <span className="text-3xl animate-wiggle animate-infinite animate-duration-700">🎁</span>
              <span className="block p-medium-16 invert">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Render the button if there is a current action */}
      {currentAction && (
        <Drawer>
          <DrawerTrigger className={`w-full mt-8`}>
            <Button style={{ backgroundColor: config?.color }} className=" py-8 w-full">
              <>
                <currentAction.Icon className="mr-2 h-6 w-6" />
                <span
                  className={classNames('p-semibold-18', colorIsLight(config?.color) ? 'text-black' : 'text-white')}>
                  {currentAction?.title === 'google' ? 'Donnez un avis ' : "S'abonner à "} {currentAction?.title}
                </span>
              </>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Likez nous</DrawerTitle>
              <DrawerDescription>
                {/* TODO - Ajouter pour instagram et facebook */}
                {currentAction?.title === 'google' && (
                  <ul className="text-left flex flex-col items-center gap-4">
                    <li className="flex items-start space-x-5">
                      <span className="text-3xl animate-wiggle animate-infinite animate-duration-700">🎁</span>
                      <span className="block p-medium-16 invert">
                        Vous allez être redirigé vers votre page "google"{' '}
                      </span>
                    </li>

                    <li className="flex items-start space-x-5">
                      <span className="text-3xl animate-wiggle animate-infinite animate-duration-700">🎁</span>
                      <span className="block p-medium-16 invert">
                        Laissez-nous un avis, votre avis n'aura pas d'impact sur le jeu
                      </span>
                    </li>

                    <li className="flex items-start space-x-5">
                      <span className="text-3xl animate-wiggle animate-infinite animate-duration-700">🎁</span>
                      <span className="block p-medium-16 invert">
                        cliquez sur cette icone <span className="uppercase font-bold">en bas à droite</span>
                      </span>
                      <Icons.Copy className="w-4 h-4" />
                    </li>
                  </ul>
                )}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>
                <Link href={url} onClick={handleAction} target="_blank">
                  Continuer
                </Link>
              </Button>
              <DrawerClose className="w-full">
                <Button className="w-full" variant="outline">
                  Annuler
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </section>
  );
}
