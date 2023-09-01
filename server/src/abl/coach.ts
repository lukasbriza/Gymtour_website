import {
  Coach,
  FilterQueryParsed,
  GetCoachType,
  GetCoachResponsePromise,
  AddCoachResponsePromise,
  AddCoachType,
  User,
  RemoveCoachType,
  RemoveCoachesResponsePromise,
  UpdateCoachType,
  UpdateCoachResponsePromise,
  AddCoachLikeResponsePromise,
  AddCoachLikeType,
} from "../types";
import { CoachModel, UserModel } from "../model";
import { add, get, Option, remove, update } from "../database";
import { errorMessages, config } from "../config";
import {
  APIError,
  DatabaseError,
  ValidationError,
  assignError,
  buildResponse,
  orderQuery,
  removeImgFlow,
  updateOwnerFlow,
} from "../utils";
import { getMeta } from "./image";
import { constructUpdatePath } from "../utils/constructUpdatePath";
import mongoose, { isValidObjectId } from "mongoose";

const getCoachFilter = (query: FilterQueryParsed) => {
  const findQuery = { region: { $in: [] }, town: { $in: [] } };

  if (!query.regions) {
    return {};
  }

  query.regions.forEach((region) => {
    findQuery.region?.$in.push(region[0]);

    region[1].forEach((town) => {
      findQuery.town.$in.push(Number(town));
    });
  });

  if (query?.gender) {
    findQuery["filters.gender"] = { $in: query.gender };
  }
  if (query?.specialization) {
    findQuery["filters.specialization"] = { $in: query.specialization };
  }
  if (query?.others) {
    findQuery["filters.others"] = { $in: query.others };
  }
  if (findQuery.town.$in.length === 0) {
    delete findQuery.town;
  }
  if (findQuery.region.$in.length === 0) {
    delete findQuery.region;
  }
  return findQuery;
};

export const getCoaches = async (query: GetCoachType): GetCoachResponsePromise => {
  const response = buildResponse<Coach[]>();
  const OWNER = query.owner ? query.owner : undefined;
  const ID = query.id ? query.id : undefined;
  const LIMIT = query.limit ? Number(query.limit) : config.dbUnitLimit;
  const ORDER = query.order ? Number(query.order) : 1;
  const PROJECTION = query.projection ? query.projection : undefined;
  const REGIONS = query.regions ? JSON.parse(query.regions) : undefined;
  const GENDER = query.gender ? JSON.parse(query.gender) : undefined;
  const SPECIALIZATION = query.specialization ? JSON.parse(query.specialization) : undefined;
  const parsedQuery: FilterQueryParsed = {
    regions: REGIONS,
    gender: GENDER,
    specialization: SPECIALIZATION,
  };

  const order = orderQuery(ORDER);

  if (OWNER) {
    const isValid = isValidObjectId(OWNER);
    if (!isValid) {
      const error = new ValidationError(errorMessages.getCoach.invalidObjectId);
      return assignError<Coach[]>(null, error, response);
    }
  }

  if (ID) {
    if (Array.isArray(ID)) {
      const results: boolean[] = [];
      ID.forEach((id) => {
        results.push(isValidObjectId(id));
      });
      if (results.includes(false)) {
        const error = new ValidationError(errorMessages.getCoach.invalidObjectId);
        return assignError<Coach[]>(null, error, response);
      }
    } else {
      const isValid = isValidObjectId(ID);
      if (!isValid) {
        const error = new ValidationError(errorMessages.getCoach.invalidObjectId);
        return assignError<Coach[]>(null, error, response);
      }
    }
  }

  const option: Option<Coach> = {
    findQuery: OWNER
      ? { owner: new mongoose.Types.ObjectId(OWNER) }
      : ID
      ? {
          _id: Array.isArray(ID)
            ? { $in: ID.map((id) => new mongoose.Types.ObjectId(id)) }
            : new mongoose.Types.ObjectId(ID),
        }
      : getCoachFilter(parsedQuery),
    projection: PROJECTION,
    order: order,
    limit: LIMIT,
  };
  const data = await get<Coach>(CoachModel, errorMessages.getCoach.databaseError, option);
  if (data instanceof DatabaseError) {
    return assignError<Coach[]>(null, data, response);
  }
  response.data = data;
  return response;
};

