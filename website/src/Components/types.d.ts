//GLOBAL TYPES//
type MenuOffer = {
  className: string;
  offer: { name: string; path: string; component: any }[];
  show: boolean | undefined;
};

type Hamburger = {
  className: string;
  isActive: () => void;
  show: boolean;
  hamburger: boolean | undefined;
};

type SmallLogo = {
  className: string;
  scale: number;
};

type SmallText = {
  className: string;
  scale: number;
};

type MenuLayer = {
  offer: { name: string; path: string; component: any }[];
  show: boolean | undefined;
};

type BigLogo = {
  id: string;
  className?: string;
  scale: number;
  ref: any;
};

type BigText = {
  id: string;
  className?: string;
  scale: number;
  ref: any;
};

type Underliner = {
  id?: string;
  width: string;
};
