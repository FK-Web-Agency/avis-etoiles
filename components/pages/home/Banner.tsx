import Image from 'next/image';
import Link from 'next/link';

import { BannerProps } from '@/interfaces/sanity';
import { Button } from '@/components/ui';
import { urlForImage } from '@/sanity/lib';


type BannerType = {
  banner: BannerProps;
};

export default function Banner({ banner }: BannerType) {
  return (
    <section className="bg-contain w-full h-full wrapper">
      <div className=" grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0 w-full h-full">
        <div className="flex flex-col justify-center gap-8   animate-fade-left animate-duration-[1000ms] animate-delay-[100ms]">
          <h1 className="h1-bold">{banner?.title}</h1>
          <p className="p-regular-16 md:p-regular-20">{banner?.subtitle}</p>
          <Button size="lg" asChild variant={"gradient"} className="button w-full sm:w-fit text-slate-50">
            <Link href="/features">Découvrir maintenant</Link>
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
