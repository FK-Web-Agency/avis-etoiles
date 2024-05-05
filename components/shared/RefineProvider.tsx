'use client';

import { Refine } from '@refinedev/core';
import routerProvider from '@refinedev/nextjs-router/app';
import dataProvider from 'refine-sanity';
import { PropsWithChildren, useEffect } from 'react';
import { client } from '@/sanity/lib';
import { useDashboardStore, useOnboardingStore } from '@/store';
import { useUser } from '@clerk/nextjs';

const resources = {
  admin: [
    {
      name: 'overview',
      list: '/dashboard/admin/overview',
    },
    {
      name: 'members',
      list: '/dashboard/admin/members/list',
      create: '/dashboard/admin/members/create',
      edit: '/dashboard/admin/members/edit/:id',
      show: '/dashboard/admin/members/show/:id',
      meta: {
        canDelete: true,
      },
    },
    {
      name: 'collaborators',
      list: '/dashboard/admin/collaborators/list',
      create: '/dashboard/admin/collaborators/create',
      show: '/dashboard/admin/collaborators/show/:id',
      edit: '/dashboard/admin/collaborators/edit/:id',
      meta: {
        canDelete: true,
      },
    },
  ],
  member: [
    {
      name: 'overview',
      list: '/dashboard/member/overview',
    },
  ],
};

export default function RefineProvider({ children }: PropsWithChildren) {
  const { role, setRole, setUserIds: setMemberIds, } = useDashboardStore();
  const { user } = useUser();
  const { setUserIds } = useOnboardingStore();

  const public_metadata = user?.publicMetadata;

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then(({ role }) => {
        if(!role) return setRole("null")
        setRole(role);
      });
  }, []);

  useEffect(() => {
    const ids = { clerkId: user?.id as string, sanityId: public_metadata?.userId as string };

    setUserIds(ids);
    setMemberIds(ids);
  }, [user]);

  if (role === null) return null;

  return (
    <Refine
      // @ts-ignore
      dataProvider={dataProvider(client)}
      routerProvider={routerProvider}
      resources={resources[role as 'admin' | 'member']}
      options={{
        liveMode: 'auto',
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        projectId: 'eT5PSC-Goadjp-dYfdbS',
      }}>
      {children}
    </Refine>
  );
}
