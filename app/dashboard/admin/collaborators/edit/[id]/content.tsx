'use client';
import { EditEmailAndNameForm } from '@/components/forms';
import { Spinner } from '@/components/shared';
import { useOne } from '@refinedev/core';

export default function Content({ id }: { id: string }) {
  const { data, isLoading } = useOne({
    resource: process.env.NEXT_PUBLIC_SANITY_TEAM_COLLABORATORS,
    id,
  });

  if (isLoading) return <Spinner />;

  const { email, firstName, lastName, clerkId, _id: sanityId } = data?.data as any;

  return (
    <div className='text-slate-50'>
      <EditEmailAndNameForm {...{ email, firstName, lastName, clerkId, sanityId }} />
    </div>
  );
}
