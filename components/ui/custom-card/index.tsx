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
      <div className="relative rounded-2xl px-4 pb-4 pt-8 cursor-default">{children}</div>
    </ContainerCard>
  );
}

CustomCard.Title = function CardTitle({ children }: PropsWithChildren) {
  return <h3 className="h3-regular mb-5">{children}</h3>;
};

CustomCard.Description = function CardDescription({ children }: PropsWithChildren) {
  return <div>{children}</div>;
};

CustomCard.Icon = function CardIcon({ children }: PropsWithChildren) {
  return <div>{children}</div>;
};
