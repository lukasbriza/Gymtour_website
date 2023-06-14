import { gsap } from "gsap";
import { fadeIn, fadeOff } from "./effects";

export const showCards = () => {
  const tl = gsap.timeline();
  tl.add(fadeIn(".searchItem", { displayInitial: "block", displayAfter: "block", stagger: 0.2, duration: 0.5 }));

  return tl;
};

export const filterOn = (wrapper: HTMLElement) => {
  const tl = gsap.timeline();
  tl.set(wrapper, { opacity: 1, display: "initial" })
    .addLabel("start")
    .fromTo(wrapper, { width: "0%" }, { width: "100%", duration: 4, ease: Power2.easeOut }, "start")
    .to(wrapper, { paddingLeft: "15px", duration: 1, ease: Power2.easeOut }, "start")
    .add(fadeIn(".filterSection", { displayInitial: "none", displayAfter: "block", stagger: 0.1, duration: 0.3 }))
    .add(fadeIn(".contentFilterButton", { displayInitial: "none", displayAfter: "block", duration: 0.3, delay: 0.8 }));

  return tl;
};

export const filterOff = (wrapper: HTMLElement) => {
  const sections = gsap.utils.toArray(".filterSection").reverse();
  const tl = gsap.timeline();
  tl.add(
    fadeOff(".contentFilterButton", {
      displayInitial: "block",
      displayAfter: "none",
      duration: 0.3,
    })
  )
    .add(fadeOff(sections, { displayInitial: "block", displayAfter: "none", stagger: 0.1, duration: 0.3 }))
    .addLabel("start")
    .to(wrapper, { paddingLeft: "0px", duration: 1, delay: 1, ease: Power2.easeOut }, "start")
    .fromTo(wrapper, { width: "100%" }, { width: "0%", duration: 1.5, delay: 1, ease: Power2.easeOut }, "start")
    .to(wrapper, { opacity: 0, display: "none", delay: 0.5 });
};
