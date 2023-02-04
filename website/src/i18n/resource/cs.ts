export const csTranslation = {
  validation: {
    min: "Minimální délka je {{min}} znaků.",
    max: "Je povoleno maximálně {{max}} znaků.",
    required: "Pole je povinné.",
    nooBoolean: "Nesprávná hodnota.",
  },
  common: {
    email: "Email",
    name: "Jméno",
    username: "Uživatelské jméno",
    password: "Heslo",
  },
  routes: {
    mainPage: "Hlavní stránka",
    crossroad: "Rozcestí",
    fitness: "Fitness",
    coach: "Trenéři",
    aboutUs: "O nás",
    coOp: "Spolupráce",
    contact: "Kontakt",
    login: "Přihlásit",
    dashboard: "Účet",
    businessConditions: "Obchodní podmínky",
    dataProcessing: "Zpracování údajů",
    emailUpdate: "Změna emailu",
  },
};

export type AppTranslationType = typeof csTranslation;
