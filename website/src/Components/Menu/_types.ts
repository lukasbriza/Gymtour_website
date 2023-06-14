export type MenuOfferProps = {
  className: string;
  offer: { name: string; path: string; component: any }[];
  show: boolean | undefined;
};

export type MenuLayerProps = {
  offer: { name: string; path: string; component: any }[];
  show: boolean | undefined;
};

export type HamburgerProps = {
  className: string;
  isActive: () => void;
  show: boolean;
  hamburger: boolean | undefined;
};
