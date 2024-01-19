import Link from 'next/link';
import Image from 'next/image';
import { BsGrid } from 'react-icons/bs';
import { HiOutlineBuildingOffice2, HiOutlineEnvelope, HiOutlinePhone } from 'react-icons/hi2';
import { IoMdCheckmark } from 'react-icons/io';
import { LuHome , LuUsers, LuPieChart} from 'react-icons/lu';
import { IoSettingsOutline, IoLogOutOutline, IoPersonOutline, IoGameControllerOutline } from 'react-icons/io5';
import {MdDashboard} from 'react-icons/md';
import { RiMenu4Line } from 'react-icons/ri';
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { client, queries, urlForImage } from '@/sanity/lib';

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
  BurgerMenu: (props: IconProps) => <BsGrid className="w-6 h-6 text-slate-50" />,
  BuildingOffice: (props: IconProps) => (
    <HiOutlineBuildingOffice2 className="h-7 w-6 text-gray-400" aria-hidden="true" />
  ),
  Envelope: (props: IconProps) => <HiOutlineEnvelope className="h-7 w-6 text-gray-400" aria-hidden="true" />,
  Phone: (props: IconProps) => <HiOutlinePhone className="h-7 w-6 text-gray-400" aria-hidden="true" />,
  Checked: (props: IconProps) => <IoMdCheckmark {...props} />,
  Home: (props: IconProps) => <LuHome {...props} />,
  Teams: (props: IconProps) => <LuUsers {...props} />,
  Settings: (props: IconProps) => <IoSettingsOutline {...props} />,
  Logout: (props: IconProps) => <IoLogOutOutline {...props} />,
  Dashboard: (props: IconProps) => <MdDashboard {...props} />,
  Member: (props: IconProps) => <IoPersonOutline {...props} />,
  Game: (props: IconProps) => <IoGameControllerOutline {...props} />,
  Reports: (props: IconProps) => <LuPieChart {...props} />,
  Menu: (props: IconProps) => <RiMenu4Line {...props} />,
  ArrowUp: (props: IconProps) => <FaRegArrowAltCircleUp {...props} />,
};
export default Icons;
