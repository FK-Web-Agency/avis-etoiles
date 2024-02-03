import React from 'react';
import { Skeleton } from '@/components/ui';

export default function EditMemberSkeleton() {
  return (
    <section className="flex-center flex-col gap-5">
      <Skeleton className="w-full h-60" />
      <Skeleton className="w-full h-60" />
      <Skeleton className="w-full h-60" />
    </section>
  );
}
