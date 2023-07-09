import { ReactNode } from "react";
import { Coach, Fitness } from "src/fetcher/_index";

export type UserSectionEditableData = {
  username: string;
  email: string;
};

export type CoachFormProps = Partial<Coach>;
export type ModifyCoachFormProps = CoachFormProps & { children: ReactNode };
export type FitnessFormProps = Partial<Fitness>;
export type ModifyFitnessFormProps = FitnessFormProps & { children: ReactNode };

export type MappedCoachValues = {
  cardPicture?: string;
  mainPicture?: string;
  othersPictures?: string[];

  tel?: number;
  mobile?: number;
  email?: string;
  web?: string;
  facebook?: string;
  twitter?: string;
  google?: string;
  instagram?: string;
  youtube?: string;

  gender?: string;
  specialization?: string[];
  others?: string[];

  terms?: boolean;
  dataProcessingForPropagation?: boolean;
} & Partial<
  Omit<
    Coach,
    | "contact"
    | "filters"
    | "pictures"
    | "agreement"
    | "topped"
    | "approved"
    | "views"
    | "popularity"
  >
>;
