import { CustomErrorResponseObject, ErrorTypesArray } from "@utils";

export type GetFilterRequest = {};
export type GetFilterResponse =
  | CustomErrorResponseObject
  | { data: FilterType; errorMap: ErrorTypesArray };

export type FilterType = {
  _id?: { $oid: string };
  regions: Region[];
} & { [x: string]: FilterObject[] };

export type FilterLanguage = { cz: string; eng: string };
export type Town = { code: string; name: FilterLanguage };
export type Region = { name: FilterLanguage; code: string; towns: Town[] };
export type FilterObject = { name: FilterLanguage; code: string };
