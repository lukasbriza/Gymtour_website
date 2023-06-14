import { InferType, object, ValidationError, lazy, array } from "yup";
import {
  agreementValidation,
  contactValidation,
  descriptionValidation,
  openHoursValidation,
  optionalAgreementValidation,
  optionalBoolean,
  optionalContactValidation,
  optionalDate,
  optionalNumber,
  optionalOpenHoursValidation,
  optionalString,
  optionalStringArray,
  requiredNumber,
  requiredString,
  requiredStringArray,
} from "./validators";
import { validationConfig } from "../config";

const maxLB = validationConfig.maxLengthBase;

//GET
const getFitnessSchema = object({
  limit: optionalString(),
  order: optionalString(),
  regions: optionalString(),
  equipment: optionalString(),
  general: optionalString(),
  others: optionalString(),
  projection: optionalString(),
});
//POST
const postFitnessShema = object({
  _id: optionalString(),
  name: requiredString(),
  street: requiredString(),
  town: requiredNumber(99),
  region: requiredNumber(99),
  IN: requiredNumber(),
  priceLevel: requiredNumber(3),
  contact: contactValidation(),
  filters: object({
    equipment: requiredStringArray(),
    general: optionalStringArray(),
    others: optionalStringArray(),
  }),
  open: openHoursValidation(),
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
const putFitnessSchema = object({
  _id: requiredString(),
  name: optionalString(),
  street: optionalString(),
  town: optionalNumber(99),
  region: optionalNumber(99),
  IN: optionalNumber(),
  priceLevel: optionalNumber(3),
  contact: optionalContactValidation(),
  filters: object({
    equipment: optionalStringArray(),
    general: optionalStringArray(),
    others: optionalStringArray(),
  }).optional(),
  open: optionalOpenHoursValidation(),
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
const deleteFitnessSchema = object({
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

export const getFitnessValidation = async (object: unknown) => {
  const valResult: ValidationError | InferType<typeof getFitnessSchema> = await getFitnessSchema.validate(object);
  return valResult;
};
export const postFitnessValidation = async (object: unknown) => {
  const valResult: ValidationError | InferType<typeof postFitnessShema> = await postFitnessShema.validate(object);
  return valResult;
};

export const putFitnessValidation = async (object: unknown) => {
  const valResult: ValidationError | InferType<typeof putFitnessSchema> = await putFitnessSchema.validate(object);
  return valResult;
};

export const deleteFitnessValidation = async (object: unknown) => {
  const valResult: ValidationError | InferType<typeof deleteFitnessSchema> = await deleteFitnessSchema.validate(object);
  return valResult;
};
