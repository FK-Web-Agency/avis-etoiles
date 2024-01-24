'use client';

import { EditEmailAndNameForm, EditPasswordForm, EditProfileForm, EditSubscriptionForm } from '@/components/forms';
import { GoBack } from '@/components/shared';
import { Button } from '@/components/ui';
import { useOne } from '@refinedev/core';

interface EditMemberProps {
  params: {
    id: string;
  };
}

export default function EditMember({ params: { id } }: EditMemberProps) {
  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id,
  });
  const user = data?.data;
  console.log(user);

  if (isLoading) return <div>Loading...</div>;

  // set the object to be passed to the form component as props
  const editEmailAndNameObject = {
    email: user?.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
    clerkId: user?.clerkId,
  };

  return (
    <>
      <GoBack resource="members" action="list" label="Modifier membre" />

      <section className="text-slate-100">
        {/* ------------------------------- Edit email ------------------------------- */}
        <EditEmailAndNameForm {...{ ...editEmailAndNameObject }} />
        {/* ------------------------------- Edit password ------------------------------- */}
        <EditPasswordForm clerkId={user?.clerkId} email={user?.email} />
        {/* ------------------------------- Edit profile ------------------------------- */}
        <EditProfileForm {...{ user }} />
        {/* ------------------------------- Subscription ------------------------------- */}
        <EditSubscriptionForm {...{ user }} />
        <Button variant={'destructive'}>Supprimer</Button>
      </section>
    </>
  );
}
