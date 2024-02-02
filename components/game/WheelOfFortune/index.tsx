import { useMemo } from 'react';
import useWheelOfFortune from './useWheelOfFortune';
import { Button } from '@/components/ui';
import { classNames, colorIsLight } from '@/helper';

type OriginalObject = {
  id: string;
  option: string;
  text: string;
};

type TransformedObject = {
  label: string;
  value: string;
};

const WheelOfFortune = ({ options, onWinning, color }: any) => {
  function transformArray(array: OriginalObject[]): TransformedObject[] {
    return array?.map((obj) => ({
      label: obj.option,
      value: obj.option,
    }));
  }

  const transformedArray = useMemo(() => transformArray(options), []);

  const { wheelRef, spinWheel, isSpinning } = useWheelOfFortune({
    options: transformedArray,
    onWinning,
    color,
  });

  return (
    <>
      <div className="wheel-container" ref={wheelRef}></div>
      <div className="spin-btn-wrapper">
        <Button
          style={{
            backgroundColor: color,
            borderColor: color,
          }}
          className="mt-5 w-full py-8"
          onClick={spinWheel}
          disabled={isSpinning}>
          <span className={classNames(colorIsLight(color) ? 'text-black' : 'text-white')}>LANCER LA ROUE</span>
        </Button>
      </div>
    </>
  );
};

export default WheelOfFortune;
