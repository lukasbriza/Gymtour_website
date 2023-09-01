import { ReactLazyPreload } from "../utils/ReactLazyPreload";

const Home = ReactLazyPreload(() => import("../pages/Home"));
const Crossroad = ReactLazyPreload(() => import("../pages/Crossroad"));
const Fitness = ReactLazyPreload(() => import("../pages/content/Fitness"));
const Coach = ReactLazyPreload(() => import("../pages/content/Coach"));
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
const Dashboard = ReactLazyPreload(
  () => import("../pages/protected/dashboard/Dashboard")
);
const Modify = ReactLazyPreload(
  () => import("../pages/protected/modify/Modify")
);

const Detail = ReactLazyPreload(() => import("../pages/content/Detail"));

export const card = {
  width: 250,
  height: 250,
};

export const breakpoints = {
  mobile: 360,
  tablet: 760,
  pc: 980,
  wide: 1300,
} as const;

export const routes = {
  mainPage: { name: "routes.mainPage", path: "/", component: Home },
  crossroad: {
    name: "routes.crossroad",
    path: "/crossroad",
    component: Crossroad,
  },
  fitness: {
    name: "routes.fitness",
    path: "/fitness",
    component: Fitness,
  },
  coach: { name: "routes.coach", path: "/coach", component: Coach },
  detail: { name: "routes.detail", path: "/detail/:id", component: Detail },
  aboutUs: { name: "routes.aboutUs", path: "/about", component: About },
  coOp: { name: "routes.coOp", path: "/coop", component: CoOp },
  contact: {
    name: "routes.contact",
    path: "/contact",
    component: Contact,
  },
  login: { name: "routes.login", path: "/login", component: Login },
  dashboard: {
    name: "routes.dashboard",
    path: "/auth/dashboard",
    component: Dashboard,
  },
  modify: {
    name: "routes.modify",
    path: "/auth/modify/:type/:id?",
    makeDynamicPath: (type: "coach" | "fitness", id?: string) =>
      id ? `/auth/modify/${type}/${id}` : `/auth/modify/${type}`,
    component: Modify,
  },
  businessConditions: {
    name: "routes.businessConditions",
    path: "/businessconditions",
    component: BusinessConditions,
  },
  dataProcessing: {
    name: "routes.dataProcessing",
    path: "/dataprocessing",
    component: DataProcessing,
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
  defaultLimit: 20,
} as const;

export const links = {
  fb: "https://www.facebook.com/",
  ig: "https://www.instagram.cz/",
  yb: "https://www.youtube.cz/",
};
