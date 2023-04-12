import { InferType, object, ValidationError } from "yup";
import {
  agreementValidation,
  optionalAgreementValidation,
  optionalDate,
  optionalEmailvalidation,
  optionalString,
  optionalStringArray,
  requiredEmailvalidaion,
  requiredString,
} from "./validators";

//GET
export const getUserSchema = object({
  id: requiredString(),
});

//POST
export const postUserSchema = object({
  _id: optionalString(),
  username: requiredString(),
  password: requiredString(),
  email: requiredEmailvalidaion(),
  emailUpdate: object({
    value: optionalString().nullable(),
    validTo: optionalDate(),
  }).optional(),
  fitnessOwned: optionalStringArray(),
  coachOwned: optionalStringArray(),
  agreement: object({
    terms: agreementValidation(),
    dataProcessingForPropagation: agreementValidation(),
  }),
});

//PUT
export const putUserSchema = object({
  _id: requiredString(),
  username: optionalString(),
  password: optionalString(),
  email: optionalEmailvalidation(),
  emailUpdate: object({
    value: optionalString().nullable(),
    validTo: optionalDate(),
  }).optional(),
  fitnessOwned: optionalStringArray(),
  coachOwned: optionalStringArray(),
  agreement: object({
    terms: optionalAgreementValidation(),
    dataProcessingForPropagation: optionalAgreementValidation(),
  }),
});

//DELETE
export const deleteUserSchema = object({
  id: requiredString(),
});

export const getUserValidation = async (object: unknown) => {
  const valResult: ValidationError | InferType<typeof getUserSchema> = await getUserSchema.validate(object);
  return valResult;
};

export const postUserValidation = async (object: unknown) => {
  const valResult: ValidationError | InferType<typeof postUserSchema> = await postUserSchema.validate(object);
  return valResult;
};

export const putUserValidation = async (object: unknown) => {
  const valResult: ValidationError | InferType<typeof putUserSchema> = await putUserSchema.validate(object);
  return valResult;
};

export const deleteUserValidation = async (object: unknown) => {
  const valResult: ValidationError | InferType<typeof deleteUserSchema> = await deleteUserSchema.validate(object);
  return valResult;
};
