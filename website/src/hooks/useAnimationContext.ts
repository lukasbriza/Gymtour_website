import { AnimationContext } from "src/app/_index";
import { useContext } from "react";

export const useAnimationContext = () => {
  const context = useContext(AnimationContext);
  return context;
};
