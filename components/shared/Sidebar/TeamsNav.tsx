'use client';

import { Skeleton } from '@/components/ui';
import { classNames } from '@/helper';
import { useList } from '@refinedev/core';
/* 
const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]; */

export default function TeamsNav() {
  const { data, isLoading } = useList({
    resource: 'users',
    filters: [
      {
        field: 'role',
        operator: 'eq',
        value: 'admin',
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
          <li key={team.name}>
            <a
              href={team.href}
              className={classNames(
                'text-gray-400 hover:text-white hover:bg-gray-800',
                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
              )}>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                {team.initial}
              </span>
              <span className="truncate">{team.name}</span>
            </a>
          </li>
        ))
      )}
    </ul>
  );
}
