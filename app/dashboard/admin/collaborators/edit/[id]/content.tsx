'use client';
import { EditEmailAndNameForm } from '@/components/forms';
import { Spinner } from '@/components/shared';
import { Button, useToast } from '@/components/ui';
import { toggleRoleMembership } from '@/lib/actions/clerk.actions';
import { useOne, useUpdate } from '@refinedev/core';
import { useState } from 'react';

export default function Content({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { data, isLoading } = useOne({
    resource: process.env.NEXT_PUBLIC_SANITY_TEAM_COLLABORATORS,
    id,
  });

  const { mutate } = useUpdate();
  if (isLoading) return <Spinner />;

  const { email, role, firstName, lastName, clerkId, _id: sanityId } = data?.data as any;

  const handleRole = async () => {
    setLoading(true);
    const { status } = await toggleRoleMembership(clerkId, role === 'Admin' ? 'org:commercial' : 'org:admin');

    status === 'success'
      ? mutate(
          {
            resource: process.env.NEXT_PUBLIC_SANITY_TEAM_COLLABORATORS!,
            id,
            values: { role: role === 'Admin' ? 'Commercial' : 'Admin' },
          },
          {
            onSuccess() {
              toast({
                title: 'Colaborateur créé avec succès',
                description: `Le role de ${firstName} ${lastName} a été modifié avec succès`,
              });
            },
          }
        )
      : toast({
          title: 'Erreur lors de la création du colaborateur',
          description: `Une erreur est survenue lors de la modification du role de ${firstName} ${lastName}`,
          variant: 'destructive',
        });

    setLoading(false);
  };

  return (
    <div className="text-slate-50">
      <EditEmailAndNameForm {...{ email, firstName, lastName, clerkId, sanityId }} />

      <form className="mt-8" action={handleRole}>
        <Button disabled={loading} type="submit">
          Devenir {role === 'Admin' ? 'Administrateur' : 'Commercial(e)'}
        </Button>
      </form>
    </div>
  );
}
