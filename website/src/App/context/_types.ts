import React from "react";

export interface ContextProviderProps {
  children: React.ReactNode;
}

export type setState<T> = React.Dispatch<React.SetStateAction<T>>;
export type BreakPoints = "toMobile" | "fromMobile" | "fromTablet" | "fromDesktop" | "fromWide";

export type AppStateContext = {
  width?: number;
  actualLocation?: string;
  breakPoint?: BreakPoints;
  fitnessSearch: searchFitnessData;
  coachSearch: searchCoachData;
  filteredFitnessData: filteredData[] | [];
  filteredCoachData: filteredData[] | [];
  fn: {
    setActualLocation: setState<string>;
    preloadCrossroadImg: (timeout: number) => Promise<void>;
    preloadHomeImg: (timeout: number) => Promise<void>;
    preloadMenuImg: (timeout: number) => Promise<void>;
    handleSearchData: (data: dataTypeSearch) => void;
    setFilteredFitnessData: setState<filteredData[]>;
    setFilteredCoachData: setState<filteredData[]>;
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

export type FilterStateContext = {};
