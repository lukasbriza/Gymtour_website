import {
  Coach,
  FilterQueryParsed,
  GetCoachType,
  GetCoachResponsePromise,
  AddCoachResponsePromise,
  AddCoachType,
} from "../types";
import { CoachModel } from "../model";
import { add, get, Option } from "../database";
import { errorMessages, config } from "../config";
import { APIError, DatabaseError, buildResponse } from "../utils";
import { SortOrder } from "mongoose";

const orderQuery = (order?: number): { [key: string]: SortOrder } => {
  switch (order) {
    case 1:
      return { popularity: "desc" };
    case 2:
      return { name: "asc" };
    case 3:
      return { views: "desc" };
    default:
      return { popularity: "desc" };
  }
};

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
    findQuery["filters.specialization"] = query.specialization;
  }
  if (query?.others) {
    findQuery["filters.others"] = query.others;
  }
  if (findQuery.town.$in.length === 0) {
    delete findQuery.town;
  }
  if (findQuery.region.$in.length === 0) {
    delete findQuery.region;
  }

  console.log(findQuery);
  return findQuery;
};

export const getCoaches = async (
  query: GetCoachType
): GetCoachResponsePromise => {
  const response = buildResponse<Coach[]>();
  const LIMIT = query.limit ? Number(query.limit) : config.dbUnitLimit;
  const ORDER = query.order ? Number(query.order) : 1;
  const PROJECTION = query.projection ? query.projection : undefined;
  const REGIONS = query.regions ? JSON.parse(query.regions) : undefined;
  const GENDER = query.gender ? JSON.parse(query.gender) : undefined;
  const SPECIALIZATION = query.specialization
    ? JSON.parse(query.specialization)
    : undefined;
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

  const data = await get<Coach>(
    CoachModel,
    errorMessages.getCoach.databaseError,
    option
  );
  if (data instanceof DatabaseError) {
    response.errorMap.push(data);
    return response;
  }
  response.data = data;
  return response;
};

export const addCoach = async (body: AddCoachType): AddCoachResponsePromise => {
  const response = buildResponse<boolean>();
  const { name, region, town } = body;

  const hasSameEmail = await get<Coach>(
    CoachModel,
    errorMessages.getCoach.databaseError,
    { findQuery: { "contact.email": body.contact.email } }
  );

  if (hasSameEmail instanceof DatabaseError) {
    response.data = false;
    response.errorMap.push(hasSameEmail);
    return response;
  }

  if (hasSameEmail.length > 0) {
    const err = new APIError(errorMessages.addCoach.duplicitEmailError);
    response.data = false;
    response.errorMap.push(err);
    return response;
  }

  const hasSameName = await get<Coach>(
    CoachModel,
    errorMessages.getCoach.databaseError,
    { findQuery: { name: name, region: region, town: town } }
  );

  if (hasSameName instanceof DatabaseError) {
    response.data = false;
    response.errorMap.push(hasSameName);
    return response;
  }

  if (hasSameName.length > 0) {
    const err = new APIError(errorMessages.addCoach.sameNameError);
    response.data = false;
    response.errorMap.push(err);
  }

  const data = await add<Coach>(
    CoachModel,
    body,
    errorMessages.getCoach.databaseError
  );

  if (data instanceof DatabaseError) {
    response.data = false;
    response.errorMap.push(data);
    return response;
  }
  response.data = true;
  return response;
};
