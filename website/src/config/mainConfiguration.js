import { gsap, Power2, Power3 } from "gsap";
import { classListMaker } from "../Functions/classListMaker";
import { ReactLazyPreload } from "../Functions/ReactLazyPreload.ts";
import { text } from "./textSource";

///////////////////////////////////////////////////////////////////
//CODE PSLIT ON ROUTES//
const Home = ReactLazyPreload(() => import("../Pages/Home"));
const Crossroad = ReactLazyPreload(() => import("../Pages/Crossroad"));
const Fitness = ReactLazyPreload(() => import("../Pages/Fitness"));
const Coach = ReactLazyPreload(() => import("../Pages/Coach"));
const NotFound = ReactLazyPreload(() => import("../Pages/NotFound"));
const About = ReactLazyPreload(() => import("../Pages/About"));
const CoOp = ReactLazyPreload(() => import("../Pages/CoOp"));
const Contact = ReactLazyPreload(() => import("../Pages/Contact"));
const BusinessConditions = ReactLazyPreload(() =>
  import("../Pages/BusinessConditions")
);
const DataProcessing = ReactLazyPreload(() =>
  import("../Pages/DataProcessing")
);
///////////////////////////////////////////////////////////////////

const config = {
  transitionTimeout: 500,
  breakpoints: {
    mobile: 360,
    tablet: 760,
    pc: 980,
    wide: 1300,
  },
  routes: {
    mainPage: {
      name: "Hlavní stránka",
      path: "/",
      component: Home,
    },
    crossroad: { name: "Rozcestí", path: "/crossroad", component: Crossroad },
    fitness: { name: "Fitness", path: "/fitness", component: Fitness },
    coach: { name: "Trenéři", path: "/coach", component: Coach },
    aboutUs: { name: "O nás", path: "/about", component: About },
    coOp: { name: "Spolupráce", path: "/coop", component: CoOp },
    contact: { name: "Kontakt", path: "/contact", component: Contact },
    businessConditions: {
      name: "Obchodní podmínky",
      path: "/businessconditions",
      component: BusinessConditions,
    },
    dataProcessing: {
      name: "Zpracování údajů",
      path: "/dataprocessing",
      component: DataProcessing,
    },
    notFound: { name: "404", path: "*", component: NotFound },
  },
  menuItems: {
    mainPage: { name: text.menu.cz[0], path: "/", component: Home },
    aboutUs: { name: text.menu.cz[1], path: "/about", component: About },
    coOp: { name: text.menu.cz[2], path: "/coop", component: CoOp },
    contact: { name: text.menu.cz[3], path: "/contact", component: Contact },
  },
  footerLinks1: [
    { name: text.footer.Section2.link1.cz, path: "/businessconditions" },
    { name: text.footer.Section2.link2.cz, path: "/dataprocessing" },
  ],
  footerLinks2: [
    { name: text.footer.Section3.link1.cz, path: "/" },
    { name: text.footer.Section3.link2.cz, path: "/coop" },
    { name: text.footer.Section3.link3.cz, path: "/about" },
    { name: text.footer.Section3.link4.cz, path: "/coach" },
    { name: text.footer.Section3.link5.cz, path: "/fitness" },
  ],
  basePageClassList: classListMaker(["relative", "stretch", "minorColor2"]),
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
        gsap.effects.fadeOffto(wrapper, {
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
      hide: () => {
        console.log("offer hide");
      },
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
          gsap.effects.fadeOff(bigLogoWrapper, { delay: 0.5, duration: 0.7 })
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
  crossroad: {
    modal: {
      show: (modal) => {
        let tl = gsap.timeline();
        tl.fadeIn(modal, {
          stagger: 0,
          delay: 0,
          displayInitial: "none",
          displayAfter: "grid",
          duration: 0.5,
        });
        return tl;
      },
      hide: (modal) => {
        let tl = gsap.timeline();
        tl.fadeOff(modal, {
          delay: 0,
          stagger: 0,
          duration: 0.3,
          displayInitial: "grid",
          displayAfter: "none",
        });
        return tl;
      },
      infiniteRotation: (circle) => {
        let tl = gsap.timeline();
        tl.infiniteRotation(circle, {
          startRotation: 0,
          endRotation: 360,
          duration: 0.5,
        });
        return tl;
      },
      loadingCompleteError: (circle, colorStart, colorEnd, callback) => {
        gsap.getTweensOf(circle).map((tween) => {
          return tween.repeat(2);
        });
        let tl = gsap.timeline();
        tl.loadingComplete(circle, {
          colorStart: colorStart,
          colorEnd: colorEnd,
          borderWidth: "5px",
          duration: 0.5,
          delay: 1.25,
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
                callback();
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
      },
      loadingCompleteSucess: (
        circle,
        colorStart,
        colorEnd,
        sucess,
        callback
      ) => {
        gsap.getTweensOf(circle).map((tween) => {
          return tween.repeat(3);
        });
        let tl = gsap.timeline();
        tl.loadingComplete(circle, {
          colorStart: colorStart,
          colorEnd: colorEnd,
          borderWidth: "5px",
          duration: 0.5,
          delay: 1.25,
        })
          .addLabel("sucessStart")
          .to(sucess, {
            strokeDashoffset: 0,
            duration: 1,
            ease: Power3.easeOut,
          })
          .then(() => {
            callback();
          });
      },
      showMsgBtn: (messageSection, button) => {
        let tl = gsap.timeline();
        tl.fadeIn(messageSection.children, {
          stagger: 0.3,
          duration: 0.5,
          displayInitial: "initial",
          displayAfter: "initial",
        }).fadeIn(button, {
          duration: 0.5,
          delay: 0.25,
          displayInitial: "initial",
          displayAfter: "initial",
        });
      },
    },
  },
  fitness: {
    filter: {
      show: (wrapper) => {
        let tl = gsap.timeline();
        tl.filterOn(wrapper, {
          widthFrom: "0%",
          widthTo: "100%",
          widthDuration: 2,
        });
        return tl;
      },
      hide: (wrapper) => {
        let tl = gsap.timeline();
        tl.filterOff(wrapper, {
          widthFrom: "100%",
          widthTo: "0%",
          widthDuration: 1.5,
        });
        return tl;
      },
    },
  },
};

export { config, animationStore };
