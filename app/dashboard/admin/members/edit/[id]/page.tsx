import React from 'react';
import Content from './content';
interface EditMemberProps {
  params: {
    id: string;
  };
}

export default function page({ params: { id } }: EditMemberProps) {
  return (
    <>
      <Content id={id} />
    </>
  );
}
