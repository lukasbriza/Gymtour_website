import { object, array, string } from "yup"
import { TFunction } from "i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { optionalStringValidation } from "./common";

const defautlArrString = array().of(string().optional())

const filterCoachSchema = (t: TFunction) => {
    return object({
        regions: defautlArrString,
        specialization: defautlArrString,
        others: defautlArrString,
        gender: array(),
        searchBar: optionalStringValidation(t, 150),
        order: optionalStringValidation(t, 1)

    })
}

const filterFitnessSchema = (t: TFunction) => {
    return object({
        general: defautlArrString,
        regions: defautlArrString,
        equipment: defautlArrString,
        others: defautlArrString,
        searchBar: optionalStringValidation(t, 150),
        order: optionalStringValidation(t, 1)
    })
}

export const filterCoachFormValidationSchema = (t: TFunction) => {
    return yupResolver(filterCoachSchema(t))
}

export const filterFitnessFormValidationSchema = (t: TFunction) => {
    return yupResolver(filterFitnessSchema(t))
}