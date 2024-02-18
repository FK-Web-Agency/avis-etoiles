'use client';

import { EditEmailAndNameForm, EditPasswordForm, EditProfileForm, EditSubscriptionForm } from '@/components/forms';
import { DeleteMemberButton, GoBack, Icons, ToggleRoleMemberButton } from '@/components/shared';
import { useOne } from '@refinedev/core';
import { EditMemberSkeleton } from '@/components/skeleton';
import { classNames } from '@/helper';

interface ContentProps {
  id: string;
}

export default function Content({ id }: ContentProps) {
  const { data, isLoading, isError } = useOne({
    resource: process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS!,
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
    sanityId: user?._id
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
            <div className="flex items-center gap-4 mt-8">
              <DeleteMemberButton {...{ user, id }}>
                <Icons.Delete className="w-4 h-4 mr-2" />
                <span className="text-slate-100">Supprimer</span>
              </DeleteMemberButton>
            </div>
          </>
        )}
      </section>
    </>
  );
}
