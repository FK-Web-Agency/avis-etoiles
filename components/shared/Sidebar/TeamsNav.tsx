import { classNames } from '@/helper';

const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
];

export default function TeamsNav() {
  return (
    <ul role="list" className="-mx-2 mt-2 space-y-1">
      <div className="text-xs font-semibold leading-6 text-gray-400">Votre équipe</div>
      {teams.map((team) => (
        <li key={team.name}>
          <a
            href={team.href}
            className={classNames(
              team.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
            )}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
              {team.initial}
            </span>
            <span className="truncate">{team.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
