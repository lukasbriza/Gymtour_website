import { gsap } from "gsap";

type StartLoadingConfig = {
  height?: number;
  duration?: number;
  ease?: gsap.EaseFunction | string;
  stagger?: number;
};
export const startLoading = (lines: HTMLDivElement[], config: StartLoadingConfig = {}) => {
  const anConfig = {
    height: config.height ?? 12,
    duration: config.duration ?? 0.6,
    ease: config.ease ?? "linear",
    stagger: config.stagger ?? 0.2,
  };
  const lineAn = (line: HTMLDivElement) => {
    const tl = gsap.timeline();
    tl.to(line, {
      height: anConfig.height,
      duration: anConfig.duration,
      ease: anConfig.ease,
    })
      .to(line, {
        height: 2,
        duration: anConfig.duration,
        ease: anConfig.ease,
      })
      .repeat(-1);
  };

  const tl = gsap.timeline();
  lines.forEach((line, i) => {
    tl.call(
      () => {
        lineAn(line);
      },
      undefined,
      i * anConfig.stagger
    );
  });
  return tl;
};
