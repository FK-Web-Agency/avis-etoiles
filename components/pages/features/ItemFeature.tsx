'use client';

import { HowItWorksProps } from '@/interfaces/sanity';
import { Icon } from '@iconify/react';

interface ItemFeatureProps extends HowItWorksProps {
  index: number;
}

export default function ItemFeature({ title, description, icon, index }: ItemFeatureProps) {
  return (
    <li className="mb-10 ml-6 relative">
      <time className="block mb-2 text-sm font-normal leading-none text-gray-500">
        Etape {index + 1}
      </time>

      <span className="absolute -left-[2.8rem] -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient ">
        <Icon
          icon={icon[0].icon}
          flip={icon[0].metadata.flip}
          rotate={icon[0].metadata.rotate}
          className="h-5 w-5"
        />
      </span>
      <h3 className="mb-1 text-lg font-semibold text-white">{title}</h3>
      <div className="text">
        <p>{description}</p>
      </div>
    </li>
  );
}
