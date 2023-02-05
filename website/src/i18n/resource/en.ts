import { AppTranslationType } from "./cs";

export const enTranslation: AppTranslationType = {
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
    businessTermsAgreement: "Souhlas s obchodními podmínkami",
    dataProcessingAgreement: "Souhlas se zpracováním osobních údajů",
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

  footer: {
    followUs: "Sledujte nás",
    other: "Ostatní",
    gymtour: "Gymtour",
  },

  registerPage: {
    modalHeader: "Vítejte!",
    modalText: "Na email  “{{email}}„  Vám byly zaslány instrukce pro aktivaci účtu.",
    modalButton: "Zavřít",
    modalErrorHeader: "Je nám líto!",
    modalErrorText: "Něco se pokazilo a nemohli jsme dokončit Váš požadavek. \nZkuste to prosím později.",
    registerButton: "Registrovat",
    registerHeader: "Zaregistrovat se",
    registerParagraph: "Pro “lajkování„ příspěvků a vkládání hodnocení je třeba si u nás založit účet.",
  },
};
