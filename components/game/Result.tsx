'use client';

import Confetti from 'react-confetti';
import React, { useEffect, useState } from 'react';
import { useGameStore } from '@/store';
import { useWindowSize } from '@uidotdev/usehooks';
import { SandboxWinnerForm, WinnerForm } from '../forms';
import { classNames, colorIsLight, hexToRgb } from '@/helper';

export default function Result({
  config,
  id,
  sandbox,
  companyName,
}: {
  config: any;
  id?: string;
  sandbox?: boolean;
  companyName?: string;
}) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [winnerFormCompleted, setWinnerFormCompleted] = useState(false);
  const size = useWindowSize();
  const { result } = useGameStore();

  useEffect(() => {
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  }, []);

  const color = hexToRgb(config?.color!);

  const formCompleted = () => setWinnerFormCompleted(true);

  return (
    <div
      style={{
        backgroundColor: `rgba(${color?.r}, ${color?.g}, ${color?.b}, 0.4)`,
        borderColor: `rgba(${color?.r}, ${color?.g}, ${color?.b}, 0.7)`,
      }}
      className={`glassmorphism mb-10`}>
      {result !== 'Perdu' ? (
        <>
          {showConfetti && (
            <Confetti className="z-[100]" width={size?.width!} height={size?.height!} color={config?.color} />
          )}
          {winnerFormCompleted && result !== 'Perdu' ? (
            <p className={classNames('p-semibold-20', colorIsLight(config?.color) ? 'text-gray-900' : 'text-white')}>
              Merci pour votre participation, à bientôt !
            </p>
          ) : (
            <div className="z-10">
              <h1 className="p-semibold-18">Félicitation, vous avez gagné 1 {result} </h1>
              <>
                <p className="p-regular-14 invert my-4">
                  Veuillez remplir le formulaire ci-dessous pour recevoir votre lot par email, n'oubliez pas de vérifier
                  vos spams
                </p>
                {sandbox ? (
                  <SandboxWinnerForm
                    color={config?.color}
                    id={id!}
                    formCompleted={formCompleted}
                    companyName={companyName}
                  />
                ) : (
                  <WinnerForm color={config?.color} id={id!} formCompleted={formCompleted} />
                )}
              </>
            </div>
          )}
        </>
      ) : (
        <>
          <h1 className="p-semibold-18 text-center">Oups.. Vous avez perdu 😞</h1>
        </>
      )}
    </div>
  );
}
