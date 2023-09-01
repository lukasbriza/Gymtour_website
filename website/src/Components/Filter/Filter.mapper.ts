import { CoachFilterQuery, FilterObject, FitnesFilterQuery, GetFilterResponse, Region } from "src/fetcher/_index";
import { CoachFilter, FitnessFilter, OrderTypes } from "./_types";

export const standardMapper = (filterOptions: FilterObject[]): { name: string; code: string }[] => {
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

const mapRegionsToQuerry = (regions: string[], filter: GetFilterResponse) => {
  const regionsArr = filter.data?.regions;
  let returnValue: [string, string[]][] = [];

  if (regionsArr && regions.length > 0) {
    regionsArr.forEach((region) => {
      const regionCode = region.code;
      let regQuerry: [string, string[]] = [regionCode, []];

      region.towns.forEach((town) => {
        const townCode = town.code;
        const foundTown = regions.find((value) => value === townCode);
        if (foundTown) {
          regQuerry[1].push(foundTown);
        }
      });

      if (regQuerry[1].length > 0) {
        returnValue.push(regQuerry);
      }
    });
  }

  if (returnValue.length > 0) {
    return returnValue;
  }
};

/**
 *  if @param type is "man" value 1 is assigned to the @param path array. If type equals women value 2 is assigned.
 *  @param value if true values above are assigned
 */
const mapGenderToPath = (type: "man" | "women", value: boolean, path: number[] | undefined) => {
  let arr = path;
  if (type === "man") {
    const hasMan = arr?.find((value) => value === 1);
    if (hasMan && value === false) {
      const manIndex = arr?.indexOf(1);
      manIndex && arr?.splice(manIndex, 1);
      return arr;
    } else if (!hasMan && value === true) {
      arr?.push(1);
    }
  }
  if (type === "women") {
    const hasWomen = arr?.find((value) => value === 2);
    if (hasWomen && value === false) {
      const womenIndex = arr?.indexOf(2);
      womenIndex && arr?.splice(womenIndex, 1);
      return arr;
    } else if (!hasWomen && value === true) {
      arr?.push(2);
    }
  }
  return arr;
};

const mapOrderToPath = (order: OrderTypes) => {
  switch (order) {
    case OrderTypes.Popularity:
      return "1";
    case OrderTypes.Name:
      return "2";
    case OrderTypes.Views:
      return "3";
  }
};

const mapProjection = (arr: string[]): string => {
  return arr.join(" ");
};

export const fitnessFormToApi = (
  value: FitnessFilter,
  rawFilter: GetFilterResponse,
  projection?: string[]
): FitnesFilterQuery => {
  const { general, equipment, others, searchBar, regions, order } = value;
  let cleanedFilter: FitnesFilterQuery = {};

  const regionsQuerry = mapRegionsToQuerry(regions, rawFilter);

  if (projection) {
    cleanedFilter.projection = mapProjection(projection);
  }

  if (regions.length > 0 && regionsQuerry) {
    cleanedFilter.regions = regionsQuerry;
  }
  if (Array.isArray(general) && general.length > 0) {
    cleanedFilter.general = general;
  }
  if (Array.isArray(equipment) && equipment.length > 0) {
    cleanedFilter.equipment = equipment;
  }
  if (Array.isArray(others) && others.length > 0) {
    cleanedFilter.others = others;
  }
  if (searchBar.length > 0) {
    cleanedFilter.search = searchBar;
  }
  if (order) {
    cleanedFilter.order = mapOrderToPath(order);
  }
  return cleanedFilter;
};

export const coachFormToApi = (value: CoachFilter, rawFilter: GetFilterResponse): CoachFilterQuery => {
  const { searchBar, specialization, others, gender, regions, order } = value;
  let cleanedFilter: CoachFilterQuery = {};

  const regionsQuerry = mapRegionsToQuerry(regions, rawFilter);

  if (regions.length > 0 && regionsQuerry) {
    cleanedFilter.regions = regionsQuerry;
  }
  if (searchBar.length > 0) {
    cleanedFilter.search = searchBar;
  }
  if (Array.isArray(specialization) && specialization.length > 0) {
    cleanedFilter.specialization = specialization;
  }
  if (Array.isArray(others) && others.length > 0) {
    cleanedFilter.others = others;
  }
  if (order) {
    cleanedFilter.order = mapOrderToPath(order);
  }
  if (gender) {
    cleanedFilter.gender = gender;
  }

  return cleanedFilter;
};

export const mapOnlyRegions = (regions: Region[], lng: string) => {
  const regionsMapped = regions.filter((region) => region.towns.length > 0);
  return regionsMapped.map((region) => ({ name: region.name[lng === "cs" ? "cz" : "eng"], code: region.code }));
};

export const mapTownsAccordingToRegion = (regionCode: string, rawFilter: Region[], lng: string) => {
  const region = rawFilter.find((item) => item.code === regionCode);
  return region?.towns.map((town) => ({ name: town.name[lng === "cs" ? "cz" : "eng"], code: town.code })) ?? [];
};
