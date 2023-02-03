import { smallLogoShow } from "@animations";
import { useAnimationContext } from "src/hooks/_index";

/**Init small logo animation on non Home pages */
export const useInitialSmallLogoLogic = () => {
  const { fn, smallLogoPlayed } = useAnimationContext();

  const initSmallLogoAnimation = () => {
    fn.setBigLogoPlayed(true);
    if (smallLogoPlayed === false) {
      smallLogoShow();
      fn.setSmallLogoPlayed(true);
    }
  };

  return { initSmallLogoAnimation };
};
