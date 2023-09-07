import { object } from "yup"
import { TFunction } from "i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    optionalBooleanValidation,
    requiredBooleanValidation,
    requiredEmailValidaiton,
    requiredMinMaxValidation,
    requiredStringValidation,
} from "./common";

const schema = (t: TFunction) => {
    return object({
        name: requiredStringValidation(t, 100),
        password: requiredMinMaxValidation(t, 8, 100),
        email: requiredEmailValidaiton(t, 200),
        terms: requiredBooleanValidation(t),
        dataProcessing: optionalBooleanValidation(t),
    });
};

export const registrationFormValidation = (t: TFunction) => {
    return yupResolver(schema(t));
};
