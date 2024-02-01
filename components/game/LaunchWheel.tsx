import React from 'react';
import WheelOfFortune from './WheelOfFortune';
import { v4 as uuidv4 } from 'uuid';
import { hexToRgb } from '@/helper';
import { useUpdate } from '@refinedev/core';
import { useGameStore } from '@/store';
import { GameStep } from '@/store/game.store';

export default function LaunchWheel({
  config,
  analytics,
  thisYearAnalytics,
  thisMonthAnalytics,
}: {
  config: any;
  analytics: any;
  thisYearAnalytics: any;
  thisMonthAnalytics: any;
}) {
  const { currentAction, setResult, setGameStep } = useGameStore();
  const { mutate } = useUpdate();

  // Convert the color from hex to RGB
  const color = hexToRgb(config?.color!);

  const data = config?.rewards.flatMap((item: any) => [
    {
      id: uuidv4(),
      text: item, // Capitalize the first letter
    },
    {
      id: uuidv4(),
      text: 'Perdu',
      lost: true,
    },
  ]);

  while (data.length < 6) {
    data.push({
      id: uuidv4(),
      text: 'Perdu',
      lost: true,
    });
  }

  const rewards: any = data.map((item: any) => {
    return {
      ...item,
      completeOption: item.text,
      option: item.text.length >= 30 ? item.text.substring(0, 15).trimEnd() + '...' : item.text,
    };
  });

  function handleSpinStop(result: any) {
    if (thisMonthAnalytics) {
      thisMonthAnalytics[currentAction?.title!] += 1;
    }

    mutate({
      resource: 'gameAnalytics',
      values: {
        analytics: analytics.analytics,
      },
      id: analytics?._id,
    });

    setResult(result?.value);
    setTimeout(() => {
      setGameStep(GameStep.result);
    }, 900);
    console.log('Spin Stopped', result);
  }
  return (
    <div>
      <div
        style={{
          backgroundColor: `rgba(${color?.r}, ${color?.g}, ${color?.b}, 0.4)`,
          borderColor: `rgba(${color?.r}, ${color?.g}, ${color?.b}, 0.7)`,
        }}
        className={`glassmorphism`}>
        <h1 className="p-semibold-20 text-center break-all invert">Lancer la roue et Découvrez votre cadeau</h1>
      </div>
      <WheelOfFortune options={rewards} onWinning={handleSpinStop} color={config?.color} />
    </div>
  );
}