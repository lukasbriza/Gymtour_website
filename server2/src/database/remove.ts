import mongoose, { Model } from "mongoose";
import { DatabaseError } from "../utils";

import { getBucket, getDatabase } from "./initDatabase";
import { DB, errorMessages } from "../config";
import { DeleteResult } from "mongodb";

const removeImageLoop = (ids: string[]) => {
  const bucket = getBucket();
  const errorArray: DatabaseError[] = [];
  for (const index in ids) {
    bucket.delete(new mongoose.Types.ObjectId(ids[index]), (err: Error) => {
      if (err) {
        const error = new DatabaseError(`${errorMessages.removeImage.removeLoopError} ${ids[index]} - ${err.message}`);
        errorArray.push(error);
      }
    });
  }
  return errorArray;
};

export const removeImg = async (ids: string[], errorMessage: string) => {
  try {
    const result = removeImageLoop(ids);
    if (result.length > 0) {
      return result;
    }
    return true;
  } catch (err) {
    if (err instanceof DatabaseError) {
      return err;
    }
    const error = new DatabaseError(`${errorMessage} ${err.message}`);
    return error;
  }
};

export const remove = async <T>(
  model: Model<T>,
  id: string | string[],
  errorMessage: string,
  database: DB = DB.gymtour
): Promise<DatabaseError | DeleteResult> => {
  try {
    const conn = await getDatabase(database);
    const Model = conn.model<T>(model.modelName);
    const data: DeleteResult = await Model.deleteOne({ _id: id }).exec();
    return data;
  } catch (err) {
    const error = new DatabaseError(`${errorMessage} ${err.message}`);
    return error;
  }
};
