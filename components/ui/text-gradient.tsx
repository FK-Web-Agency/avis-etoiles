import React from 'react';
import { z } from 'zod';

const textGradientSchema = z.object({
  segments: z.array(
    z.object({
      text: z.string(),
      gradient: z.boolean(),
    })
  ),
  className: z.string().optional(),
  component: z.string().optional(),
});

type TextGradientProps = z.infer<typeof textGradientSchema>;

export default function TextGradient({ segments, className, component }: TextGradientProps) {
  const Component = (component as keyof JSX.IntrinsicElements) || 'span';

  return (
    <Component className={`${className}`}>
      {segments?.map(({ text, gradient }, index) => (
        <span key={index} className={gradient ? 'text-gradient' : ''}>
          {text} {' '}
        </span>
      ))}
    </Component>
  );
}
