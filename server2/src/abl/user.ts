import { errorMessages } from "../config";
import { getOne, Option } from "../database";
import { UserModel } from "../model";
import { GetUserResponsePromise, User } from "../types";
import { APIError, assignError, buildResponse, DatabaseError } from "../utils";

export const getUser = async (query): GetUserResponsePromise => {
  const response = buildResponse<Omit<User, "password">>();
  const { id } = query;

  if (!id) {
    const error = new APIError(errorMessages.getUser.noIdError);
    return assignError(null, error, response);
  }

  const option: Option<User> = {
    findQuery: { _id: id },
  };

  const user = await getOne<User>(UserModel, errorMessages.getUser.databaseError, option);

  if (user instanceof DatabaseError) {
    return assignError(null, user, response);
  }

  delete user.password;
  response.data = user;
  return response;
};
