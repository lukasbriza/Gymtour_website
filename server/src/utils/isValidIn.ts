import { errorMessages } from "../config";
import { APIError } from "./customErrors";

export const isValidIn = (IN: string) => {
  const inNumber = IN.toString();

  if (inNumber.length !== 8) {
    return new APIError(errorMessages.inValidation.inLength);
  }

  const parsed = inNumber.split("")
  const withoutLast = parsed
  const lastNumber = withoutLast.pop()

  let temp = 0
  withoutLast.forEach((val, index) => {
    temp = temp + (Number(val) * (8 - index))
  })

  const rest = temp % 11
  if (lastNumber) {
    if (rest === 0 && Number(lastNumber) === 1) {
      return
    }
    if (rest === 1 && Number(lastNumber) === 0) {
      return
    }
    if (Number(lastNumber) === (11 - rest)) {
      return
    }
  }
  return new APIError(errorMessages.inValidation.inLength);
};
