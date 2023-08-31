import { ReactNode } from "react";
import { Coach, FilterObject, FilterType, Fitness, Region } from "src/fetcher/_index";
import { TransformedProviderObject } from "src/utils/_index";

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


export type CoachInformationSectionProps = {
  regionOptions: Region[];
  othersOptions: FilterObject[];
  genderOptions: FilterObject[];
  specializationOptions: FilterObject[];
};

export type FitnessInformationSectionProps = {
  regionOptions: Region[];
  generalOptions: FilterObject[];
  othersOptions: FilterObject[];
  equipmentOptions: FilterObject[];
}

export type ModifyCoachFormProps = { type: "coach" } & CoachInformationSectionProps;

export type ModifyFitnessFrormProps = { type: "fitness" } & FitnessInformationSectionProps;

export type HeaderSectionProps = {
  type: "create" | "modify"
}
