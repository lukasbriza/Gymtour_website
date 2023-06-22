import Joi from "joi";
import { TFunction } from "i18next";
import { joiResolver } from "@hookform/resolvers/joi";
import { requiredEmailValidaiton, requiredMinMaxValidation, requiredStringValidation } from "src/validations/_index";

const loginSchema = (t: TFunction) => {
  return Joi.object({
    username: requiredStringValidation(t, 100),
    password: requiredMinMaxValidation(t, 8, 100),
  });
};

const changePwdOrNameSchema = (t: TFunction) => {
  return Joi.object({
    email: requiredEmailValidaiton(t, 200),
  });
};

export const loginFormValidationSchema = (t: TFunction) => {
  return joiResolver(loginSchema(t));
};

export const changePwdOrNameFormValidationSchema = (t: TFunction) => {
  return joiResolver(changePwdOrNameSchema(t));
};
