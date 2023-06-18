import { fadeIn, fadeOff } from "./effects";
import { gsap } from "gsap";

export const showTooltip = (tooltip: gsap.TweenTarget) => {
  fadeIn(tooltip, { displayInitial: "initial", displayAfter: "initial" });
};

export const hideTooltip = (tooltip: gsap.TweenTarget) => {
  fadeOff(tooltip, { displayInitial: "initial", displayAfter: "none" });
};
