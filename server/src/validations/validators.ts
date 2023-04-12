import { object, string, number, array, boolean, date } from "yup";
import { validationConfig } from "../config";

const maxLB = validationConfig.maxLengthBase;
const descpLenght = validationConfig.maLengthDescriptions;

export const optionalString = (max = maxLB) => string().max(max).optional();

export const requiredString = (max = maxLB) => string().max(max).required();
export const numberValidation = (opt = false, limit?: number) =>
  opt
    ? string()
        .optional()
        .test((value: string) => {
          const number = Number(value);
          if (isNaN(number) && value !== undefined) {
            return false;
          }
          if (limit && value !== undefined) {
            return !(number > limit);
          }
          return true;
        })
    : string().test((value: string) => {
        const number = Number(value);
        if (isNaN(number)) {
          return false;
        }
        if (limit) {
          return !(number > limit);
        }
        return true;
      });
export const optionalNumber = (limit?: number) => numberValidation(true, limit);

export const requiredNumber = (limit?: number) => numberValidation(false, limit);

export const descriptionValidation = (required = true) =>
  required ? requiredString(descpLenght) : optionalString(descpLenght);

export const telValidation = () =>
  number().test((value) => {
    if (value.toString().length > 9 || value.toString().length < 9) {
      return false;
    }
    return true;
  });

export const optionalTelValidation = () => telValidation().optional();

export const optionalStringArray = () => array(optionalString()).optional();
export const requiredStringArray = () => array(requiredString()).required();

export const urlValidation = () =>
  string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    "Enter correct url!"
  );

export const optionalUrlValidation = () => urlValidation().optional();

export const emailValidation = () => string().email();
export const requiredEmailvalidaion = () => emailValidation().required();
export const optionalEmailvalidation = () => emailValidation().optional();

export const contactValidation = () =>
  object({
    tel: optionalTelValidation(),
    mobile: optionalTelValidation(),
    email: requiredEmailvalidaion(),
    web: optionalUrlValidation(),
    facebook: optionalUrlValidation(),
    twitter: optionalUrlValidation(),
    google: optionalUrlValidation(),
    instagram: optionalUrlValidation(),
    youtube: optionalUrlValidation(),
  });

export const optionalContactValidation = () =>
  object({
    tel: optionalTelValidation(),
    mobile: optionalTelValidation(),
    email: optionalEmailvalidation(),
    web: optionalUrlValidation(),
    facebook: optionalUrlValidation(),
    twitter: optionalUrlValidation(),
    google: optionalUrlValidation(),
    instagram: optionalUrlValidation(),
    youtube: optionalUrlValidation(),
  }).optional();

export const openHoursValidation = () =>
  object({
    mon: object({
      from: requiredNumber(24).nullable(),
      to: requiredNumber(24).nullable(),
    }),
    tue: object({
      from: requiredNumber(24).nullable(),
      to: requiredNumber(24).nullable(),
    }),
    wed: object({
      from: requiredNumber(24).nullable(),
      to: requiredNumber(24).nullable(),
    }),
    thu: object({
      from: requiredNumber(24).nullable(),
      to: requiredNumber(24).nullable(),
    }),
    fri: object({
      from: requiredNumber(24).nullable(),
      to: requiredNumber(24).nullable(),
    }),
    sat: object({
      from: requiredNumber(24).nullable(),
      to: requiredNumber(24).nullable(),
    }),
    sun: object({
      from: requiredNumber(24).nullable(),
      to: requiredNumber(24).nullable(),
    }),
  });

export const optionalOpenHoursValidation = () =>
  object({
    mon: object({
      from: requiredNumber(24).nullable(),
      to: requiredNumber(24).nullable(),
    }).optional(),
    tue: object({
      from: requiredNumber(24).nullable(),
      to: requiredNumber(24).nullable(),
    }).optional(),
    wed: object({
      from: requiredNumber(24).nullable(),
      to: requiredNumber(24).nullable(),
    }).optional(),
    thu: object({
      from: requiredNumber(24).nullable(),
      to: requiredNumber(24).nullable(),
    }).optional(),
    fri: object({
      from: requiredNumber(24).nullable(),
      to: requiredNumber(24).nullable(),
    }).optional(),
    sat: object({
      from: requiredNumber(24).nullable(),
      to: requiredNumber(24).nullable(),
    }).optional(),
    sun: object({
      from: requiredNumber(24).nullable(),
      to: requiredNumber(24).nullable(),
    }).optional(),
  }).optional();

export const agreementValidation = () =>
  object({
    status: boolean().required(),
    awarded: date().optional(),
  });

export const optionalAgreementValidation = () =>
  object({
    status: boolean().optional(),
    awarded: date().optional(),
  }).optional();
export const optionalBoolean = () => boolean().optional();
export const optionalDate = () => date().optional();
