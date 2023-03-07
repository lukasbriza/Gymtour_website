import { ErrorType } from "../types";

export const getStatus = (props: ErrorType[]): number => {
  if (props.length > 0) {
    return Number(props[0]["code"]);
  }
  return 200;
};
