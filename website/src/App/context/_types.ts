import React from "react";
import { BoltProps } from "src/components/_index";
import { Coach, Fitness } from "src/fetcher/_index";

export type ContextProviderProps = {
  children: React.ReactNode;
};

export type setState<T> = React.Dispatch<React.SetStateAction<T>>;
export type BreakPoints = "toMobile" | "fromMobile" | "fromTablet" | "fromDesktop" | "fromWide";

export type AppStateContext = {
  width?: number;
  actualLocation?: string;
  breakPoint?: BreakPoints;
  fn: {
    setActualLocation: setState<string>;
    preloadCrossroadImg: (timeout: number) => Promise<void>;
    preloadHomeImg: (timeout: number) => Promise<void>;
    preloadMenuImg: (timeout: number) => Promise<void>;
  };
};

export type AnimationStateContext = {
  bigLogoPlayed: boolean;
  smallLogoPlayed: boolean;
  filterOpen: boolean;
  contentPageCross: boolean;
  fn: {
    setBigLogoPlayed: setState<boolean>;
    setSmallLogoPlayed: setState<boolean>;
    setFilterOpen: setState<boolean>;
    setContentPageCross: setState<boolean>;
  };
};

export type UserStateContext = {
  logged: boolean;
  userId: string;
  userObject: userObjectType | undefined;
  fn: {
    setLogged: setState<boolean>;
    setUserId: setState<string>;
    setUserObject: setState<userObjectType | undefined>;
  };
};

export type CoachFilterContext = {
  limit: number;
  filteredContent: Coach[];
  contentLoading: boolean;
  bolts: BoltProps[];
  setContent: setState<Coach[]>;
  setLimit: setState<number>;
  setLoading: setState<boolean>;
  register: (state: boolean, code: string, text: string, fieldName: string) => void;
  removeBolt: (code: string) => void;
  addBolt: (text: string, code: string, name?: string) => void;
  updateCoach: (coach: Coach) => void;
};
export type FitnessFilterContext = {
  limit: number;
  filteredContent: Fitness[];
  contentLoading: boolean;
  bolts: BoltProps[];
  setContent: setState<Fitness[]>;
  setLimit: setState<number>;
  setLoading: setState<boolean>;
  register: (state: boolean, code: string, text: string, fieldName: string) => void;
  removeBolt: (code: string) => void;
  addBolt: (text: string, code: string, name?: string) => void;
  updateFitness: (fitness: Fitness) => void;
};

export type ImageStoreContextType = {
  images: { [id: string]: string }[];
  addToStore: (id: string, data: Blob) => string | undefined;
  removeFromStore: (id: string) => void;
  getFromStore: (id: string) => string | undefined;
};
