import { gsap } from "gsap";
import { fadeIn, fadeOff } from "./effects";

export const arrowUp = (arrow: HTMLDivElement, types: HTMLDivElement, height: number) => {
  const tl = gsap.timeline();
  tl.set(types, { height: `${height}px` })
    .addLabel("start")
    .to(arrow, { transform: "rotate(-179deg)", duration: 1, ease: Power3.easeOut }, "start")
    .add(
      fadeOff(types, { displayInitial: "flex", displayAfter: "flex", stagger: 0, duration: 0.25, delay: 0 }),
      "start"
    )
    .to(types, { height: "0px", ease: Power2.easeOut, duration: 0.2, delay: 0.7 }, "start")
    .set(types, { display: "none" });

  return tl;
};

export const arrowDown = (arrow: HTMLDivElement, types: HTMLDivElement, height: number) => {
  const tl = gsap.timeline();
  tl.addLabel("arrow")
    .to(types, { height: `${height}px`, duration: 0.5, ease: Power2.easeOut }, "arrow")
    .to(arrow, { transform: "rotate(0deg)", duration: 1, ease: Power3.easeOut }, "arrow")
    .addLabel("start")
    .add(fadeIn(types, { displayInitial: "flex", duration: 1, delay: 0, stagger: 0 }), "start");

  return tl;
};
