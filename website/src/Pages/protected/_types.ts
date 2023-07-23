import { ReactNode } from "react";
import { Coach, FilterObject, Fitness, Region } from "src/fetcher/_index";

export type UserSectionEditableData = {
  username: string;
  email: string;
};

export type ModifyCoachFormProviderProps = Partial<Coach> & { children: ReactNode };
export type ModifyFitnessFormProviderProps = Partial<Fitness> & { children: ReactNode };

export type MappedCoachValues = {
  coachName?: string;
  coachSurname?: string;
  houseNumber?: string;

  cardPicture?: File;
  mainPicture?: File;
  othersPictures?: File[];

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
    "name" | "contact" | "filters" | "pictures" | "agreement" | "topped" | "approved" | "views" | "popularity"
  >
>;

export type MappedFitnessValues = {
  cardPicture?: File;
  mainPicture?: File;
  othersPictures?: File[];

  tel?: number;
  mobile?: number;
  email?: string;
  web?: string;
  facebook?: string;
  twitter?: string;
  google?: string;
  instagram?: string;
  youtube?: string;

  terms?: boolean;
  dataProcessingForPropagation?: boolean;

  equipment?: string[];
  general?: string[];
  others?: string[];
} & Partial<
  Omit<Fitness, "contact" | "filters" | "pictures" | "agreement" | "topped" | "approved" | "views" | "popularity">
>;

export type CoachInformationSectionProps = {
  loading: boolean;
  regionOptions: Region[];
  othersOptions: FilterObject[];
  genderOptions: FilterObject[];
  specializationOptions: FilterObject[];
};

export type ModifyCoachFormProps = { type: "coach" } & CoachInformationSectionProps;

export type ModifyFitnessFrormProps = { type: "fitness" };

export type ContactSectionProps = {};

export type TermsSectionProps = {};

export type AboutSectionProps = {};
