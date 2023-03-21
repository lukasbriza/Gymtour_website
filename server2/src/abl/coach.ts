import {
  Coach,
  FilterQueryParsed,
  GetCoachType,
  GetCoachResponsePromise,
  AddCoachResponsePromise,
  AddCoachType,
  User,
} from "../types";
import { CoachModel, UserModel } from "../model";
import { add, get, Option } from "../database";
import { errorMessages, config } from "../config";
import { APIError, DatabaseError, assignError, buildResponse, orderQuery } from "../utils";
import { getMeta } from "./image";

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
  const option: Option<Coach> = {
    findQuery: getCoachFilter(parsedQuery),
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

  const data = await add<Coach>(CoachModel, body, errorMessages.getCoach.databaseError);

  if (data instanceof DatabaseError) {
    return assignError<boolean>(false, data, response);
  }
  response.data = true;
  return response;
};

export const removeCoaches = async (body: any) => {
  return;
};
