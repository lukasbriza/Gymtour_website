import { string, boolean, number, array, object, StringSchema } from "yup"
import { TFunction } from "i18next";

export const requiredStringValidation = (t: TFunction, max: number) => {
  return string().max(max, t("validation.max", { max: max }))
    .required(t("validation.required")).typeError(t("validation.textRequired"))
};

export const optionalStringValidation = (t: TFunction, max: number) => {
  return string().max(max, t("validation.max", { max: max })).optional()
}

export const requiredEmailValidaiton = (t: TFunction, max: number) => {
  return string().email(t("validation.wrongFormat"))
    .max(max, t("validation.max", { max: max })).required(t("validation.required"))
    .typeError(t("validation.textRequired"))

};

export const requiredMinMaxValidation = (t: TFunction, min: number, max: number) => {
  return string().min(min, t("validation.min"))
    .max(max, t("validation.max", { max: max })).required(t("validation.required"))
    .typeError(t("validation.textRequired"))
};

export const requiredBooleanValidation = (t: TFunction, message?: string) => {
  return boolean().equals([true], message ?? t("validation.required"))
    .required(t("validation.required")).typeError(t("validation.booleanRequired"))
};

export const optionalBooleanValidation = (t: TFunction, message?: string) => {
  return boolean().optional().typeError(t("validation.booleanRequired"))
};

export const requiredNumberValidation = (t: TFunction, message?: string) => {
  return number().required(message ?? t("validation.required"))
}

export const houseNumberValidation = (t: TFunction, maxLenght: number) => {
  return string().required(t("validation.required")).test("houseNumberValidation", t("validation.wrongFormat"), (value) => {
    const reg = new RegExp(/[0-9/]/)
    return reg.test(value)
  }).max(maxLenght, t("validation.max", { max: maxLenght }))
}

export const multipleChoiceFilterValidation = () => {
  return array().of(string()).min(0)
}

export const emailValidation = (t: TFunction) => {
  return string().required(t("validation.required"))
    .test("emailValidation", t("validation.wrongFormat"), (value) => {
      const reg = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      return reg.test(value)
    })
}

export const webValidation = (t: TFunction) => {
  return string().test("webValidation", t("validation.webFormat"), (value) => {
    if (value) {
      const reg = new RegExp(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/)
      return reg.test(value)
    }
    return true
  }).optional()
}

export const telValidation = (t: TFunction) => {
  return string().test("telValidation", t("validation.wrongFormat"), (value) => {
    if (value) {
      const reg = new RegExp(/[0-9]/)
      return reg.test(value)
    }
    return true
  }).length(9, t("validation.requiredLenght", { lenght: 9 })).optional()
}

export const fullDescriptionValidation = (t: TFunction) => {
  return noSpecialCharactersValidation(requiredMinMaxValidation(t, 1, 2000), t)
}

export const noSpecialCharactersValidation = (schema: StringSchema, t: TFunction) => {
  return schema.test("noSpecialCharactersValidation", t("validation.unAuthorizedCharacter"), (value) => {
    if (value) {
      const reg = new RegExp(/[^0-9a-zA-Z.()\[\]+\-ěščřžýáíéňťďĚŠČŘŽÝÁÍÉŇŤĎÚ:?_!"&/=´úů§<>, ]/, "g")
      return !reg.test(value)
    }
    return true
  })
}

export const regionValidation = (t: TFunction) => {
  return number().min(1, t("validation.outOfRange")).max(14, t("validation.outOfRange")).required(t("validation.required"))
    .typeError(t("validation.numberRequired"))
}

export const OpenObject = (t: TFunction) => {
  const getHours = (val: string) => Number(val.split(":")[0])
  const getMinutes = (val: string) => Number(val.split(":")[1])
  return object({
    from: string().test("openHourValidation-from", t("validation.fromBiggerThanTo"), (value, context) => {
      if (value === "" || value === undefined || context.parent.to === "" || context.parent.to === undefined) {
        return true
      }

      const fromValue = new Date(2000, 10, 10, getHours(value), getMinutes(value), 0, 0)
      const toValue = new Date(2000, 10, 10, getHours(context.parent.to), getMinutes(context.parent.to), 0, 0)
      if (fromValue > toValue) {
        return false
      }
      return true
    }).test("fromToFilled-from", t("validation.fromToFilled"), (value, context) => {
      if ((value !== undefined && value !== "") && (context.parent.to === undefined || context.parent.to === "")) {
        return false
      }
      return true
    }),

    to: string().test("openHourValidation-to", t("validation.fromBiggerThanTo"), (value, context) => {
      if (value === "" || value === undefined || context.parent.from === "" || context.parent.from === undefined) {
        return true
      }

      const fromValue = new Date(2000, 10, 10, getHours(context.parent.from), getMinutes(context.parent.from), 0, 0)
      const toValue = new Date(2000, 10, 10, getHours(value), getMinutes(value), 0, 0)
      if (toValue < fromValue) {
        return false
      }
      return true
    }).test("fromToFilled-to", t("validation.fromBiggerThanTo"), (value, context) => {
      if ((value !== undefined && value !== "") && (context.parent.from === undefined || context.parent.from === "")) {
        return false
      }
      return true
    })
  })
}

export const inValidation = (t: TFunction) => {
  return number().required(t("validation.required"))
    .test("inValidation", t("validation.invalidIN"), (value) => {
      const stringValue = String(value)
      const parsed = stringValue.split("")

      if (stringValue.length < 8 || stringValue.length > 8) {
        return false
      }

      const withoutLast = parsed
      const lastNumber = withoutLast.pop()

      let temp = 0
      withoutLast.forEach((val, index) => {
        temp = temp + (Number(val) * (8 - index))
      })

      let rest = temp % 11

      if (lastNumber) {
        if (rest === 0 && Number(lastNumber) === 1) {
          return true
        }
        if (rest === 1 && Number(lastNumber) === 0) {
          return true
        }
        if (Number(lastNumber) === (11 - rest)) {
          return true
        }
      }
      return false
    })
}

