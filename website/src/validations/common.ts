import { TFunction } from "i18next";

import Joi from "joi";

export const requiredStringValidation = (t: TFunction, max: number) => {
  return Joi.string()
    .ruleset.max(max)
    .rule({ message: t("validation:max", { max: max }) })
    .required()
    .messages({ "string.empty": t("validation.required") });
};

export const requiredEmailValidaiton = (t: TFunction, max: number) => {
  return Joi.string()
    .ruleset.max(max)
    .rule({ message: t("validation:max", { max: max }) })
    .required()
    .messages({ "string.empty": t("validation.required") });
};

export const requiredMinMaxValidation = (t: TFunction, min: number, max: number) => {
  return Joi.string()
    .ruleset.min(min)
    .rule({ message: t("validation:min", { min: min }) })
    .ruleset.max(max)
    .rule({ message: t("validation:max", { max: max }) });
};

export const requiredBooleanValidation = (t: TFunction) => {
  return Joi.boolean().equal(true);
};

export const optionalBooleanValidation = (t: TFunction) => {
  return Joi.boolean().equal(true, false).messages({ "any.only": "validation:noBoolean" });
};
