import { CustomErrorResponseObject } from "src/utils/_index";
import { Contact } from "../fitness/_types";

export type CoachFilterQuery = {
  limit?: number;
  order?: "1" | "2" | "3";
  regions?: [string, string[]][];
  gender?: number[];
  others?: string[];
  specialization?: string[];
  projection?: string;
  search?: string;
  id?: string | string[];
  owner?: string;
};

export type CoachFilter = {
  gender: string;
  specialization: string[];
  others: string[] | [];
};

export type CoachPictures = {
  card: string;
  detail: { main: string; others: string[] | [] };
};

export type Coach = {
  _id?: string;
  name: string;
  alias?: string | null;
  workPlace: string;
  town: number;
  region: number;
  street: string;
  priceLevel: number;
  contact: Contact;
  filters: CoachFilter;
  descriptionBasic: string;
  descriptionFull?: string | null;
  pictures: CoachPictures;
  agreement: {
    terms: { status: boolean; awarded?: Date };
    dataProcessingForPropagation: { status: boolean; awarded?: Date };
  };
  owner: string;
  topped?: {
    value?: boolean;
    toDate?: Date | null;
  };
  approved?: boolean;
  views?: number;
  popularity?: string[];
};

export type GetCoach = Coach[];
export type GetCoachesResponse = CustomErrorResponseObject<GetCoach>;

export type RemoveCoachesBody = { id: { id: string; owner: string } | { id: string; owner: string }[] };
export type RemoveCoaches = { id: string; deleted: boolean }[];
export type RemoveCoachesResponse = CustomErrorResponseObject<RemoveCoaches>;

export type AddCoachBody = Coach;
export type AddCoachResponse = CustomErrorResponseObject<boolean>;

export type UpdateCoachBody = Partial<Coach> & { _id: string };
export type UpdateCoachResponse = CustomErrorResponseObject<boolean>;

export type AddCoachLikeQuery = {
  id: string;
  target: string;
};
export type AddCoachLikeResponse = CustomErrorResponseObject<boolean>;
