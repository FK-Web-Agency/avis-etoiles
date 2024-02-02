// Import dependencies
import Link from 'next/link';
import { BaseRecord, useList } from '@refinedev/core';

import { Button } from '@/components/ui';
import { classNames, colorIsLight, hexToRgb } from '@/helper';
import { useGameStore } from '@/store';
import { GameStep } from '@/store/game.store';

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
  console.log(gameStep);

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
        <Button asChild style={{ backgroundColor: config?.color }} className={`w-full mt-8 py-8`}>
          <Link href={url} onClick={handleAction} target="_blank">
            <currentAction.Icon className="mr-2 h-6 w-6" />
            <span className={classNames('p-semibold-18', colorIsLight(config?.color) ? 'text-black' : 'text-white')}>
              {currentAction?.title === 'google' ? 'Donnez un avis ' : "S'abonner à "} {currentAction?.title}
            </span>
          </Link>
        </Button>
      )}
    </section>
  );
}
