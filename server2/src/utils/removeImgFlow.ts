import { Model } from "mongoose";
import { DB, errorMessages } from "../config";
import { getOne, removeImg, Option } from "../database";
import { Fitness, Coach } from "../types";
import { DatabaseError } from "./customErrors";

export const removeImgFlow = async (objecId: string, model: Model<any>) => {
  const options: Option<Fitness | Coach> = {
    findQuery: { _id: objecId },
  };
  const img = await getOne<Fitness | Coach>(model, errorMessages.removeFitness.databaseError, options, DB.gymtour);

  if (img instanceof DatabaseError) {
    return [img];
  }

  if (img === null) {
    const error = new DatabaseError(errorMessages.removeImgFlow.noImageError + `${objecId}`);
    return [error];
  }

  const { pictures } = img;
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
      removeImg([id], errorMessages.removeImgFlow.removeImgError + `_id: ${id}`).then((result) => {
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
