'use client';
import { FeatureProps } from '@/interfaces/sanity';
import { PortableText } from '@portabletext/react';
import { Icon } from '@iconify/react';

type FeaturesType = {
  features_section: FeatureProps;
};

const Item = ({ title, subtitle, icon }: FeatureProps['features'][0]) => {

  return (
    <div>
      <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary lg:h-12 lg:w-12">
        <Icon
          icon={icon[0].icon}
          flip={icon[0].metadata.flip}
          rotate={icon[0].metadata.rotate}
          className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
        />
      </div>
      <h3 className="p-semibold-18 text-gray-900">{title}</h3>
      <p className="text-gray-500 p-light-16 ">{subtitle}</p>
    </div>
  );
};

export default function Features({ features_section }: FeaturesType) {
  
  return (
    <section className="bg-amber-100">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">{features_section?.title} </h2>
          <div className="text-gray-500 p-light-16 sm:text-xl ">
            <PortableText value={features_section?.subtitle} />
          </div>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          {features_section?.features.map((feature: FeatureProps['features'], index: number) => (
            <Item key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
