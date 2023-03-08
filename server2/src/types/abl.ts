import { ObjectId } from "mongodb";

export type GetFilterType = undefined;
export type Filter = { [x: string]: unknown };

export type GetCoachType = {
  limit?: string;
  order?: string;
  regions?: string;
  gender?: string;
  specialization?: string;
  projection?: string;
};

export type FilterQueryParsed = {
  [key: string]: number[] | [number, number[]][];
};

export type AddCoachType = Coach;

export type Contact = {
  tel: number | null;
  mobile: number | null;
  email: string;
  web: string | null;
  facebook: string | null;
  twitter: string | null;
  google: string | null;
  instagram: string | null;
  youtube: string | null;
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
  _id?: ObjectId;
  name: string;
  alias: string | null;
  workPlace: string;
  town: number;
  region: number;
  street: string;
  priceLevel: number;
  contact: Contact;
  filters: CoachFilter;
  descriptionBasic: string | "No description.";
  descriptionFull: string | null;
  pictures: CoachPictures;
  agreement: {
    terms: { status: boolean; awarded: Date };
    dataProcessingForPropagation: { status: boolean; awarded: Date };
  };
  owner: string;
  topped: {
    vlaue: boolean;
    toDate: Date | null;
  };
  approved: boolean;
  views: number;
  popularity: string[] | [];
};
