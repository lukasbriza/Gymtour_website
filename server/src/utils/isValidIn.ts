import { errorMessages } from "../config";
import { APIError } from "./customErrors";

export const isValidIn = (IN: number) => {
  const inNumber = IN.toString();

  if (inNumber.length !== 8) {
    return new APIError(errorMessages.inValidation.inLength);
  }

  const inArr = inNumber.split("");

  let result = 0;
  for (let i = 0; i < inArr.length - 1; i++) {
    result = result + Number(inArr[i]) * (inArr.length - i);
  }

  if (result % 11 !== 0) {
    return new APIError(errorMessages.inValidation.wrongInValue);
  }

  return true;
};
