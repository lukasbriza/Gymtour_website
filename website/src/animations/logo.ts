import { setState } from "@app";
import { fadeIn, fadeOff, fill, stroke } from "@animations";
import { gsap } from "gsap";

export const bigLogoAnimation = (
  bigLogoWrapper: HTMLDivElement,
  logoPath: SVGPathElement,
  textArray: SVGPathElement[],
  setShowLogo: setState<boolean>,
  setBigLogoPlayed: setState<boolean>
) => {
  const endLogic = () => {
    setTimeout(() => {
      setShowLogo(true);
      setBigLogoPlayed(true);
    }, 2000);
  };

  const tl = gsap.timeline();
  tl.addLabel("fill", 2)
    .set(bigLogoWrapper, { display: "flex" })
    .add(stroke(logoPath))
    .add(fill(logoPath, { duration: 1.5 }), "fill")
    .add(fadeIn(textArray, { delay: 2, duration: 1 }))
    .add(fadeOff(bigLogoWrapper, { delay: 0.5, duration: 0.7 }))
    .then(endLogic);

  return tl;
};

export const smallLogoShow = () => {
  const logoText = gsap.utils.toArray(".logoText").reverse();

  const tl = gsap.timeline();
  tl.add(fadeIn(".logoPath", { stagger: 0 })).add(
    fadeIn(logoText, { duration: 0.4, stagger: 0.1, delay: 0.3 }),
    "+=0.2"
  );

  return tl;
};
