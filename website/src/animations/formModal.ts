import { gsap, Power3 } from "gsap";
import { fadeIn, fadeOff } from "./effects";

export const showFormModal = (modal: HTMLElement) => {
  const tl = gsap.timeline();
  tl.add(fadeIn(modal, { delay: 0, stagger: 0, duration: 0.5, displayInitial: "grid", displayAfter: "grid" }));

  return tl;
};

export const hideFormModal = (modal: HTMLElement) => {
  const tl = gsap.timeline();
  tl.add(fadeOff(modal, { delay: 0, stagger: 0, duration: 0.3, displayInitial: "grid", displayAfter: "none" }));

  return tl;
};

export const infiniteRotation = (circle: HTMLSpanElement) => {
  const tl = gsap.timeline();
  tl.fromTo(circle, { rotaion: 0 }, { rotation: 360, duration: 0.5, repeat: -1 });

  return tl;
};

export const loadingError = (circle: HTMLSpanElement, cb: () => void) => {
  gsap.getTweensOf(circle).map((tween) => {
    return tween.repeat(2);
  });
  const tl = gsap.timeline();
  tl.to(circle, {
    borderTopColor: "#ff2c2c",
    borderTopWidth: "5px",
    borderRightColor: "#ff2c2c",
    borderRightWidth: "5px",
    borderBottomColor: "#ff2c2c",
    borderBottomWidth: "5px",
    borderLeftColor: "#ff2c2c",
    borderLeftWidth: "5px",

    delay: 1.25,
    duration: 0.5,
    ease: Power3.easeOut,
  })
    .addLabel("crossStart")
    .to(
      "#Line_1",
      {
        strokeDashoffset: 0,
        duration: 1,
        delay: -0.5,
        ease: Power3.easeOut,
        onComplete: () => {
          cb();
        },
      },
      "crossStart"
    )
    .to(
      "#Line_2",
      {
        strokeDashoffset: 0,
        duration: 1,
        delay: -0.25,
        ease: Power3.easeOut,
      },
      "crossStart"
    );

  return tl;
};

export const errorAnimation = (error: SVGSVGElement, circle: SVGCircleElement, classes: string[]) => {
  const line1 = error.firstChild;
  const line2 = error.lastChild;

  const lineConfig = {
    strokeDashoffset: 0,
    duration: 1,
    ease: Power3.easeOut,
  };

  const tl = gsap.timeline();
  tl.addLabel("start")
    .to(line1, { delay: 1.1, ...lineConfig }, "start")
    .to(line2, { delay: 1.6, ...lineConfig }, "start")
    .to(circle, { delay: 0.75, strokeDashoffset: 0, duration: 1, ease: Power3.easeOut }, "start")
    .add(
      fadeIn(classes, { displayInitial: "block", displayAfter: "block", stagger: 0, delay: 0.75, duration: 1 }),
      "start"
    );
};

export const successAnimation = (success: SVGPathElement, circle: SVGCircleElement, classes: string[]) => {
  const tl = gsap.timeline();
  tl.addLabel("start")
    .to(circle, { delay: 0.75, strokeDashoffset: 0, duration: 1, ease: Power3.easeOut }, "start")
    .to(
      success,
      {
        delay: 1.1,
        strokeDashoffset: 0,
        duration: 1,
        ease: Power3.easeOut,
      },
      "start"
    )
    .add(
      fadeIn(classes, { displayInitial: "block", displayAfter: "block", stagger: 0, delay: 0.75, duration: 1 }),
      "start"
    );

  return tl;
};

export const showMessageButton = (section: HTMLDivElement) => {
  const tl = gsap.timeline();
  tl.add(
    fadeIn(section.children, { stagger: 0.3, duration: 0.5, displayInitial: "initial", displayAfter: "initial" })
  ).add(fadeIn(".modalButton", { duration: 0.5, delay: 0.25, displayInitial: "initial", displayAfter: "initial" }));

  return tl;
};
