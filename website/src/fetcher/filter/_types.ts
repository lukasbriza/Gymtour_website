import { CustomErrorResponseObject } from "@utils";

export type GetFilterRequest = {};
export type GetFilterResponse = CustomErrorResponseObject<FilterType>;

export type FilterType = {
  _id?: { $oid: string };
  regions: Region[];
} & { [x: string]: FilterObject[] };

export type FilterLanguage = { cz: string; eng: string };
export type Town = { code: string; name: FilterLanguage };
export type Region = { name: FilterLanguage; code: string; towns: Town[] };
export type FilterObject = { name: FilterLanguage; code: string };
