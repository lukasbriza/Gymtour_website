import { errorMessages } from "../config";
import { add, get, getOne, Option, remove, update } from "../database";
import { UserModel } from "../model";
import {
  AddUserResponsePromise,
  AddUserType,
  GetUserResponsePromise,
  GetUserType,
  RemoveUserResponsePromise,
  RemoveUserType,
  UpdateUserResponsePromise,
  UpdateUserType,
  User,
} from "../types";
import { APIError, assignError, buildResponse, DatabaseError } from "../utils";
import { removeCoaches } from "./coach";
import { removeFitnesses } from "./fitness";
import bcrypt from "bcrypt";

export const getUser = async (query: GetUserType): GetUserResponsePromise => {
  const response = buildResponse<Omit<User, "password">>();
  const { id } = query;

  if (!id) {
    const error = new APIError(errorMessages.getUser.noIdError);
    return assignError(null, error, response);
  }

  const option: Option<User> = {
    findQuery: { _id: id },
    projection: "emailUpdate.value agreement _id username email fitnessOwned coachOwned",
  };

  const user = await getOne<User>(UserModel, errorMessages.getUser.databaseError, option);

  if (user instanceof DatabaseError) {
    return assignError(null, user, response);
  }

  response.data = user;
  return response;
};

export const removeUser = async (body: RemoveUserType): RemoveUserResponsePromise => {
  const response = buildResponse<{ id: string; deleted: boolean }>();
  const { id } = body;

  const option: Option<User> = {
    findQuery: { _id: id },
  };

  const user = await getOne<User>(UserModel, errorMessages.removeUser.noUserError, option);

  if (user instanceof DatabaseError) {
    return assignError({ id: id, deleted: false }, user, response);
  }

  const hasFitnesses = user.fitnessOwned;
  const hasCoaches = user.coachOwned;

  if (hasFitnesses.length > 0) {
    const arr = hasFitnesses.map((value) => {
      return { id: value, owner: user._id.toString() };
    });
    const removeResult = await removeFitnesses({ id: arr });
    const removeErrors = removeResult.errorMap;

    if (removeErrors.length > 0) {
      return assignError({ id: id, deleted: false }, removeErrors, response);
    }
  }

  if (hasCoaches.length > 0) {
    const arr = hasFitnesses.map((value) => {
      return { id: value, owner: user._id.toString() };
    });
    const removeResult = await removeCoaches({ id: arr });
    const removeErrors = removeResult.errorMap;

    if (removeErrors.length > 0) {
      return assignError({ id: id, deleted: false }, removeErrors, response);
    }
  }

  const removeUser = await remove<User>(UserModel, id, errorMessages.removeUser.databaseError);

  if (removeUser instanceof DatabaseError) {
    return assignError({ id: id, deleted: false }, removeUser, response);
  }

  if (removeUser.deletedCount === 0) {
    const error = new APIError(errorMessages.removeUser.noUserError);
    return assignError({ id: id, deleted: false }, error, response);
  }

  response.data = { id: id, deleted: true };
  return response;
};

export const addUser = async (body: AddUserType): AddUserResponsePromise => {
  const response = buildResponse<boolean>();
  const { username, password, email } = body;

  const options: Option<User> = {
    findQuery: { $or: [{ username: username }, { email: email }] },
  };
  const userExist = await get<User>(UserModel, errorMessages.addUser.databaseError, options);

  if (userExist instanceof DatabaseError) {
    return assignError(false, userExist, response);
  }

  if (userExist.length > 0) {
    const error = new APIError(errorMessages.addUser.userExists);
    return assignError(false, error, response);
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = body;
  user.password = hashedPassword;
  user.activated = false;

  const addUser = await add(UserModel, user, errorMessages.addUser.databaseError);

  if (addUser instanceof DatabaseError) {
    return assignError(false, addUser, response);
  }
  //TODO: implement keycloak
  //TODO: send email with url and code to activate user

  response.data = true;
  return response;
};

export const updateUser = async (body: UpdateUserType): UpdateUserResponsePromise => {
  const response = buildResponse<boolean>();
  const { username, password, email, _id } = body;
  const updateDoc = body;

  if (password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    updateDoc.password = hashedPassword;
  }
  if (username || email) {
    const query = [];
    username && query.push({ username: username });
    email && query.push({ email: email });

    const options: Option<User> = {
      findQuery: { $or: query },
    };

    const isDuplicit = await get<User>(UserModel, errorMessages.updateUser.databaseError, options);

    if (isDuplicit instanceof DatabaseError) {
      return assignError(false, isDuplicit, response);
    }

    if (isDuplicit.length > 0 && isDuplicit.findIndex((value) => value._id.toString() !== _id) === -1 ? false : true) {
      const error = new APIError(errorMessages.updateUser.userExists);
      return assignError(false, error, response);
    }
  }

  const updateResult = await update<User>(UserModel, errorMessages.updateUser.databaseError, { _id: _id }, body);

  if (updateResult instanceof DatabaseError) {
    return assignError(false, updateResult, response);
  }

  if (updateResult.modifiedCount === 0) {
    const error = new APIError(errorMessages.updateUser.noUserError);
    return assignError(false, error, response);
  }

  response.data = true;
  return response;
};
