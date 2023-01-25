import { gsap, Sine } from "gsap";

type strokeConfig = {
  strokeDasharrayInitial?: string;
  strokeDashoffsetInitial?: string;
  strokeDashoffset?: number;
  duration?: number;
};
export const stroke = (target: gsap.TweenTarget, config: strokeConfig = {}) => {
  const anConfig = {
    duration: config.duration ?? 3,
    strokeDasharrayInitial: config.strokeDasharrayInitial ?? "250%",
    strokeDashoffsetInitial: config.strokeDashoffsetInitial ?? "250%",
    strokeDashoffset: config.strokeDashoffset ?? 0,
  };
  return gsap.fromTo(
    target,
    { strokeDasharray: anConfig.strokeDasharrayInitial, strokeDashoffset: anConfig.strokeDashoffsetInitial },
    { strokeDashoffset: anConfig.strokeDashoffset, ease: Sine.easeInOut, duration: anConfig.duration }
  );
};

type fillConfig = {
  fill?: string;
  duration?: number;
};
export const fill = (target: gsap.TweenTarget, config: fillConfig = {}) => {
  const anConfig = {
    duration: config.duration ?? 1,
    fill: config.fill ?? "white",
  };
  return gsap.fromTo(
    target,
    { fill: "transparent" },
    { fill: anConfig.fill, duration: anConfig.duration, ease: Power2.easeInOut }
  );
};

type fadeInConfig = {
  displayInitial?: string;
  displayAfter?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
};
export const fadeIn = (target: gsap.TweenTarget, config: fadeInConfig = {}) => {
  const anConfig = {
    displayInitial: config.displayInitial ?? "initial",
    displayAfter: config.displayAfter ?? "initial",
    stagger: config.stagger ?? 0.2,
    duration: config.duration ?? 0.5,
    delay: config.delay ?? 0,
  };
  const tl = gsap.timeline();
  tl.fromTo(
    target,
    { display: anConfig.displayInitial, opacity: 0 },
    {
      duration: anConfig.duration,
      opacity: 1,
      delay: anConfig.delay,
      stagger: anConfig.stagger,
      display: anConfig.displayAfter,
      ease: Power3.easeIn,
    }
  );
  return tl;
};

type fadeOffConfig = {
  delay?: number;
  displayInitial?: string;
  displayAfter?: string;
  startOpacity?: number;
  duration?: number;
  stagger?: number;
};
export const fadeOff = (target: gsap.TweenTarget, config: fadeOffConfig = {}) => {
  const anConfig = {
    delay: config.delay ?? 0,
    stagger: config.stagger ?? 0,
    duration: config.duration ?? 0,
    startOpacity: config.startOpacity ?? 1,
    displayInitial: config.displayInitial ?? "initial",
    displayAfter: config.displayAfter ?? "none",
  };

  const tl = gsap.timeline();
  tl.set(target, { display: anConfig.displayInitial })
    .fromTo(
      target,
      { opacity: anConfig.startOpacity },
      { opacity: 0, delay: anConfig.delay, duration: anConfig.duration, stagger: anConfig.stagger, ease: Power3.easeIn }
    )
    .set(target, { display: config.displayAfter });
  return tl;
};
