import type { Image } from 'sanity';

type DefaultProps = {
  _ref: string;
  _type: string;
  _id: string;
};

// Type Banner section
interface BannerProps extends DefaultProps {
  image: Image;
  subtitle: string;
  title: string;
}

type IconManager = {
  _type: 'icon.manager';
  icon: string;
  metadata: {
    iconName: string;
    collectionId: string;
    collectionName: string;
    url: string;
    downloadUrl: string;
    inlineSvg: string;
    hFlip: boolean;
    vFlip: boolean;
    flip: 'horizontal' | 'vertical' | 'horizontal,vertical';
    rotate: 0 | 1 | 2 | 3;
    size: {
      width: number;
      height: number;
    };
    color: {
      hex: string;
      rgba: {
        r: number;
        g: number;
        b: number;
        a: number;
      };
    };
    palette: boolean;
    author: {
      name: string;
      url: string;
    };
    license: {
      name: string;
      url: string;
    };
  };
};


// Type Advantage section


type Advantage = {
  _key: string;
  title: string;
  description: string;
  icon: Array<IconManager>;
};

interface AdvantagesProps extends DefaultProps {
  title: string;
  subtitle: string;
  advantages: Array<Advantage>;
}


