'use client';

import { z } from 'zod';
import { Button } from '../ui';
import Icons from './Icons';
import { useGo } from '@refinedev/core';
// string | Resource | undefined
const GoBackSchema = z.object({
  resource: z.string(),
  action: z.enum(['list', 'create', 'edit', 'show', 'clone']),
  label: z.string(),
});

type GoBackProps = z.infer<typeof GoBackSchema>;

export default function GoBack({ resource, action, label }: GoBackProps) {
  const go = useGo();
  return (
    <div className="flex items-start gap-2 mb-8">
      <Button
        // @ts-ignore
        onClick={() => go({ to: { resource, action } })}
        variant="ghost"
        className="rounded text-slate-100 hover:text-gray-900">
        <Icons.Back className="w-8 h-8" />
      </Button>
      <h1 className="h4-medium text-white">{label}</h1>
    </div>
  );
}
