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

    if (value && (value.toString().length > 9 || value.toString().length < 9)) {
      return false;
    }
    return true;
  });

export const optionalTelValidation = () => telValidation().optional().nullable();

export const optionalStringArray = () => array(optionalString()).optional();
export const requiredStringArray = () => array(requiredString()).required();

export const urlValidation = () =>
  string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    "Enter correct url!"
  );

export const optionalUrlValidation = () => urlValidation().optional().nullable();

export const emailValidation = () => string().email();
export const requiredEmailvalidaion = () => emailValidation().required();
export const optionalEmailvalidation = () => emailValidation().optional().nullable();

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

const OpenObject = () => {
  const getHours = (val: string) => Number(val.split(":")[0])
  const getMinutes = (val: string) => Number(val.split(":")[1])

  return object({
    from: string().test("openHourValidation-from", (value, context) => {
      console.log("from:", value)
      if (value === null || context.parent.to === null) {
        return true
      }
      const fromValue = new Date(2000, 10, 10, getHours(value), getMinutes(value), 0, 0)
      const toValue = new Date(2000, 10, 10, getHours(context.parent.to), getMinutes(context.parent.to), 0, 0)
      if (fromValue > toValue) {
        return false
      }
      return true
    }).test("fromToFilled-from", (value, context) => {
      if (value !== null && context.parent.to === null) {
        return false
      }
      return true
    }).nullable(),
    to: string().test("openHourValidation-to", (value, context) => {
      console.log("to:", value)
      if (value === null || context.parent.from === null) {
        return true
      }

      const fromValue = new Date(2000, 10, 10, getHours(context.parent.from), getMinutes(context.parent.from), 0, 0)
      const toValue = new Date(2000, 10, 10, getHours(value), getMinutes(value), 0, 0)
      if (toValue < fromValue) {
        return false
      }
      return true
    }).test("fromToFilled-to", (value, context) => {
      if (value !== null && context.parent.from === null) {
        return false
      }
      return true
    }).nullable()
  })
}

export const openHoursValidation = () =>
  object({
    mon: OpenObject(),
    tue: OpenObject(),
    wed: OpenObject(),
    thu: OpenObject(),
    fri: OpenObject(),
    sat: OpenObject(),
    sun: OpenObject(),
  });

export const optionalOpenHoursValidation = () =>
  object({
    mon: OpenObject().optional(),
    tue: OpenObject().optional(),
    wed: OpenObject().optional(),
    thu: OpenObject().optional(),
    fri: OpenObject().optional(),
    sat: OpenObject().optional(),
    sun: OpenObject().optional(),
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

const inValidationFn = (value: string): boolean => {
  const arr = value.split("")
  const validationArr = arr.map((val) => !isNaN(Number(val)))
  return !validationArr.includes(false)
}

export const INValidation = (required = true) => required ? string().test("wrong_IN_format", inValidationFn).required() : string().test("wrong_IN_format", inValidationFn).optional()
