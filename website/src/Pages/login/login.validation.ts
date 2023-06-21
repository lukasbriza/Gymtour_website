import Joi from "joi";
import { TFunction } from "i18next";
import { joiResolver } from "@hookform/resolvers/joi";

const loginSchema = (t: TFunction) => {
  return Joi.object({});
};

const changePwdOrNameSchema = (t: TFunction) => {
  return Joi.object({});
};

export const loginFormValidationSchema = (t: TFunction) => {
  return joiResolver(loginSchema(t));
};

export const changePwdOrNameFormValidationSchema = (t: TFunction) => {
  return joiResolver(changePwdOrNameSchema(t));
};
