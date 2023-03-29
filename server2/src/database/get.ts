import { DB } from "../config";
import { DatabaseError } from "../utils";
import mongoose, { FilterQuery, HydratedDocument, Model, QueryOptions, SortOrder } from "mongoose";
import { getBucket, getDatabase } from "./initDatabase";
import { GridFSFile } from "mongodb";

export const getOne = async <T>(
  model: Model<T>,
  errorMessage: string,
  options: Option<T>,
  database: DB = DB.gymtour
): Promise<HydratedDocument<T> | DatabaseError> => {
  const { findQuery, projection } = options;
  try {
    const conn = await getDatabase(database);
    const Model = conn.model(model.modelName);
    const data = await Model.findOne(findQuery, projection).exec();
    return data;
  } catch (err) {
    const error = new DatabaseError(`${errorMessage} ${err.message}`);
    return error;
  }
};

export type Option<T> = {
  findQuery?: FilterQuery<T>;
  projection?: string;
  findOptions?: QueryOptions<T>;
  order?: string | { [key: string]: SortOrder };
  limit?: number;
};

export const get = async <T>(
  model: Model<T>,
  errorMessage: string,
  options?: Option<T>,
  database: DB = DB.gymtour
): Promise<HydratedDocument<T>[] | DatabaseError> => {
  const { findQuery, projection, order, limit } = options;

  try {
    const conn = await getDatabase(database);
    const Model = conn.model(model.modelName);
    const data = await Model.find(findQuery, projection).sort(order).limit(limit).exec();
    return data;
  } catch (err) {
    const error = new DatabaseError(`${errorMessage} ${err.message}`);
    return error;
  }
};

export const getGFS = async (id: string, errorMessage: string): Promise<GridFSFile[] | DatabaseError> => {
  try {
    const bucket = getBucket();
    const data = await bucket.find({ _id: new mongoose.Types.ObjectId(id) }).toArray();
    return data as unknown as GridFSFile[];
  } catch (err) {
    const error = new DatabaseError(`${errorMessage} ${err.message}`);
    return error;
  }
};
