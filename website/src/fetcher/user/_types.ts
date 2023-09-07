import { CustomErrorResponseObject } from "src/utils";

export type User = {
  _id?: string;
  username: string;
  email: string;
  emailUpdate?: {
    value: string | null;
    validTo: Date;
  };
  fitnessOwned?: string[] | [];
  coachOwned?: string[] | [];
  isAdmin?: boolean;
  agreement: {
    terms: { status: boolean; awarded?: Date };
    dataProcessingForPropagation: { status: boolean; awarded?: Date };
  };
};
export type GetUserResponse = CustomErrorResponseObject<User>;

export type DeleteUser = { id: string; deleted: boolean };
export type DeleteUserResponse = CustomErrorResponseObject<DeleteUser>;

export type AddUser = User & { password: string };
export type AddUserResponse = CustomErrorResponseObject<boolean>;

export type UpdateUser = Partial<User> & { _id: string };
export type UpdateUserResponse = CustomErrorResponseObject<boolean>;
