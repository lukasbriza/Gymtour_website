import { FilterQuery } from "mongoose";
import { errorMessages } from "../config";
import { update } from "../database";
import { CoachModel, FitnessModel } from "../model";
import { Coach, Fitness, UpdateViewsResponsePromise, UpdateViewsType } from "../types";
import { APIError, DatabaseError, assignError, buildResponse } from "../utils";
import { ObjectId } from "mongodb";

export const updateViews = async (body: UpdateViewsType): UpdateViewsResponsePromise => {
  const response = buildResponse<boolean>();
  const { fitness, coach } = body;
  console.log(fitness, coach);
  const updateRule = {
    $inc: { views: 1 },
  };

  if (fitness) {
    const filter: FilterQuery<Fitness> = { _id: { $in: fitness.map((value) => new ObjectId(value)) } };
    const fitnesUpdate = await update(FitnessModel, errorMessages.views.databaseErrorFitness, filter, updateRule);

    if (fitnesUpdate instanceof DatabaseError) {
      return assignError(false, fitnesUpdate, response);
    }

    if (fitnesUpdate.modifiedCount === 0) {
      const error = new APIError(errorMessages.views.noFitness);
      return assignError(false, error, response);
    }
  }

  if (coach) {
    const filter: FilterQuery<Coach> = { _id: { $in: coach.map((value) => new ObjectId(value)) } };
    const coachUpdate = await update(CoachModel, errorMessages.views.databaseErrorCoches, filter, updateRule);

    if (coachUpdate instanceof DatabaseError) {
      return assignError(false, coachUpdate, response);
    }

    if (coachUpdate.modifiedCount === 0) {
      const error = new APIError(errorMessages.views.noCoach);
      return assignError(false, error, response);
    }
  }

  response.data = true;
  return response;
};