export const addCoach = async (body: AddCoachType): AddCoachResponsePromise => {
  const response = buildResponse<boolean>();
  const { name, region, town, owner, pictures } = body;

  const hasSameEmail = await get<Coach>(CoachModel, errorMessages.getCoach.databaseError, {
    findQuery: { "contact.email": body.contact.email },
  });

  if (hasSameEmail instanceof DatabaseError) {
    return assignError<boolean>(false, hasSameEmail, response);
  }

  if (hasSameEmail.length > 0) {
    const err = new APIError(errorMessages.addCoach.duplicitEmailError);
    return assignError<boolean>(false, err, response);
  }

  const hasSameName = await get<Coach>(CoachModel, errorMessages.addCoach.databaseError, {
    findQuery: { name: name, region: region, town: town },
  });

  if (hasSameName instanceof DatabaseError) {
    return assignError<boolean>(false, hasSameName, response);
  }

  if (hasSameName.length > 0) {
    const err = new APIError(errorMessages.addCoach.sameNameError);
    return assignError<boolean>(false, err, response);
  }

  const hasUser = await get<User>(UserModel, errorMessages.addCoach.userDatabaseError, { findQuery: { _id: owner } });

  if (hasUser instanceof DatabaseError) {
    return assignError<boolean>(false, hasUser, response);
  }

  if (hasUser.length > 1) {
    const err = new APIError(errorMessages.addCoach.multipleOwners);
    return assignError<boolean>(false, err, response);
  }

  if (hasUser.length == 0) {
    const err = new APIError(errorMessages.addCoach.noOwner);
    return assignError<boolean>(false, err, response);
  }

  const { card, detail } = pictures;
  const { main, others } = detail;

  const cardPicture = await getMeta(card);
  const mainPicture = await getMeta(main);

  if (cardPicture.errorMap.length > 0) {
    return assignError<boolean>(false, response.errorMap, response);
  }

  if (mainPicture.errorMap.length > 0) {
    return assignError<boolean>(false, response.errorMap, response);
  }

  if (cardPicture.data.length > 1 || cardPicture.data.length === 0) {
    const error = new APIError(`${errorMessages.addCoach.desinchronizationError} cardPicture`);
    return assignError<boolean>(false, error, response);
  }

  if (mainPicture.data.length > 1 || mainPicture.data.length === 0) {
    const error = new APIError(`${errorMessages.addCoach.desinchronizationError} mainPicture`);
    return assignError<boolean>(false, error, response);
  }

  const error = [];
  others.forEach(async (picture) => {
    const otherresult = await getMeta(picture);
    if (otherresult.data.length > 1 || otherresult.data.length === 0) {
      const err = new APIError(`${errorMessages.addCoach.desinchronizationError} otherresult - id: ${picture}`);
      error.push(err);
    }
  });

  if (error.length > 0) {
    return assignError<boolean>(false, error, response);
  }

  const addResult = await add<Coach>(CoachModel, body, errorMessages.getCoach.databaseError);

  if (addResult instanceof DatabaseError) {
    return assignError<boolean>(false, addResult, response);
  }

  const updateFlow = await updateOwnerFlow(owner, addResult._id._id.toString(), "coach", "add");

  if (updateFlow instanceof DatabaseError) {
    return assignError<boolean>(false, updateFlow, response);
  }

  response.data = true;
  return response;
};

export const removeCoaches = async (body: RemoveCoachType): RemoveCoachesResponsePromise => {
  let response = buildResponse<{ id: string; deleted: boolean }[]>();
  response.data = [];
  const { id } = body;

  if (Array.isArray(id)) {
    for (let i = 0; i < id.length; i++) {
      const imagesRemoved = await removeImgFlow(id[i].id, CoachModel);

      if (Array.isArray(imagesRemoved) && imagesRemoved[0] instanceof DatabaseError) {
        const error = new APIError(errorMessages.removeCoaches.errorDueToRemoveImgError + `${id[i]}`);
        response = assignError<{ id: string; deleted: boolean }[]>(
          [...response.data, { id: id[i].id, deleted: false }],
          [...response.errorMap, error, ...imagesRemoved],
          response
        );
      }

      if (response.data.includes({ id: id[i].id, deleted: false })) {
        continue;
      }

      const coachRemove = await remove(CoachModel, id[i].id, errorMessages.removeCoaches.databaseError);

      if (coachRemove instanceof DatabaseError) {
        response = assignError<{ id: string; deleted: boolean }[]>(
          [...response.data, { id: id[i].id, deleted: false }],
          [...response.errorMap, coachRemove],
          response
        );
        continue;
      }

      const updateFlow = await updateOwnerFlow(id[i].owner, id[i].id, "coach", "remove");

      if (updateFlow instanceof DatabaseError) {
        response = assignError<{ id: string; deleted: boolean }[]>(
          [...response.data, { id: id[i].id, deleted: false }],
          [...response.errorMap, updateFlow],
          response
        );
        return response;
      }

      response.data.push({ id: id[i].id, deleted: true });
    }

    return response;
  }

  const imagesRemoved = await removeImgFlow(id.id, CoachModel);

  if (Array.isArray(imagesRemoved) && imagesRemoved[0] instanceof DatabaseError) {
    const error = new APIError(errorMessages.removeCoaches.errorDueToRemoveImgError + `${id}`);
    return assignError([...response.data, { id: id.id, deleted: false }], [error, ...imagesRemoved], response);
  }

  const coachRemove = await remove(CoachModel, id.id, errorMessages.removeFitness.databaseError);

  if (coachRemove instanceof DatabaseError) {
    return assignError([...response.data, { id: id.id, deleted: false }], coachRemove, response);
  }

  response.data.push({ id: id.id, deleted: true });
  return response;
};

