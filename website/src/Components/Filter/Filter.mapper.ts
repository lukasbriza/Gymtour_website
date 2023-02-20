import { FilterObject, Region } from "@fetchers";

export const standardMapper = (
  filterOptions: FilterObject[]
): { name: string; code: string }[] => {
  const returnValue = filterOptions.map((option) => {
    return { name: option.name.cz, code: option.code };
  });
  return returnValue;
};

export const regionMapper = (
  regions: Region[]
): {
  header: string;
  code: string;
  options: { name: string; code: string }[];
}[] => {
  const returnValue = regions.map((region) => {
    return {
      header: region.name.cz,
      code: region.code,
      options: region.towns.map((town) => {
        return { name: town.name.cz, code: town.code };
      }),
    };
  });
  return returnValue;
};
