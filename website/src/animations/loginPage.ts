import { gsap, Power3 } from "gsap";
import { fadeIn, fadeOff } from "./effects";

export const handleFirstState = (login: gsap.TweenTarget, change: gsap.TweenTarget) => {
  const tl = gsap.timeline();
  tl.addLabel("start")
    .to(login, { right: "0%", duration: 1, ease: Power3.easeOut }, "start")
    .add(fadeIn(login, { duration: 0.4, ease: "linear" }), "start")
    .to(change, { left: "100%", duration: 1, ease: Power3.easeOut }, "start")
    .add(fadeOff(change, { duration: 0.4, ease: "linear" }), "start");
};

export const handleSecondState = (login: gsap.TweenTarget, change: gsap.TweenTarget) => {
  const tl = gsap.timeline();
  tl.addLabel("start")
    .to(login, { right: "100%", duration: 1, ease: Power3.easeOut }, "start")
    .add(fadeOff(login, { duration: 0.4, ease: "linear" }), "start")
    .to(change, { left: "0%", duration: 1, ease: Power3.easeOut }, "start")
    .add(fadeIn(change, { duration: 0.4, ease: "linear" }), "start");
};
