import { Model, FilterQuery } from "mongoose";
import { DB, errorMessages } from "../config";
import { getOne, removeImg } from "../database";
import { Fitness, Coach } from "../types";
import { DatabaseError } from "./customErrors";

export const removeImgFlow = async (objecId: string, model: Model<any>) => {
  const filterQuery: FilterQuery<Fitness | Coach> = { _id: objecId };
  const fitness = await getOne<Fitness | Coach>(
    model,
    errorMessages.removeFitness.databaseError,
    filterQuery,
    DB.gymtour
  );

  if (fitness instanceof DatabaseError) {
    return [fitness];
  }

  const { pictures } = fitness;
  const { card, detail } = pictures;
  const imagesSet = new Set<string>();
  imagesSet.add(card);
  imagesSet.add(detail.main);
  detail.others.forEach((id) => imagesSet.add(id));

  type id = { success: boolean; error: DatabaseError | DatabaseError[] | null };
  type idPromise = Promise<id>;
  const promises: idPromise[] = [];

  imagesSet.forEach((id) => {
    const promise = new Promise<id>((resolve) => {
      removeImg([id], errorMessages.removeFitness.removeImgError + `_id: ${id}`).then((result) => {
        if (result instanceof DatabaseError || Array.isArray(result)) {
          resolve({ success: false, error: result });
        } else {
          resolve({ success: true, error: null });
        }
      });
    });
    promises.push(promise);
  });

  let errors: DatabaseError[] = [];
  await Promise.all(promises).then((ids) => {
    ids.forEach((value) => {
      if (value.success === false) {
        const valueError = Array.isArray(value.error) ? [...value.error] : [value.error];
        errors = [...errors, ...valueError];
      }
    });
  });

  if (errors.length > 0) {
    return errors;
  }

  return true;
};
