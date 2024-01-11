import React from 'react';
import { SanityImageAssetDocument } from 'next-sanity';
import Image from 'next/image';
import { BsGrid } from 'react-icons/bs';
import { client, queries, urlForImage } from '@/sanity/lib';
import Link from 'next/link';

type IconProps = React.HTMLAttributes<SVGElement>;

type LogoProps = {
  hrefNull?: boolean;
  color?: string;
} & IconProps;

const Icons = {
  Logo: async (props: LogoProps) => {
    const { logo } = await client.fetch(queries.GET_LOGO);

    // If no logo, return text
    if (!logo)
      return (
        <Link href={props.hrefNull ? '#' : '/'} className="text-4xl">
          Avis Étoiles 🎁
        </Link>
      );

    // If logo, return image
    return (
      <Link href={props.hrefNull ? '#' : '/'} className="w-36">
        <Image src={urlForImage(logo)} alt="logo" width={200} height={58} />
      </Link>
    );
  },
  BurgerMenu: (props: IconProps) => (
    <BsGrid className="w-6 h-6 text-slate-50" />
  ),
};
export default Icons;
