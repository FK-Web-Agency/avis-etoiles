import { IntroSectionProps } from '@/Type';
import { TextGradient } from '@/components/ui';
import React from 'react';

type IntroductionType = {
  introduction_section: IntroSectionProps;
};

export default function Introduction({ introduction_section }: IntroductionType) {
  return (
    <section className="wrapper py-16">
        <TextGradient component="h1" className='h1-bold' segments={introduction_section?.title} />
        <p className='mt-8'>{introduction_section?.subtitle}</p>
    </section>
  );
}
