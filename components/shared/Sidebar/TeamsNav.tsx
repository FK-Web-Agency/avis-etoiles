'use client';

import { Avatar, AvatarImage, Button, Skeleton } from '@/components/ui';
import { classNames } from '@/helper';
import { useGo, useList } from '@refinedev/core';
/* 
const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]; */

export default function TeamsNav() {
  const go = useGo();
  const { data, isLoading } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_TEAM_COLLABORATORS,
    filters: [
      {
        field: 'disabled',
        operator: 'eq',
        value: 'false',
      },
    ],
  });

  const teams = data?.data || [];

  return (
    <ul role="list" className="-mx-2 mt-2 space-y-1">
      <div className="text-xs font-semibold leading-6 text-gray-400">Votre équipe</div>
      {isLoading ? (
        Array.from(Array(3).keys()).map((i) => (
          <div className="flex items-center gap-1 mb-2">
            <Skeleton key={i} className="h-10 w-10" />
            <Skeleton className="h-10 w-28" />
          </div>
        ))
      ) : teams?.length === 0 ? (
        <div>
          <p className="p-medium-14 text-gray-600">Aucun membre</p>
        </div>
      ) : (
        teams.map((team) => (
          <li key={team.email}>
            <Button
            onClick={() => go({ to: { resource: process.env.NEXT_PUBLIC_SANITY_TEAM_COLLABORATORS!, action: 'show', id: team._id } })}
            variant={'ghost'} className={classNames('hover:bg-transparent')}>
              <Avatar >
                <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${team.firstName}`} />
              </Avatar>
              <span className="truncate ml-2 text-gray-400">
                {team.firstName} {team.lastName}
              </span>
            </Button>
          </li>
        ))
      )}
    </ul>
  );
}
