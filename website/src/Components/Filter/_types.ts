import { filter } from "@config";
import { FilterObject, Region, Town } from "@fetchers";
import { UseFormGetValues } from "react-hook-form";

export type FilterProps = {
  type: FilterVariants;
};

export type FormType =
  | {
      general: string[];
      regions: string[];
      specialization: string[];
      others: string[];
      man: boolean;
      woman: boolean;
      searchBar: string;
    }
  | {
      general: string[];
      regions: string[];
      equipment: string[];
      others: string[];
      searchBar: string;
    };
export type FilterVariants = "fitness" | "coach";

export type AvoidedFilterType = { regions: Region[] } & {
  [x: string]: FilterObject[];
};

export type FilterTypeComponent = keyof typeof filter.filterTypes;
export type RegionSectionProps = { region: Region };
export type TownSectionProps = { town: Town };