export const updateCoach = async (body: UpdateCoachType): UpdateCoachResponsePromise => {
  const response = buildResponse<boolean>();

  const { contact, _id } = body;

  if (contact !== undefined) {
    const { tel, mobile, email } = contact;

    if (tel !== undefined) {
      const option: Option<Coach> = { findQuery: { contact: { tel: tel } } };
      const isDuplicitTel = await get<Coach>(CoachModel, errorMessages.updateCoach.databaseError, option);

      if (isDuplicitTel instanceof DatabaseError) {
        return assignError<boolean>(false, isDuplicitTel, response);
      }

      if (isDuplicitTel.filter((value) => value._id.toString() !== _id).length > 0) {
        const error = new APIError(errorMessages.updateCoach.telExists);
        return assignError<boolean>(false, error, response);
      }
    }
    if (mobile !== undefined) {
      const option: Option<Coach> = { findQuery: { contact: { mobile: mobile } } };
      const isDuplicitMobile = await get<Coach>(CoachModel, errorMessages.updateCoach.databaseError, option);

      if (isDuplicitMobile instanceof DatabaseError) {
        return assignError<boolean>(false, isDuplicitMobile, response);
      }

      if (isDuplicitMobile.filter((value) => value._id.toString() !== _id).length > 0) {
        const error = new APIError(errorMessages.updateCoach.mobileExists);
        return assignError<boolean>(false, error, response);
      }
    }
    if (email !== undefined) {
      const option: Option<Coach> = { findQuery: { contact: { email: email } } };
      const isDuplicitEmail = await get<Coach>(CoachModel, errorMessages.updateCoach.databaseError, option);

      if (isDuplicitEmail instanceof DatabaseError) {
        return assignError<boolean>(false, isDuplicitEmail, response);
      }

      if (isDuplicitEmail.filter((value) => value._id.toString() !== _id).length > 0) {
        const error = new APIError(errorMessages.updateCoach.emailExists);
        return assignError<boolean>(false, error, response);
      }
    }
  }

  const updateResult = await update<Coach>(
    CoachModel,
    errorMessages.updateCoach.databaseError,
    { _id: _id },
    constructUpdatePath(body)
  );

  if (updateResult instanceof DatabaseError) {
    return assignError<boolean>(false, updateResult, response);
  }

  if (updateResult.modifiedCount === 0 || updateResult.matchedCount === 0) {
    const error = new APIError(errorMessages.updateCoach.noCoachError);
    return assignError<boolean>(false, error, response);
  }

  response.data = true;
  return response;
};

export const addCoachLike = async (query: AddCoachLikeType): AddCoachLikeResponsePromise => {
  const response = buildResponse<boolean>();
  const ID = new mongoose.Types.ObjectId(query.id);
  const TARGET = new mongoose.Types.ObjectId(query.target);
  const option = { findQuery: { _id: ID } };
  const coachOption = { findQuery: { _id: TARGET } };

  const userData = await get<User>(UserModel, errorMessages.addCoachLike.databaseError, option);

  if (userData instanceof DatabaseError) {
    return assignError<boolean>(false, userData, response);
  }

  if (userData.length === 1 && userData[0].id === ID.toString()) {
    const updateObject = await get<Coach>(CoachModel, errorMessages.addCoachLike.databaseError, coachOption);

    if (updateObject instanceof DatabaseError) {
      return assignError<boolean>(false, updateObject, response);
    }

    if (updateObject.length === 1) {
      const popularityArray = updateObject[0].popularity;

      if (popularityArray.includes(userData[0].id)) {
        const alreadyLikedError = new APIError(errorMessages.addCoachLike.userAlreadyLiked);
        return assignError<boolean>(false, alreadyLikedError, response);
      }

      popularityArray.push(userData[0].id);

      const data = await update<Coach>(
        CoachModel,
        errorMessages.addCoachLike.databaseError,
        { _id: TARGET },
        constructUpdatePath({ popularity: popularityArray })
      );

      if (data instanceof DatabaseError) {
        return assignError<boolean>(false, data, response);
      }

      if (data.modifiedCount !== 1) {
        response.data = false;
        return response;
      }

      response.data = true;
      return response;
    }
  }

  const error = new APIError(errorMessages.addCoachLike.userDoesntExists);
  return assignError<boolean>(false, error, response);
};
