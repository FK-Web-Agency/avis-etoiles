'use client';

import { Refine } from '@refinedev/core';
import routerProvider from '@refinedev/nextjs-router/app';
import dataProvider from 'refine-sanity';
import { PropsWithChildren, useEffect, useState } from 'react';
import { client } from '@/sanity/lib';

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
      meta: {
        canDelete: true,
      },
    },
    {
      name: 'teams',
      list: '/dashboard/admin/teams/list',
    },
  ],
  member: [
    {
      name: 'overview',
      show: '/dashboard/member/overview',
    },
  ],
};

export default function RefineProvider({ children }: PropsWithChildren) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then(({ role }) => {
        setRole(role);
      });
  }, []);

  if (!role) {
    return null;
  }

  return (
    <Refine
      // @ts-ignore
      dataProvider={dataProvider(client)}
      routerProvider={routerProvider}
      resources={resources[role]}
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
