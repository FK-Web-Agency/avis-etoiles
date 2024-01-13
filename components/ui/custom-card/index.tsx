'use client';

import { type MotionValue, motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { PropsWithChildren, useId } from 'react';
import GridPattern from './GridPattern';
import CardPattern from './Pattern';

interface Resource {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  pattern: Omit<React.ComponentPropsWithoutRef<typeof GridPattern>, 'width' | 'height' | 'x'>;
}

export function ContainerCard({
  children,
  className,
}: PropsWithChildren<{ item?: any; className?: string }>) {
  const id = useId();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      key={id}
      onMouseMove={onMouseMove}
      className={`${className} group relative flex rounded-2xl transition-shadow hover:shadow-md  bg-white/2.5 hover:shadow-black/5`}>
      <CardPattern mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-white/20" />
      {children}
    </div>
  );
}

export default function CustomCard({ children }: PropsWithChildren) {
  return (
    <ContainerCard>
      <div className="relative rounded-2xl px-4 pb-6 pt-10 cursor-default flex-center flex-col flex-align-start space-y-4">{children}</div>
    </ContainerCard>
  );
}

CustomCard.Title = function CardTitle({ children }: PropsWithChildren) {
  return <h5 className="h5-bold mb-5">{children}</h5>;
};

CustomCard.Description = function CardDescription({ children }: PropsWithChildren) {
  return <p className="p-light-16">{children}</p>;
};

CustomCard.Icon = function CardIcon({ children }: PropsWithChildren) {
  return (
    <div
      className={`flex h-10 w-10 p-2 items-center justify-center rounded-full  ring-1  backdrop-blur-[2px] transition duration-300  bg-[#ffffff13] ring-[#ffffff26]
          group-hover:ring-zinc-900/25 group-hover:bg-yellow-300/20 group-hover:ring-yellow-400
      `}>
      {children}
    </div>
  );
};
