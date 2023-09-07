import { TFunction } from "i18next";
import { object } from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { requiredEmailValidaiton, requiredMinMaxValidation, requiredStringValidation } from "./common";

const loginSchema = (t: TFunction) => {
    return object({
        username: requiredStringValidation(t, 100),
        password: requiredMinMaxValidation(t, 8, 100),
    });
};

const changePwdOrNameSchema = (t: TFunction) => {
    return object({
        email: requiredEmailValidaiton(t, 200),
    });
};

export const loginFormValidationSchema = (t: TFunction) => {
    return yupResolver(loginSchema(t));
};

export const changePwdOrNameFormValidationSchema = (t: TFunction) => {
    return yupResolver(changePwdOrNameSchema(t));
};
