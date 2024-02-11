import { CreateTeamForm } from '@/components/forms';
import { GoBack } from '@/components/shared';
import React from 'react';

export default function page() {
  return (
    <>
      <GoBack resource="teams" action="list" label="Créer un colaboarteur" />
      <CreateTeamForm />
    </>
  );
}
