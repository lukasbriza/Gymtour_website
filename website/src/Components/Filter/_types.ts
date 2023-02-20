import { filter } from "@config";
import { FilterObject, Region, Town } from "@fetchers";

export type FilterProps = {
  type: FilterVariants;
};
export type FilterVariants = "fitness" | "coach";

export type AvoidedFilterType = { regions: Region[] } & {
  [x: string]: FilterObject[];
};

export type FilterTypeComponent = keyof typeof filter.filterTypes;
export type RegionSectionProps = { region: Region };
export type TownSectionProps = { town: Town };
