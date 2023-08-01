import { InferType, object, ValidationError, lazy, array } from "yup";
import {
  agreementValidation,
  contactValidation,
  descriptionValidation,
  optionalAgreementValidation,
  optionalBoolean,
  optionalContactValidation,
  optionalDate,
  optionalNumber,
  optionalString,
  optionalStringArray,
  requiredNumber,
  requiredString,
  requiredStringArray,
} from "./validators";
import { validationConfig } from "../config";

const maxLB = validationConfig.maxLengthBase;

//GET
const getCoachSchema = object({
  limit: optionalString(),
  order: optionalString(),
  regions: optionalString(),
  gender: optionalString(),
  specialization: optionalString(),
  projection: optionalString(),
  id: optionalString(),
});

//POST
const postCoachSchema = object({
  _id: optionalString(),
  name: requiredString(),
  alias: optionalString().nullable(),
  workPlace: requiredString(),
  street: requiredString(),
  town: requiredNumber(99),
  region: requiredNumber(99),
  priceLevel: requiredNumber(3),
  contact: contactValidation(),
  filters: object({
    gender: requiredString(),
    specialization: requiredStringArray(),
    others: optionalStringArray(),
  }),
  descriptionBasic: requiredString(maxLB),
  descriptionFull: descriptionValidation(false),
  pictures: object({
    card: requiredString(),
    detail: object({
      main: requiredString(),
      others: optionalStringArray().max(10),
    }),
  }),
  agreement: object({
    terms: agreementValidation(),
    dataProcessingForPropagation: agreementValidation(),
  }),
  owner: requiredString(),
  topped: object({
    value: optionalBoolean(),
    toDate: optionalDate().nullable(),
  }).optional(),
  approved: optionalBoolean(),
  views: optionalNumber(),
  popularity: optionalStringArray(),
});

//PUT
const putCoachSchema = object({
  _id: requiredString(),
  name: optionalString(),
  alias: optionalString().nullable(),
  workPlace: optionalString(),
  town: optionalNumber(99),
  region: optionalNumber(99),
  pricelevel: optionalNumber(3),
  contact: optionalContactValidation(),
  filters: object({
    gender: optionalString(),
    specialization: optionalStringArray(),
    others: optionalStringArray(),
  }).optional(),
  descriptionBasic: optionalString(maxLB),
  descriptionFull: descriptionValidation(false),
  pictures: object({
    card: optionalString(),
    detail: object({
      main: optionalString(),
      others: optionalStringArray().max(10),
    }).optional(),
  }).optional(),
  owner: optionalString(),
  agreement: object({
    terms: optionalAgreementValidation(),
    dataProcessingForPropagation: optionalAgreementValidation(),
  }).optional(),
  topped: object({
    value: optionalBoolean(),
    toDate: optionalDate().nullable(),
  }).optional(),
  approved: optionalBoolean(),
  views: optionalNumber(),
  popularity: optionalStringArray(),
});

//DELETE
const deleteCoachSchema = object({
  id: lazy((value: unknown) => {
    if (Array.isArray(value)) {
      return array(
        object({
          id: requiredString(),
          owner: requiredString(),
        })
      );
    } else {
      return object({
        id: requiredString(),
        owner: requiredString(),
      });
    }
  }),
});

export const getCoachValidation = async (object: unknown) => {
  const valResult: ValidationError | InferType<typeof getCoachSchema> = await getCoachSchema.validate(object);
  return valResult;
};

export const postCoachValidation = async (object: unknown) => {
  const valResult: ValidationError | InferType<typeof postCoachSchema> = await postCoachSchema.validate(object);
  return valResult;
};

export const putCoachValidation = async (object: unknown) => {
  const valResult: ValidationError | InferType<typeof putCoachSchema> = await putCoachSchema.validate(object);
  return valResult;
};

export const deleteCoachValidation = async (object: unknown) => {
  const valResult: ValidationError | InferType<typeof deleteCoachSchema> = await deleteCoachSchema.validate(object);
  return valResult;
};
