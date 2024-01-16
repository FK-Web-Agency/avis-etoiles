import Image from 'next/image';
import { TextGradient } from '@/components/ui';
import { BannerAboutProps } from '@/interfaces/sanity';
import { urlForImage } from '@/sanity/lib';

type BannerType = {
  banner: BannerAboutProps;
};

export default function Banner({ banner }: BannerType) {
  return (
    <section className="relative isolate -z-10 wrapper">
      {/* Background SVG */}
      <svg
        className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-800 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
        aria-hidden="true">
        <defs>
          <pattern
            id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse">
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-[var(--background)]">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
        />
      </svg>

      {/* Background Overlay */}
      <div
        className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
        aria-hidden="true">
        <div
          className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-primary to-[#eab308] opacity-30"
          style={{
            clipPath:
              'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="overflow-hidden">
        <div className="pb-32 pt-12 lg:pt-32">
          <div className="mx-auto max-w-4xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            {/* Text */}
            <div className="w-full max-w-3xl lg:shrink-0 xl:max-w-2xl">
              <TextGradient component="h1" className="h1-bold" segments={banner?.title_gradient} />
              <p className="relative mt-6 p-regular-18 sm:max-w-2xl lg:max-w-none">
                {banner?.subtitle}
              </p>
            </div>

            {/* Images */}
            <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-80 lg:mt-0 lg:pl-0">
              {/* Main Image */}
              <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                <div className="relative">
                  <Image
                    src={urlForImage(banner?.images[0])}
                    alt="image"
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    width={396}
                    height={528}
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </div>
              </div>

              {/* Secondary Images */}
              <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                {banner?.images?.slice(1, 3).map((image, index) => (
                  <div className="relative" key={index}>
                    <Image
                      src={urlForImage(image)}
                      alt="image"
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      width={396}
                      height={528}
                      priority
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                ))}
              </div>

              {/* Tertiary Images */}
              <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                {banner?.images?.slice(3, 5).map((image, index) => (
                  <div className="relative" key={index}>
                    <Image
                      src={urlForImage(image)}
                      alt="image"
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      width={396}
                      height={528}
                      priority
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
