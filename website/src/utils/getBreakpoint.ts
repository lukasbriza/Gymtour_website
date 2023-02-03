import { BreakPoints } from "src/app/_index";

export const getBreakPoint = (width: number): BreakPoints => {
  if (width > 360) {
    return "fromMobile";
  }
  if (width > 760) {
    return "fromTablet";
  }
  if (width > 980) {
    return "fromDesktop";
  }
  if (width > 1300) {
    return "fromWide";
  }
  return "toMobile";
};
