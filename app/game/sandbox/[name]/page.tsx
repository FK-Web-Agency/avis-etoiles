import React from 'react';
import { z } from 'zod';

const SandboxSchema = z.object({
  params: z.object({
    name: z.string(),
  }),
});

type SandboxProps = z.infer<typeof SandboxSchema>;

export default function page({ params: { name } }: SandboxProps) {
  return <div>page</div>;
}
