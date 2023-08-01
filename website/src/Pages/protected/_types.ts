import { ReactNode } from "react";
import { Coach, FilterObject, FilterType, Fitness, Region } from "src/fetcher/_index";

export type UserRecordListProps = {
  loading: boolean;
  fitnesses: Fitness[];
  coaches: Coach[];
};

export type LikedObject = { _id: string; name: string; town: number; region: number };

export type UserLikesListProps = {
  filter?: FilterType;
  loading: boolean;
  coachLiked: LikedObject[];
  fitnessLiked: LikedObject[];
};

export type UserSectionEditableData = {
  username: string;
  email: string;
};

export type ModifyCoachFormProviderProps = {
  defaultValues?: TransformedProviderObject<Coach>;
  children: ReactNode;
};
export type ModifyFitnessFormProviderProps = {
  defaultValues?: TransformedProviderObject<Fitness>;
  children: ReactNode;
};

export type TransformedProviderObject<T> = Omit<Partial<T>, "pictures"> & {
  pictures: { card: File; detail: { main: File; others: File[] } };
};

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
