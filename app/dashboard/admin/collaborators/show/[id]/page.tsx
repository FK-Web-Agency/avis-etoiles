import { GoBack } from '@/components/shared';
import React from 'react';
import Content from './content';

type PageProps = {
  params: {
    id: string;
  };
};

export default function page({ params: { id } }: PageProps) {
  return (
    <>
      <GoBack resource="collaborators" action="list" label="Détails" />
      <Content id={id} />
    </>
  );
}
