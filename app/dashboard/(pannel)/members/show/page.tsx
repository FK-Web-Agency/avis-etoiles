'use client';
import { useMany, useShow } from '@refinedev/core';

import { Icons } from '@/components/shared';
import { Button } from '@/components/ui';

export default function Members() {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  console.log(data);

  return (
    <>
      <section className="flex justify-between items-center">
        <h1 className="h4-medium text-white">Tous les Membres</h1>

        <Button variant={'secondary'} className="flex-center gap-2 rounded">
          <Icons.AddMember className="w-4 h-4" />
          <span className="p-regular-14 ">Ajouter un membre</span>
        </Button>
      </section>
    </>
  );
}
