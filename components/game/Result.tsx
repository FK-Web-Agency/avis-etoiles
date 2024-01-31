'use client';

import Confetti from 'react-confetti';
import React, { useEffect, useState } from 'react';
import { useGameStore } from '@/store';
import { useWindowSize } from '@uidotdev/usehooks';
import { WinnerForm } from '../forms';
import { classNames, hexToRgb } from '@/helper';

export default function Result({ config, id }: { config: any; id: string }) {
  const [showConfetti, setShowConfetti] = useState(true);
  const size = useWindowSize();
  const { result } = useGameStore();

  useEffect(() => {
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  }, []);
  const color = hexToRgb(config?.color!);

  return (
    <div
      style={{
        backgroundColor: `rgba(${color?.r}, ${color?.g}, ${color?.b}, 0.4)`,
        borderColor: `rgba(${color?.r}, ${color?.g}, ${color?.b}, 0.7)`,
      }}
      className={`glassmorphism mb-10`}>
      {result !== 'Perdu' ? (
        <>
          {showConfetti && <Confetti className="z-[100]" width={size?.width!} height={size?.height!} color={config?.color} />}
          <div className='z-10'>
            <h1 className="p-semibold-18">Félicitation, vous avez gagné 1 {result} </h1>
            <p className="p-regular-14 invert my-4">
              Veuillez remplir le formulaire ci-dessous pour recevoir votre lot par email, n'oubliez pas de vérifier vos
              spams
            </p>
            <WinnerForm color={config?.color} id={id} />
          </div>
        </>
      ) : (
        <>
          <h1 className="p-semibold-18 text-center">Oups.. Vous avez perdu 😞</h1>
        </>
      )}
    </div>
  );
}
