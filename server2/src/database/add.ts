import { Document, HydratedDocument, Model } from "mongoose";
import { DatabaseError } from "../utils";

export const add = async <T>(
  model: Model<T>,
  doc: T,
  errorMessage: string
): Promise<Document<T> | DatabaseError> => {
  try {
    const data = await new model(doc).save();
    return data;
  } catch (err) {
    const error = new DatabaseError(`${errorMessage} ${err.message}`);
    return error;
  }
};
