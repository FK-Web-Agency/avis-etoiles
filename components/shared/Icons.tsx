import React from 'react';
import { BsGrid } from 'react-icons/bs';

type IconProps = React.HTMLAttributes<SVGElement>;

type LogoProps = {
  hrefNull?: boolean;
  color?: string;
} & IconProps;

const Icons = {
  Logo: (props: LogoProps) => (
    <a href={props.hrefNull ? '#' : '/'} className={`-m-1.5 p-1.5 ${props.color ? props.color : "text-slate-50"}`}>
      <span className="sr-only">Your Company</span>
      Avis Etoiles
    </a>
  ),
  BurgerMenu: (props: IconProps) => <BsGrid className="w-6 h-6 text-slate-50"  />,
};
export default Icons;
