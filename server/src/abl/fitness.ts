import { config, errorMessages } from "../config";
import {
  AddFitnessResponsePromise,
  AddFitnessType,
  FilterQueryParsed,
  Fitness,
  GetFitnessType,
  User,
  GetFitnessResponsePromise,
  RemoveFitnessType,
  RemoveFitnessesResponsePromise,
  UpdateFitnessType,
  UpdateFitnessResponsePromise,
  AddFitnessLikeType,
  AddFitnessLikeRepsonsePromise,
} from "../types";
import {
  removeImgFlow,
  APIError,
  DatabaseError,
  assignError,
  buildResponse,
  isValidIn,
  orderQuery,
  updateOwnerFlow,
  ValidationError,
} from "../utils";
import { add, get, Option, remove, update } from "../database";
import { FitnessModel, UserModel } from "../model";
import { getMeta } from "./image";
import { constructUpdatePath } from "../utils/constructUpdatePath";
import mongoose, { isValidObjectId } from "mongoose";

const getFitnessFilter = (query: FilterQueryParsed) => {
  const findQuery = { region: { $in: [] }, town: { $in: [] } };

  if (!query.regions) {
    return {};
  }

  findQuery.region?.$in.push(query.regions[0]);

  if (Array.isArray(query.regions[1])) {
    query.regions[1].forEach((town) => {
      findQuery.town.$in.push(Number(town));
    });
  }

  if (query?.general) {
    findQuery["filters.general"] = { $in: query.general };
  }
  if (query?.others) {
    findQuery["filters.others"] = { $in: query.others };
  }
  if (query?.equipment) {
    findQuery["filters.equipment"] = { $in: query.equipment };
  }
  if (findQuery.town.$in.length === 0) {
    delete findQuery.town;
  }
  if (findQuery.region.$in.length === 0) {
    delete findQuery.region;
  }

  return findQuery;
};

export const getFitnesses = async (query: GetFitnessType): GetFitnessResponsePromise => {
  const response = buildResponse<Fitness[]>();
  const ID = query.id ? query.id : undefined;
  const OWNER = query.owner ? query.owner : undefined;
  const LIMIT = query.limit ? Number(query.limit) : config.dbUnitLimit;
  const ORDER = query.order ? Number(query.order) : 1;
  const PROJECTION = query.projection ? query.projection : undefined;
  const REGIONS = query.regions ? JSON.parse(query.regions) : undefined;
  const GENERAL = query.general ? JSON.parse(query.general) : undefined;
  const OTHERS = query.others ? JSON.parse(query.others) : undefined;
  const EQUIPMENT = query.equipment ? JSON.parse(query.equipment) : undefined;
  const parsedQuery: FilterQueryParsed = {
    regions: REGIONS,
    general: GENERAL,
    others: OTHERS,
    equipment: EQUIPMENT,
  };

  const order = orderQuery(ORDER);

  if (OWNER) {
    const isValid = isValidObjectId(OWNER);
    if (!isValid) {
      const error = new ValidationError(errorMessages.getFitness.invalidObjectId);
      return assignError<Fitness[]>(null, error, response);
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
        return assignError<Fitness[]>(null, error, response);
      }
    } else {
      const isValid = isValidObjectId(ID);
      if (!isValid) {
        const error = new ValidationError(errorMessages.getFitness.invalidObjectId);
        return assignError<Fitness[]>(null, error, response);
      }
    }
  }

  const option: Option<Fitness> = {
    findQuery: OWNER
      ? { owner: new mongoose.Types.ObjectId(OWNER) }
      : ID
        ? {
          _id: Array.isArray(ID)
            ? { $in: ID.map((id) => new mongoose.Types.ObjectId(id)) }
            : new mongoose.Types.ObjectId(ID),
        }
        : getFitnessFilter(parsedQuery),
    projection: PROJECTION,
    order: order,
    limit: LIMIT,
  };

  const data = await get<Fitness>(FitnessModel, errorMessages.getFitness.databaseError, option);
  if (data instanceof DatabaseError) {
    return assignError<Fitness[]>(null, data, response);
  }
  response.data = data;
  return response;
};

