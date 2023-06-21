import { FilterObject, GetFilterResponse, Region, Town } from "src/fetcher/_index";

export enum OrderTypes {
  Popularity = "P",
  Name = "N",
  Views = "V",
}

export type FilterProps = {
  type: FilterVariants;
};

export type FilterActiveBoltsProps = {
  type: FilterVariants;
};

export type CoachFilter = {
  regions: string[];
  specialization: string[];
  others: string[];
  gender: [];
  searchBar: string;
  order?: OrderTypes;
};

export type FitnessFilter = {
  general: string[];
  regions: string[];
  equipment: string[];
  others: string[];
  searchBar: string;
  order?: OrderTypes;
};

export type FormType = CoachFilter | FitnessFilter;
export type FilterVariants = "fitness" | "coach";

export type FilterComponentsProps = {
  type: FilterVariants;
  loading: boolean;
  rawFilter?: GetFilterResponse;
};

export type AvoidedFilterType = { regions: Region[] } & {
  [x: string]: FilterObject[];
};

export type RegionSectionProps = { region: Region };
export type TownSectionProps = { town: Town };
