import { errorMessages } from "../config";
import { getOne, Option, update } from "../database";
import { UserModel } from "../model";
import { User } from "../types";
import { DatabaseError } from "./customErrors";

export const updateOwnerFlow = async (
  owner: string,
  id: string,
  type: "fitness" | "coach",
  operation: "remove" | "add"
): Promise<DatabaseError | true> => {
  const options: Option<User> = {
    findQuery: { _id: owner },
  };

  const user = await getOne<User>(UserModel, errorMessages.updateOwner.databaseError, options);

  if (user instanceof DatabaseError) {
    return user;
  }

  let array: string[] = user[type === "coach" ? "coachOwned" : "fitnessOwned"];

  if (operation === "add") {
    array.push(id);
  }

  if (operation === "remove") {
    array = array.filter((element) => element !== id);
  }

  const updateUser = await update<User>(
    UserModel,
    errorMessages.updateOwner.databaseError,
    { _id: owner },
    type === "coach" ? { coachOwned: array } : { fitnessOwned: array }
  );

  if (updateUser instanceof DatabaseError) {
    return updateUser;
  }

  if (updateUser.modifiedCount === 0) {
    return new DatabaseError(errorMessages.updateOwner.noUserUpdate);
  }
  return true;
};
