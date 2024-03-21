import { InferType, object, ValidationError } from "yup";
import { requiredString, requiredStringArray } from "./validators";

//DELETE
const deleteImagesSchema = object({
  ids: requiredStringArray(),
});

//GET
const getImageSchema = object({
  id: requiredString(),
});

export const deleteImagesValidation = async (object: unknown) => {
  const valResult: ValidationError | InferType<typeof deleteImagesSchema> = await deleteImagesSchema.validate(object);
  return valResult;
};

export const getImageValidation = async (object: unknown) => {
  const valResult: ValidationError | InferType<typeof getImageSchema> = await getImageSchema.validate(object);
  return valResult;
};
