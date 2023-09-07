import { useAppContext } from "src/hooks";

export type Breakpoints = ReturnType<typeof useBreakpoint>;

export const useBreakpoint = () => {
  const { width } = useAppContext();
  if (width) {
    if (width < 360) {
      return "toMobile";
    }
    if (width > 360 && width <= 760) {
      return "fromMobile";
    }
    if (width > 760 && width <= 980) {
      return "fromTablet";
    }
    if (width > 980 && width <= 1300) {
      return "fromDesktop";
    }
    return "fromWide";
  }
};
