import { Document, Model } from "mongoose";
import { DatabaseError } from "../utils";
import { DB } from "../config";
import { getDatabase } from "./initDatabase";

export const add = async <T>(
  model: Model<T>,
  doc: T,
  errorMessage: string,
  database: DB = DB.gymtour
): Promise<Document<T> | DatabaseError> => {
  try {
    const conn = await getDatabase(database);
    const Model = conn.model<T>(model.modelName, model.schema, model.collection.name);
    const data = await new Model(doc).save();
    return data;
  } catch (err) {
    const error = new DatabaseError(`${errorMessage} ${err.message}`);
    return error;
  }
};