export const addFitness = async (body: AddFitnessType): AddFitnessResponsePromise => {
  const response = buildResponse<boolean>();
  const { IN, name, town, region, owner, pictures } = body;

  const inValid = isValidIn(IN);

  if (inValid instanceof APIError) {
    return assignError<boolean>(false, inValid, response);
  }

  const hasSameName = await get<Fitness>(FitnessModel, errorMessages.addFitness.databaseError, {
    findQuery: { name: name, region: region, town: town },
  });

  if (hasSameName instanceof DatabaseError) {
    return assignError<boolean>(false, hasSameName, response);
  }

  if (hasSameName.length > 0) {
    const err = new APIError(errorMessages.addFitness.sameNameError);
    return assignError<boolean>(false, err, response);
  }

  const hasUser = await get<User>(UserModel, errorMessages.addFitness.userDatabaseError, { findQuery: { _id: owner } });

  if (hasUser instanceof DatabaseError) {
    return assignError<boolean>(false, hasUser, response);
  }

  if (hasUser.length > 1) {
    const err = new APIError(errorMessages.addFitness.multipleOwners);
    return assignError<boolean>(false, err, response);
  }

  if (hasUser.length === 0) {
    const err = new APIError(errorMessages.addFitness.noOwner);
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
    const error = new APIError(`${errorMessages.addFitness.desinchronizationError} cardPicture`);
    return assignError<boolean>(false, error, response);
  }

  if (mainPicture.data.length > 1 || mainPicture.data.length === 0) {
    const error = new APIError(`${errorMessages.addFitness.desinchronizationError} mainPicture`);
    return assignError<boolean>(false, error, response);
  }

  const error = [];
  others.forEach(async (picture) => {
    const otherresult = await getMeta(picture);
    if (otherresult.data.length > 1 || otherresult.data.length === 0) {
      const err = new APIError(`${errorMessages.addFitness.desinchronizationError} otherresult - id: ${picture}`);
      error.push(err);
    }
  });

  if (error.length > 0) {
    return assignError<boolean>(false, error, response);
  }

  const addResult = await add<Fitness>(FitnessModel, body, errorMessages.addFitness.addDatabaseError);

  if (addResult instanceof DatabaseError) {
    return assignError<boolean>(false, addResult, response);
  }

  const updateFlow = await updateOwnerFlow(owner, addResult._id._id.toString(), "fitness", "add");

  if (updateFlow instanceof DatabaseError) {
    return assignError<boolean>(false, updateFlow, response);
  }

  response.data = true;
  return response;
};

