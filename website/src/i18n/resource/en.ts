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
  },
};
