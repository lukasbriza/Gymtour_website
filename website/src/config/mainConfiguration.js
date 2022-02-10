import { gsap } from "gsap";

import { Home } from "../Pages/Home";
import { Crossroad } from "../Pages/Crossroad";
import { Fitness } from "../Pages/Fitness";
import { Coach } from "../Pages/Coach";
import { NotFound } from "../Pages/NotFound";
import { About } from "../Pages/About";
import { CoOp } from "../Pages/CoOp";
import { Contact } from "../Pages/Contact";
import { classListMaker } from "../Functions/classListMaker";

import { text } from "./textSource";

const config = {
  transitionTimeout: 500,
  breakpoints: {
    mobile: 360,
    tablet: 760,
    pc: 980,
    wide: 1300,
  },
  routes: {
    mainPage: { name: "Hlavní stránka", path: "/", component: Home },
    crossroad: { name: "Rozcestí", path: "/crossroad", component: Crossroad },
    fitness: { name: "Fitness", path: "/fitness", component: Fitness },
    coach: { name: "Trenéři", path: "/coach", component: Coach },
    aboutUs: { name: "O nás", path: "/about", component: About },
    coOp: { name: "Spolupráce", path: "/coop", component: CoOp },
    contact: { name: "Kontakt", path: "/contact", component: Contact },
    notFound: { name: "404", path: "*", component: NotFound },
  },
  menuItems: {
    mainPage: { name: text.menu.cz[0], path: "/", component: Home },
    aboutUs: { name: text.menu.cz[1], path: "/about", component: About },
    coOp: { name: text.menu.cz[2], path: "/coop", component: CoOp },
    contact: { name: text.menu.cz[3], path: "/contact", component: Contact },
  },
  basePageClassList: classListMaker(["absolute", "stretch", "minorColor2"]),
};

const animationStore = {
  menu: {
    logo: {
      logoIn: () => {
        gsap.effects.fadeIn(".logoPath", { stagger: 0 });
      },
      logoTextIn: () => {
        let logoText = gsap.utils.toArray(".logoText");
        logoText.reverse();
        gsap.effects.fadeIn(logoText, {
          duration: 0.4,
          stagger: 0.1,
          delay: 0.3,
        });
      },
    },
    hamburger: {
      crossOn: (slices) => {
        gsap.effects.crossOn(slices[0], slices[1], slices[2]);
      },
      crossOff: (slices) => {
        gsap.effects.crossOff(slices[0], slices[1], slices[2]);
      },
      show: (wrapper) => {
        gsap.effects.fadeIn(wrapper, {
          displayInitial: "none",
          displayAfter: "grid",
          displayDuration: 0.5,
        });
      },
      hide: (wrapper) => {
        gsap.effects.fadeOff(wrapper, {
          displayInitial: "grid",
          displayAfter: "none",
          displayDuration: 0.5,
        });
      },
    },
    menuOffer: {
      show: () => {
        gsap.effects.fadeIn(".offerItem", {
          displayInitial: "grid",
          displayAfter: "grid",
        });
      },
      hide: () => {},
    },
    layer: {
      show: (layer) => {
        let tl = gsap.timeline();
        tl.layerOn(layer).fadeIn(".offerItem-layer", {
          displayInitial: "none",
          displayAfter: "grid",
          delay: 1,
        });
      },
      hide: (layer) => {
        let tl = gsap.timeline();
        tl.fadeOff(".offerItem-layer", {
          displayInitial: "grid",
          displayAfter: "none",
          duration: 0.5,
        }).layerOff(layer, { delay: 1 });
      },
    },
  },
  home: {
    logo: {
      show: (
        bigLogoWrapper,
        logoPath,
        textArray,
        showLogoCallback,
        bigLogoPlayedCallback
      ) => {
        let tl = gsap.timeline();
        tl.addLabel("fill", 2)
          .displayPrepare(bigLogoWrapper, { from: "none", to: "flex" })
          .stroke(logoPath, {})
          .fill(logoPath, { duration: 1.5 }, "fill")
          .fadeIn(textArray, { delay: 2, duration: 1 });
        tl.then(() =>
          gsap.effects.fadeOff(bigLogoWrapper, { delay: 1.5, duration: 0.7 })
        ).then(() => {
          setTimeout(() => {
            showLogoCallback(false);
            bigLogoPlayedCallback(true);
          }, 2000);
        });
      },
    },
    mainHeader: {
      show: () => {
        let homeheader = gsap.utils.toArray(".homeHeader");
        let tl = gsap.timeline();
        tl.fadeIn(homeheader, {
          stagger: 0.3,
          delay: 0.5,
          duration: 1,
        })
          .fadeIn("#pageHeader", {
            delay: 1.5,
            duration: 1,
            displayAfter: "flex",
          })
          .fadeIn("#homeButton", { delay: 1.5, duration: 1 });
      },
    },
  },
};

export { config, animationStore };
