import { ReactLazyPreload } from "../utils/ReactLazyPreload";

const Home = ReactLazyPreload(() => import("../pages/Home"));
const Crossroad = ReactLazyPreload(() => import("../pages/Crossroad"));
const Fitness = ReactLazyPreload(() => import("../pages/Fitness"));
const Coach = ReactLazyPreload(() => import("../pages/Coach"));
const NotFound = ReactLazyPreload(() => import("../pages/NotFound"));
const About = ReactLazyPreload(() => import("../pages/About"));
const CoOp = ReactLazyPreload(() => import("../pages/CoOp"));
const Contact = ReactLazyPreload(() => import("../pages/Contact"));
const BusinessConditions = ReactLazyPreload(
  () => import("../pages/BusinessConditions")
);
const DataProcessing = ReactLazyPreload(
  () => import("../pages/DataProcessing")
);

const Login = ReactLazyPreload(() => import("../pages/login/Login"));
const Dashboard = ReactLazyPreload(() => import("../pages/Dashboard"));
const EmailUpdate = ReactLazyPreload(() => import("../pages/EmailUpdate"));

export const breakpoints = {
  mobile: 360,
  tablet: 760,
  pc: 980,
  wide: 1300,
} as const;

export const routes = {
  mainPage: { name: "routes:mainPage", path: "/", component: Home },
  crossroad: {
    name: "routes:crossroad",
    path: "/crossroad",
    component: Crossroad,
  },
  fitness: {
    name: "routes:fitness",
    path: "/fitness",
    component: Fitness,
  },
  coach: { name: "routes:coach", path: "/coach", component: Coach },
  aboutUs: { name: "routes:aboutUs", path: "/about", component: About },
  coOp: { name: "routes:coOp", path: "/coop", component: CoOp },
  contact: {
    name: "routes:contact",
    path: "/contact",
    component: Contact,
  },
  login: { name: "routes:login", path: "/login", component: Login },
  dashboard: {
    name: "routes:dashboard",
    path: "/dashboard",
    component: Dashboard,
  },
  businessConditions: {
    name: "routes:businessConditions",
    path: "/businessconditions",
    component: BusinessConditions,
  },
  dataProcessing: {
    name: "routes:dataProcessing",
    path: "/dataprocessing",
    component: DataProcessing,
  },
  emailUpdate: {
    name: "routes:emailUpdate",
    path: "/emailUpdate",
    component: EmailUpdate,
  },
  notFound: { name: "404", path: "*", component: NotFound },
} as const;

export const menuItems = {
  mainPage: {
    name: routes.mainPage.name,
    path: routes.mainPage.path,
    component: routes.mainPage.component,
  },
  aboutUs: {
    name: routes.aboutUs.name,
    path: routes.aboutUs.path,
    component: routes.aboutUs.component,
  },
  coOp: {
    name: routes.coOp.name,
    path: routes.coOp.path,
    component: routes.coOp.component,
  },
  contact: {
    name: routes.contact.name,
    path: routes.contact.path,
    component: routes.contact.component,
  },
} as const;

export const footerLinks = {
  footerLinks1: [
    {
      name: routes.businessConditions.name,
      path: routes.businessConditions.path,
    },
    { name: routes.dataProcessing.name, path: routes.dataProcessing.path },
  ],
  footerLinks2: [
    { name: routes.mainPage.name, path: routes.mainPage.path },
    { name: routes.coOp.name, path: routes.coOp.path },
    { name: routes.aboutUs.name, path: routes.aboutUs.path },
    { name: routes.coach.name, path: routes.coach.path },
    { name: routes.fitness.name, path: routes.fitness.path },
  ],
} as const;

export const transitionSetup = {
  transitionTimeout: 500,
} as const;

export const filter = {
  avoidFilterTypes: {
    fitness: ["gender", "specialization"],
    coach: ["equipment", "general"],
  },
  filterTypes: {
    checkbox: ["equipment", "general", "specialization", "others", "gender"],
    radio: ["order", "regions"],
    range: [],
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
} as const;