export const removeFitnesses = async (body: RemoveFitnessType): RemoveFitnessesResponsePromise => {
  let response = buildResponse<{ id: string; deleted: boolean }[]>();
  response.data = [];
  const { id } = body;

  if (Array.isArray(id)) {
    for (let i = 0; i < id.length; i++) {
      const imagesRemoved = await removeImgFlow(id[i].id, FitnessModel);

      if (Array.isArray(imagesRemoved) && imagesRemoved[0] instanceof DatabaseError) {
        const error = new APIError(errorMessages.removeFitness.errorDueToRemoveImgError + `${id[i]}`);
        response = assignError<{ id: string; deleted: boolean }[]>(
          [...response.data, { id: id[i].id, deleted: false }],
          [...response.errorMap, error, ...imagesRemoved],
          response
        );
      }

      if (response.data.includes({ id: id[i].id, deleted: false })) {
        continue;
      }

      const fitnessRemove = await remove(FitnessModel, id[i].id, errorMessages.removeFitness.databaseError);

      if (fitnessRemove instanceof DatabaseError) {
        response = assignError<{ id: string; deleted: boolean }[]>(
          [...response.data, { id: id[i].id, deleted: false }],
          [...response.errorMap, fitnessRemove],
          response
        );
        continue;
      }

      const updateFlow = await updateOwnerFlow(id[i].owner, id[i].id, "fitness", "remove");

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

  const imagesRemoved = await removeImgFlow(id.id, FitnessModel);

  if (Array.isArray(imagesRemoved) && imagesRemoved[0] instanceof DatabaseError) {
    const error = new APIError(errorMessages.removeFitness.errorDueToRemoveImgError + `${id.id}`);
    return assignError([...response.data, { id: id.id, deleted: false }], [error, ...imagesRemoved], response);
  }

  const fitnessRemove = await remove(FitnessModel, id.id, errorMessages.removeFitness.databaseError);

  if (fitnessRemove instanceof DatabaseError) {
    return assignError([...response.data, { id: id.id, deleted: false }], fitnessRemove, response);
  }

  const updateFlow = await updateOwnerFlow(id.owner, id.id, "fitness", "remove");

  if (updateFlow instanceof DatabaseError) {
    return assignError([...response.data, { id: id.id, deleted: false }], updateFlow, response);
  }

  response.data.push({ id: id.id, deleted: true });
  return response;
};

export const updateFitness = async (body: UpdateFitnessType): UpdateFitnessResponsePromise => {
  const response = buildResponse<boolean>();

  const { name, town, region, _id } = body;

  if (name && (town === undefined || region === undefined)) {
    const error = new APIError(errorMessages.updateFitness.noTownAndRegion);
    return assignError<boolean>(false, error, response);
  }

  if ((region !== undefined || town !== undefined) && name === undefined) {
    const error = new APIError(errorMessages.updateFitness.noName);
    return assignError<boolean>(false, error, response);
  }

  const options: Option<Fitness> = {};
  if (name) {
    options.findQuery.name = name;
  }
  if (town) {
    options.findQuery.town = town;
  }
  if (region) {
    options.findQuery.region = region;
  }

  if (name || town || region) {
    const isDuplicitBusiness = await get<Fitness>(FitnessModel, errorMessages.updateFitness.databaseError, options);

    if (isDuplicitBusiness instanceof DatabaseError) {
      return assignError<boolean>(false, isDuplicitBusiness, response);
    }

    if (isDuplicitBusiness.filter((value) => value._id.toString() !== _id).length > 0) {
      const error = new APIError(errorMessages.updateFitness.nameExists);
      return assignError<boolean>(false, error, response);
    }
  }

  const updateResult = await update<Fitness>(
    FitnessModel,
    errorMessages.updateFitness.databaseError,
    { _id: _id },
    constructUpdatePath(body)
  );

  if (updateResult instanceof DatabaseError) {
    return assignError<boolean>(false, updateResult, response);
  }

  if (updateResult.modifiedCount === 0 || updateResult.matchedCount === 0) {
    const error = new APIError(errorMessages.updateFitness.noFitnesError);
    return assignError<boolean>(false, error, response);
  }

  response.data = true;
  return response;
};

export const addFitnessLike = async (query: AddFitnessLikeType): AddFitnessLikeRepsonsePromise => {
  const response = buildResponse<boolean>();
  const ID = new mongoose.Types.ObjectId(query.id);
  const TARGET = new mongoose.Types.ObjectId(query.target);
  const option = { findQuery: { _id: ID } };
  const fitnessOption = { findQuery: { _id: TARGET } };

  const userData = await get<User>(UserModel, errorMessages.addFitnessLike.databaseError, option);

  if (userData instanceof DatabaseError) {
    return assignError<boolean>(false, userData, response);
  }

  if (userData.length === 1 && userData[0].id === ID.toString()) {
    const updateObject = await get<Fitness>(FitnessModel, errorMessages.addFitnessLike.databaseError, fitnessOption);

    if (updateObject instanceof DatabaseError) {
      return assignError<boolean>(false, updateObject, response);
    }

    if (updateObject.length === 1) {
      const popularityArray = updateObject[0].popularity;

      if (popularityArray.includes(userData[0].id)) {
        const alreadyLikedError = new APIError(errorMessages.addFitnessLike.userAlreadyLiked);
        return assignError<boolean>(false, alreadyLikedError, response);
      }

      popularityArray.push(userData[0].id);

      const data = await update<Fitness>(
        FitnessModel,
        errorMessages.addFitnessLike.databaseError,
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

  const error = new APIError(errorMessages.addFitnessLike.userDoesntExists);
  return assignError<boolean>(false, error, response);
};
