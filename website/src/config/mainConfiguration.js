import { gsap, Power2, Power3 } from "gsap";
import { classListMaker } from "../Functions/classListMaker";
import { ReactLazyPreload } from "../Functions/ReactLazyPreload.ts";
import { text } from "./textSource";

///////////////////////////////////////////////////////////////////
//CODE SPLIT ON ROUTES//
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

const Login = ReactLazyPreload(() => import("../Pages/Login"));
const Dashboard = ReactLazyPreload(() => import("../Pages/Dashboard"));
const EmailUpdate = ReactLazyPreload(() => import("../Pages/EmailUpdate"));
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
    mainPage: { name: "Hlavní stránka", path: "/", component: Home },
    crossroad: { name: "Rozcestí", path: "/crossroad", component: Crossroad },
    fitness: { name: "Fitness", path: "/fitness", component: Fitness },
    coach: { name: "Trenéři", path: "/coach", component: Coach },
    aboutUs: { name: "O nás", path: "/about", component: About },
    coOp: { name: "Spolupráce", path: "/coop", component: CoOp },
    contact: { name: "Kontakt", path: "/contact", component: Contact },
    login: { name: "Login", path: "/login", component: Login },
    dashboard: { name: "Účet", path: "/dashboard", component: Dashboard },
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
    emailUpdate: {
      name: "Email update",
      path: "/emailUpdate",
      component: EmailUpdate,
    },
    notFound: { name: "404", path: "*", component: NotFound },
  },
  menuItems: {
    mainPage: { name: text.menu.cz[0], path: "/", component: Home },
    aboutUs: { name: text.menu.cz[1], path: "/about", component: About },
    coOp: { name: text.menu.cz[2], path: "/coop", component: CoOp },
    contact: { name: text.menu.cz[3], path: "/contact", component: Contact },
  },
  filter: {
    avoidFilterTypes: {
      fitness: ["gender", "specialization"],
      coach: ["equipment", "general"],
    },
    typesHeight: {
      order: 43,
      regions: 88,
      equipment: 172,
      general: 86,
      specialization: 86,
      others: 65,
      gender: 43,
    },
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
    show: (target) => {
      let tl = gsap.timeline();
      tl.fadeInto(target, { displayAfter: "grid" });
      return tl;
    },
    hide: (target) => {
      let tl = gsap.timeline();
      tl.fadeOffto(target, { displayAfter: "none" });
      return tl;
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
        tl.to(wrapper, { opacity: 1, display: "initial" }, 0)
          .addLabel("start")
          .filterOn(
            wrapper,
            {
              widthFrom: "0%",
              widthTo: "100%",
              widthDuration: 4,
            },
            "start"
          )
          .to(
            wrapper,
            {
              paddingLeft: "15px",
              duration: 1,
              ease: Power2.easeOut,
            },
            "start"
          )
          .fadeIn(".filterSection", {
            displayInitial: "none",
            displayAfter: "block",
            stagger: 0.1,
            duration: 0.3,
          })
          .fadeIn(".contentFilterButton", {
            displayInitial: "none",
            displayAfter: "block",
            duration: 0.3,
            delay: 0.8,
          });
        return tl;
      },
      hide: (wrapper) => {
        let arr = gsap.utils.toArray(".filterSection");
        arr = arr.reverse();
        let tl = gsap.timeline();
        tl.fadeOff(".contentFilterButton", {
          displayInitial: "block",
          displayAfter: "none",
          duration: 0.3,
        })
          .fadeOff(arr, {
            displayInitial: "block",
            displayAfter: "none",
            stagger: 0.1,
            duration: 0.3,
          })
          .addLabel("start")
          .to(
            wrapper,
            {
              paddingLeft: "0px",
              duration: 1,
              delay: 1,
              ease: Power2.easeOut,
            },
            "start"
          )
          .filterOff(
            wrapper,
            {
              delay: 1,
              widthFrom: "100%",
              widthTo: "0%",
              widthDuration: 1.5,
            },
            "start"
          )
          .to(wrapper, { opacity: 0, display: "none", delay: 0.5 });
        return tl;
      },
      arrowUp: (arrow, typesWrapper, containerHeight) => {
        let tl = gsap.timeline();
        tl.to(typesWrapper, {
          height: containerHeight + "px",
          duration: 0.0025,
          ease: "none",
        })
          .addLabel("start")
          .to(
            arrow,
            {
              transform: "rotate(-179deg)",
              duration: 1,
              ease: Power3.easeOut,
            },
            "start"
          )
          .fadeOff(
            typesWrapper,
            {
              displayInitial: "flex",
              displayAfter: "flex",
              stagger: 0,
              duration: 0.25,
              delay: 0,
            },
            "start"
          )
          .to(
            typesWrapper,
            {
              height: 0 + "px",
              ease: Power2.easeOut,
              duration: 0.2,
              delay: 0.7,
            },
            "start"
          )
          .to(typesWrapper, {
            display: "none",
            duration: 0.0025,
            ease: "none",
          });
      },
      arrowDown: (arrow, typesWrapper, containerHeight) => {
        let tl = gsap.timeline();
        tl.addLabel("arrow")
          .to(
            typesWrapper,
            {
              height: containerHeight + "px",
              duration: 0.5,
              ease: Power2.easeOut,
            },
            "arrow"
          )
          .to(
            arrow,
            {
              transform: "rotate(0deg)",
              duration: 1,
              ease: Power3.easeOut,
            },
            "arrow"
          )
          .addLabel("start")
          .fadeIn(
            typesWrapper,
            {
              displayInitial: "none",
              displayAfter: "flex",
              stagger: 0,
              duration: 1,
              delay: 0,
            },
            "start"
          );
      },
    },
    card: {
      init: (elements) => {
        let tl = gsap.timeline();
        tl.fadeIn(elements, {
          displayInitial: "block",
          displayAfter: "block",
          stagger: 0.2,
          duration: 0.5,
        });
        return tl;
      },
    },
  },
  coach: {
    filter: {
      show: (wrapper) => {
        let tl = gsap.timeline();
        tl.to(wrapper, { opacity: 1, display: "initial" }, 0)
          .addLabel("start")
          .filterOn(
            wrapper,
            {
              widthFrom: "0%",
              widthTo: "100%",
              widthDuration: 4,
            },
            "start"
          )
          .to(
            wrapper,
            {
              paddingLeft: "15px",
              duration: 1,
              ease: Power2.easeOut,
            },
            "start"
          )
          .fadeIn(".filterSection", {
            displayInitial: "none",
            displayAfter: "block",
            stagger: 0.1,
            duration: 0.3,
          })
          .fadeIn(".contentFilterButton", {
            displayInitial: "none",
            displayAfter: "block",
            duration: 0.3,
            delay: 0.8,
          });
        return tl;
      },
      hide: (wrapper) => {
        let arr = gsap.utils.toArray(".filterSection");
        arr = arr.reverse();
        let tl = gsap.timeline();
        tl.fadeOff(".contentFilterButton", {
          displayInitial: "block",
          displayAfter: "none",
          duration: 0.3,
        })
          .fadeOff(arr, {
            displayInitial: "block",
            displayAfter: "none",
            stagger: 0.1,
            duration: 0.3,
          })
          .addLabel("start")
          .to(
            wrapper,
            {
              paddingLeft: "0px",
              duration: 1,
              delay: 1,
              ease: Power2.easeOut,
            },
            "start"
          )
          .filterOff(
            wrapper,
            {
              delay: 1,
              widthFrom: "100%",
              widthTo: "0%",
              widthDuration: 1.5,
            },
            "start"
          )
          .to(wrapper, { opacity: 0, display: "none", delay: 0.5 });
        return tl;
      },
      arrowUp: (arrow, typesWrapper, containerHeight) => {
        let tl = gsap.timeline();
        tl.to(typesWrapper, {
          height: containerHeight + "px",
          duration: 0.0025,
          ease: "none",
        })
          .addLabel("start")
          .to(
            arrow,
            {
              transform: "rotate(-179deg)",
              duration: 1,
              ease: Power3.easeOut,
            },
            "start"
          )
          .fadeOff(
            typesWrapper,
            {
              displayInitial: "flex",
              displayAfter: "flex",
              stagger: 0,
              duration: 0.25,
              delay: 0,
            },
            "start"
          )
          .to(
            typesWrapper,
            {
              height: 0 + "px",
              ease: Power2.easeOut,
              duration: 0.2,
              delay: 0.7,
            },
            "start"
          )
          .to(typesWrapper, {
            display: "none",
            duration: 0.0025,
            ease: "none",
          });
      },
      arrowDown: (arrow, typesWrapper, containerHeight) => {
        let tl = gsap.timeline();
        tl.addLabel("arrow")
          .to(
            typesWrapper,
            {
              height: containerHeight + "px",
              duration: 0.5,
              ease: Power2.easeOut,
            },
            "arrow"
          )
          .to(
            arrow,
            {
              transform: "rotate(0deg)",
              duration: 1,
              ease: Power3.easeOut,
            },
            "arrow"
          )
          .addLabel("start")
          .fadeIn(
            typesWrapper,
            {
              displayInitial: "none",
              displayAfter: "flex",
              stagger: 0,
              duration: 1,
              delay: 0,
            },
            "start"
          );
      },
    },
    card: {
      init: (elements) => {
        let tl = gsap.timeline();
        tl.fadeIn(elements, {
          displayInitial: "block",
          displayAfter: "block",
          stagger: 0.2,
          duration: 0.5,
        });
        return tl;
      },
    },
  },
  dashboard: {
    sidebarHamburger: {
      crossOn: async (slices) => {
        const tl = gsap.timeline();
        tl.then(gsap.effects.crossOn(slices[0], slices[1], slices[2]));
        return tl;
      },
      crossOff: (slices) => {
        const tl = gsap.timeline();
        tl.then(gsap.effects.crossOff(slices[0], slices[1], slices[2]));
        return tl;
      },
    },
    menuShift: {
      on: async (menu, hmbBackground, slices, items) => {
        const tl = gsap.timeline();
        tl.addLabel("start")
          .to(
            menu,
            {
              width: "100%",
              duration: 2,
              ease: Power3.easeOut,
            },
            "start"
          )
          .to(
            hmbBackground,
            {
              backgroundColor: "transparent",
              duration: 0.5,
              ease: "linear",
            },
            "start"
          )
          .to(
            hmbBackground,
            {
              right: "10px",
              duration: 0.5,
              ease: Power3.easeOut,
            },
            "start"
          )
          .to(
            slices,
            {
              backgroundColor: "white",
              duration: 0.5,
              ease: "linear",
            },
            "start"
          )
          .fadeIn(items, { delay: 0.75, displayAfter: "initial" });
        return tl;
      },
      off: async (menu, hmbBackground, slices, items) => {
        const fadeoddDelay = 1;
        const tl = gsap.timeline();
        tl.fadeOff(items, { delay: 0, displayAfter: "none", stagger: 0.1 })
          .addLabel("start")
          .to(
            menu,
            {
              width: "0%",
              duration: 2,
              delay: fadeoddDelay,
              ease: Power2.easeOut,
            },
            "start"
          )
          .to(
            hmbBackground,
            {
              backgroundColor: "white",
              delay: fadeoddDelay + 0.5,
              duration: 0.5,
              ease: Power2.easeOut,
            },
            "start"
          )
          .to(
            hmbBackground,
            {
              right: "-70px",
              duration: 1,
              delay: fadeoddDelay + 0.3,
              ease: "linear",
            },
            "start"
          )
          .to(
            slices,
            {
              backgroundColor: "black",
              delay: 0.3 + fadeoddDelay,
              duration: 0.5,
              ease: "linear",
            },
            "start"
          );
        return tl;
      },
    },
  },
  emailUpdate: {
    content: {
      show: (target) => {
        const tl = gsap.timeline();
        tl.fadeIn(target, {
          displayInitial: "none",
          displayAfter: "flex",
          stagger: 0,
        });
      },
    },
  },
};

export { config, animationStore };
