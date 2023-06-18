import i18next from "i18next";
import { csTranslation } from "./resource/cs";
import { enTranslation } from "./resource/en";
import { initReactI18next } from "react-i18next";

export const resources = {
  cs: { translation: { ...csTranslation } },
  en: { translation: { ...enTranslation } },
} as const;

export const i18n = i18next.use(initReactI18next).init({
  returnNull: false,
  interpolation: { escapeValue: false },
  lng: "cs",
  resources,
});
