import { Coach, FilterQueryParsed, GetCoachType, GetCoachResponsePromise } from "../types";
import { CoachModel } from "../model";
import { get, Option } from "../database";
import { errorMessages, config } from "../config";
import { DatabaseError, buildResponse } from "../utils";
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

export const getCoaches = async (query: GetCoachType): GetCoachResponsePromise => {
  const response = buildResponse<Coach[]>();
  const LIMIT = query.limit ? Number(query.limit) : config.dbUnitLimit;
  const ORDER = query.order ? Number(query.order) : 1;
  const PROJECTION = query.projection ? query.projection : undefined;
  const REGIONS = query.regions ? JSON.parse(query.regions) : undefined;
  const GENDER = query.gender ? JSON.parse(query.gender) : undefined;
  const SPECIALIZATION = query.specialization ? JSON.parse(query.specialization) : undefined;
  const parsedQuery: FilterQueryParsed = { regions: REGIONS, gender: GENDER, specialization: SPECIALIZATION };

  const order = orderQuery(ORDER);
  const option: Option<Coach> = {
    findQuery: getCoachFilter(parsedQuery),
    projection: PROJECTION,
    order: order,
    limit: LIMIT,
  };

  const data = await get<Coach>(CoachModel, errorMessages.getCoach.databaseError, option);
  if (data instanceof DatabaseError) {
    response.errorMap.push(data);
    return response;
  }
  response.data = data;
  return response;
};

export const addCoach = async (body: AddCoachType): AddCoachResponsePromise => {
  return;
};
