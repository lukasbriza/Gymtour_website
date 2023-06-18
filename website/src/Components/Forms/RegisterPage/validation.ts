import Joi from "joi";
import { TFunction } from "i18next";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  optionalBooleanValidation,
  requiredBooleanValidation,
  requiredEmailValidaiton,
  requiredMinMaxValidation,
  requiredStringValidation,
} from "../../../validations/_index";

const schema = (t: TFunction) => {
  return Joi.object({
    name: requiredStringValidation(t, 100),
    password: requiredMinMaxValidation(t, 8, 100),
    email: requiredEmailValidaiton(t, 200),
    terms: requiredBooleanValidation(t),
    dataProcessing: optionalBooleanValidation(t),
  });
};

export const formValidationSchema = (t: TFunction) => {
  return joiResolver(schema(t));
};
