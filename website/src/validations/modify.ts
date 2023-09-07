import { object, number, date, string, array } from "yup"
import { TFunction } from "i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    OpenObject,
    emailValidation,
    fullDescriptionValidation,
    houseNumberValidation,
    inValidation,
    multipleChoiceFilterValidation,
    noSpecialCharactersValidation,
    optionalBooleanValidation,
    optionalStringValidation,
    requiredBooleanValidation,
    requiredMinMaxValidation,
    requiredNumberValidation,
    telValidation,
    webValidation
} from "./common";

const pictureYup = object({
    lastModified: number(),
    lastModifiedDate: date(),
    name: string(),
    size: number(),
    type: string().optional(),
    webkitRelativPath: string().optional()
})

const contactValidation = (t: TFunction) => {
    return {
        email: emailValidation(t),
        web: webValidation(t),
        mobile: telValidation(t),
        tel: telValidation(t),

        facebook: webValidation(t),
        instagram: webValidation(t),
        youtube: webValidation(t),
        twitter: webValidation(t),
        google: webValidation(t),
    }
}

const picturesValidation = (t: TFunction) => {
    return {
        mainPicture: pictureYup.required(t("validation.required")),
        cardPicture: pictureYup.required(t("validation.required")),
        othersPictures: array().of(pictureYup).optional()
    }
}

const coachSchema = (t: TFunction) => {
    return object({
        terms: requiredBooleanValidation(t, t("validation.noAgreement")),
        dataProcessingForPropagation: optionalBooleanValidation(t),

        coachName: noSpecialCharactersValidation(requiredMinMaxValidation(t, 1, 99), t),
        coachSurname: noSpecialCharactersValidation(requiredMinMaxValidation(t, 1, 99), t),
        alias: noSpecialCharactersValidation(optionalStringValidation(t, 200), t),
        workPlace: noSpecialCharactersValidation(requiredMinMaxValidation(t, 1, 200), t),
        region: requiredNumberValidation(t),
        town: requiredNumberValidation(t),
        street: noSpecialCharactersValidation(requiredMinMaxValidation(t, 1, 149), t),
        houseNumber: houseNumberValidation(t, 50),

        priceLevel: requiredNumberValidation(t),

        gender: string().required(t("validation.required")),
        specialization: multipleChoiceFilterValidation(),
        others: multipleChoiceFilterValidation(),

        ...contactValidation(t),
        descriptionFull: fullDescriptionValidation(t),
        ...picturesValidation(t)
    })
}

const fitnessSchema = (t: TFunction) => {
    return object({
        terms: requiredBooleanValidation(t, t("validation.noAgreement")),
        dataProcessingForPropagation: optionalBooleanValidation(t),

        name: noSpecialCharactersValidation(requiredMinMaxValidation(t, 1, 200), t),
        IN: inValidation(t),
        region: requiredNumberValidation(t),
        town: requiredNumberValidation(t),
        street: noSpecialCharactersValidation(requiredMinMaxValidation(t, 1, 149), t),
        houseNumber: houseNumberValidation(t, 50),

        priceLevel: requiredNumberValidation(t),

        open: object({
            fri: OpenObject(t),
            mon: OpenObject(t),
            sat: OpenObject(t),
            sun: OpenObject(t),
            thu: OpenObject(t),
            tue: OpenObject(t),
            wed: OpenObject(t)
        }),

        general: multipleChoiceFilterValidation(),
        equipment: multipleChoiceFilterValidation(),
        others: multipleChoiceFilterValidation(),

        ...contactValidation(t),
        descriptionFull: fullDescriptionValidation(t),
        ...picturesValidation(t)
    })
}

export const modifyCoachFormValidationSchema = (t: TFunction) => {
    return yupResolver(coachSchema(t))
}

export const modifyFitnessFormValidationSchema = (t: TFunction) => {
    return yupResolver<any>(fitnessSchema(t))
}