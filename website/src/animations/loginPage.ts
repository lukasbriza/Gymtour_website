import { gsap, Power3 } from "gsap";
import { fadeIn, fadeOff } from "./effects";

export const slideFromLeft = (leftEl: gsap.TweenTarget, rightEl: gsap.TweenTarget) => {
  const tl = gsap.timeline();
  tl.addLabel("start")
    .set(leftEl, { right: "100%", left: "unset" })
    .set(rightEl, { left: "0%", right: "unset" })
    .to(leftEl, { right: "0%", duration: 1, ease: Power3.easeOut }, "start")
    .add(fadeIn(leftEl, { duration: 0.4, ease: "linear" }), "start")
    .to(rightEl, { left: "100%", duration: 1, ease: Power3.easeOut }, "start")
    .add(fadeOff(rightEl, { duration: 0.4, ease: "linear" }), "start");
  return tl;
};

export const slideFromRight = (leftEl: gsap.TweenTarget, rightEl: gsap.TweenTarget) => {
  const tl = gsap.timeline();
  tl.addLabel("start")
    .set(leftEl, { right: "0%", left: "unset" })
    .set(rightEl, { left: "100%", right: "unset" })
    .to(leftEl, { right: "100%", duration: 1, ease: Power3.easeOut }, "start")
    .add(fadeOff(leftEl, { duration: 0.4, ease: "linear" }), "start")
    .to(rightEl, { left: "0%", duration: 1, ease: Power3.easeOut }, "start")
    .add(fadeIn(rightEl, { duration: 0.4, ease: "linear" }), "start");
  return tl;
};
