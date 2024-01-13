'use client';

import { AdvantagesProps } from '@/Type';
import CustomCard from '@/components/ui/custom-card';
import { Icon } from '@iconify/react';

type AdvantagesType = {
  advantages_section: AdvantagesProps;
};

export default function Advantages({ advantages_section }: AdvantagesType) {
  console.log(advantages_section.advantages[0].icon[0].metadata.size);

  return (
    <section className="my-20">
      <div className="lg:grid grid-cols-6 items-center gap-[3rem]">
        <div className="col-span-2 xl:col-span-3  flex flex-col gap-10 mb-8 animate-fade-up animate-duration-1000 animate-once">
          <h2 className="h2-bold">{advantages_section.title}</h2>
          <p className="p-light-16">{advantages_section.subtitle}</p>
        </div>
        <div className="col-span-4 xl:col-span-3 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 animate-fade-left animate-duration-[1500ms] animate-once">
          {advantages_section.advantages.map((advantage, index) => (
            <CustomCard key={index}>
              <CustomCard.Icon>
                <Icon
                  icon={advantage.icon[0].icon}
                  flip={advantage.icon[0].metadata.flip}
                  rotate={advantage.icon[0].metadata.rotate}
                  className={`h-8 w-8 transition-colors duration-300  fill-white/10 text-zinc-200 
                  group-hover:fill-yellow-400 group-hover:stroke-yellow-400 
                  `}
                />
              </CustomCard.Icon>
              <CustomCard.Title>{advantage.title}</CustomCard.Title>
              <CustomCard.Description>{advantage.description}</CustomCard.Description>
            </CustomCard>
          ))}
        </div>
      </div>
    </section>
  );
}
