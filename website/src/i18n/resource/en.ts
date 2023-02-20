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

  crossroad: {
    fitness: {
      header: "Fitness",
      paragraph: `Každý by si měl vybrat takové místo, kde se bude cítit dobře. Někdo dá přednost menšímu, ale útulnému fitku, spíše rodinného charakteru. Naopak kdo má okolo sebe rád více lidí a prostoru, může si vybrat komplexní zařízení, kde je kromě posilovny i široký výběr dalších pohybových aktivit jako například squash, tenis, jumping, spinning, aerobik a další.\n\n
      Najděte si své fitcentrum ještě dnes!`,
      button: "Vyhledat",
    },
    coach: {
      header: "Trenéři",
      paragraph: `Rádi by jste začali cvičit, ale nemáte tu správnou motivaci? Právě v těchto případech je naprosto ideální obrátit se na osobního trenéra, který vám s tím pomůže. Trenér zavede do vašeho života disciplínu, navíc vám ukáže, jak na to a bude fungovat jako vaše zpětná vazba. Dohled osobního trenéra je velice účinný a navíc budete mít jistotu, že děláte vše správně.\n\n
      Najděte si svého trenéra ještě dnes!`,
      button: "Vyhledat",
    },
  },

  registerPage: {
    modalHeader: "Vítejte!",
    modalText:
      "Na email  “{{email}}„  Vám byly zaslány instrukce pro aktivaci účtu.",
    modalButton: "Zavřít",
    modalErrorHeader: "Je nám líto!",
    modalErrorText:
      "Něco se pokazilo a nemohli jsme dokončit Váš požadavek. \nZkuste to prosím později.",
    registerButton: "Registrovat",
    registerHeader: "Zaregistrovat se",
    registerParagraph:
      "Pro “lajkování„ příspěvků a vkládání hodnocení je třeba si u nás založit účet.",
  },

  fitnessContentPage: {
    header1: "Fitness",
    verticalText: "Gymtour",
  },
};
