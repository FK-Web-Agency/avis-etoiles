'use client';

import { EditEmailAndNameForm, EditPasswordForm, EditProfileForm, EditSubscriptionForm } from '@/components/forms';
import { DeleteMemberButton, GoBack, Icons } from '@/components/shared';
import { useToast } from '@/components/ui';
import { useDelete, useNavigation, useOne } from '@refinedev/core';
import { deleteMember } from '@/lib/actions/clerk.actions';
import { EditMemberSkeleton } from '@/components/skeleton';

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
        {isLoading ? (
          <EditMemberSkeleton />
        ) : (
          <>
            {' '}
            {/* ------------------------------- Edit email ------------------------------- */}
            <EditEmailAndNameForm {...{ ...editEmailAndNameObject }} />
            {/* ------------------------------- Edit password ------------------------------- */}
            <EditPasswordForm clerkId={user?.clerkId} email={user?.email} />
            {/* ------------------------------- Edit profile ------------------------------- */}
            <EditProfileForm {...{ user }} />
            {/* ------------------------------- Subscription ------------------------------- */}
            <EditSubscriptionForm {...{ user }} />
            <DeleteMemberButton {...{ user, id }}>
              <div className="mt-8">
                <Icons.Delete className="w-4 h-4 mr-2" />
                Supprimer
              </div>
            </DeleteMemberButton>
          </>
        )}
      </section>
    </>
  );
}
