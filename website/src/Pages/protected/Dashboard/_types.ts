import { Coach, FilterType, Fitness } from "src/fetcher";

export type UserRecordListProps = {
  loading: boolean;
  fitnesses: Fitness[];
  coaches: Coach[];
  refetch: () => void
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



