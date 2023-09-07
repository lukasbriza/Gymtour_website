import { CustomErrorResponseObject } from "src/utils";

type OpenHours = {
  mon: { from: string | null; to: string | null };
  tue: { from: string | null; to: string | null };
  wed: { from: string | null; to: string | null };
  thu: { from: string | null; to: string | null };
  fri: { from: string | null; to: string | null };
  sat: { from: string | null; to: string | null };
  sun: { from: string | null; to: string | null };
};

export type Contact = {
  tel?: number | null;
  mobile?: number | null;
  email: string;
  web?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  google?: string | null;
  instagram?: string | null;
  youtube?: string | null;
};

export type FitnessFilterType = {
  equipment: string[];
  general: string[] | [];
  others: string[] | [];
};

export type Fitness = {
  _id?: string;
  name: string;
  street: string;
  town: number;
  region: number;
  IN: number;
  priceLevel: number;
  contact: Contact;
  filters: FitnessFilterType;
  open: OpenHours;
  descriptionFull?: string | null;
  pictures: {
    card: string;
    detail: {
      main: string;
      others: string[] | [];
    };
  };
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

export type FitnesFilterQuery = {
  limit?: number;
  order?: "1" | "2" | "3";
  regions?: [string, string[]][];
  equipment?: string[];
  general?: string[];
  others?: string[];
  projection?: string;
  search?: string;
  id?: string | string[];
  owner?: string;
};

export type GetFitness = Fitness[];
export type GetFitnessResponse = CustomErrorResponseObject<GetFitness>;

export type RemoveFitnessesBody = {
  id: { id: string; owner: string }[] | { id: string; owner: string };
};
export type RemoveFitnesses = { id: string; deleted: boolean }[];
export type RemoveFitnessesResponse = CustomErrorResponseObject<RemoveFitnesses>;

export type UpdateFitnessBody = Partial<Fitness> & { _id: string };
export type UpdateFitnessResponse = CustomErrorResponseObject<boolean>;

export type AddFitnessBody = Partial<Fitness> & { owner: string };
export type AddFitnessResponse = CustomErrorResponseObject<boolean>;

export type AddFitnessLikeQuery = {
  id: string;
  target: string;
};
export type AddFitnessLikeResponse = CustomErrorResponseObject<boolean>;
