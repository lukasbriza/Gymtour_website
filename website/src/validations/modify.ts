import { object, number, date, string, array, mixed } from "yup"
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

const pictureYup = (t: TFunction) => mixed().test("file-test", t("validation.invalidFileFormat"), (value) => {
    if (typeof value === "object") {
        const file = value as File
        const resolver = !!(file.name &&
            file.size &&
            file.type)
        return resolver
    }
    return false
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
        mainPicture: pictureYup(t).required(t("validation.required")),
        cardPicture: pictureYup(t).required(t("validation.required")),
        othersPictures: array().of(pictureYup(t)).optional()
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
        specialization: multipleChoiceFilterValidation(t),
        others: multipleChoiceFilterValidation(t),

        ...contactValidation(t),
        descriptionFull: fullDescriptionValidation(t),
        ...picturesValidation(t)
    })
}

const fitnessSchema = (t: TFunction) => {
    return object({
        terms: requiredBooleanValidation(t, t("validation.noAgreement")),
        dataProcessingForPropagation: requiredBooleanValidation(t, t("validation.noAgreement")),

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

        general: multipleChoiceFilterValidation(t),
        equipment: multipleChoiceFilterValidation(t, true),
        others: multipleChoiceFilterValidation(t),

        descriptionFull: fullDescriptionValidation(t),
        ...contactValidation(t),
        ...picturesValidation(t)
    })
}

export const modifyCoachFormValidationSchema = (t: TFunction) => {
    return yupResolver<any>(coachSchema(t))
}

export const modifyFitnessFormValidationSchema = (t: TFunction) => {
    return yupResolver<any>(fitnessSchema(t))
}