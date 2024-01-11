import { BannerProps } from '@/Type';
import { Button } from '@/components/ui/button';
import { urlForImage } from '@/sanity/lib';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type BannerType = {
  banner: BannerProps;
};

export default function Banner({ banner }: BannerType) {
  return (
    <section className="bg-contain py-5 md:py-10 w-full h-full">
      <div className=" grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0 w-full h-full">
        <div className="flex flex-col justify-center gap-8   animate-fade-left animate-duration-[1000ms] animate-delay-[100ms]">
          <h1 className="h1-bold">{banner?.title}</h1>
          <p className="p-regular-20 md:p-regular-24">{banner?.subtitle}</p>
          <Button size="lg" asChild variant={"gradient"} className="button w-full sm:w-fit text-slate-50">
            <Link href="#events">Découvrir maintenant</Link>
          </Button>
        </div>

        <Image
          src={urlForImage(banner?.image)}
          alt="hero"
          width={800}
          height={800}
          className="max-h-[60vh] object-contain object-center 2xl:max-h-[50vh] animate-fade-left animate-duration-[1000ms] animate-delay-[500ms]"
        />
      </div>
    </section>
  );
}
