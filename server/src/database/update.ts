import { Model, FilterQuery, UpdateWithAggregationPipeline, UpdateQuery } from "mongoose";
import { DB } from "../config";
import { DatabaseError } from "../utils";
import { getDatabase } from "./initDatabase";
import { UpdateResult } from "mongodb";

export const update = async <T>(
  model: Model<T>,
  errorMessage: string,
  filter: FilterQuery<T>,
  update: UpdateQuery<T> | UpdateWithAggregationPipeline,
  database: DB = DB.gymtour
): Promise<UpdateResult | DatabaseError> => {
  try {
    const conn = await getDatabase(database);
    const Model = conn.model(model.modelName, model.schema, model.collection.name);
    const data = await Model.updateMany(filter, update, {}).exec();
    return data as unknown as UpdateResult;
  } catch (err) {
    const error = new DatabaseError(`${errorMessage} ${err.message}`);
    return error;
  }
};
