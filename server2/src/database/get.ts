import { DatabaseError } from "../utils";
import { FilterQuery, HydratedDocument, Model, QueryOptions, SortOrder } from "mongoose";

export const getOne = async <T>(
  model: Model<T>,
  errorMessage: string
): Promise<HydratedDocument<T> | DatabaseError> => {
  try {
    const data = await model.findOne().exec();
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
  options?: Option<T>
): Promise<HydratedDocument<T>[] | DatabaseError> => {
  const { findQuery, projection, order, limit } = options;

  // console.log(options);

  try {
    const data = await model.find(findQuery, projection).sort(order).limit(limit).exec();
    //console.log(data);
    return data;
  } catch (err) {
    const error = new DatabaseError(`${errorMessage} ${err.message}`);
    return error;
  }
};
