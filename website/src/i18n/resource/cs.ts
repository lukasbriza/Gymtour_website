export const csTranslation = {
  validation: {
    min: "Minimální délka je {{min}} znaků.",
    max: "Je povoleno maximálně {{max}} znaků.",
    required: "Pole je povinné.",
    noBoolean: "Nesprávná hodnota.",
  },
  common: {
    email: "Email",
    name: "Jméno",
    username: "Uživatelské jméno",
    password: "Heslo",
    businessTermsAgreement: "Souhlas s obchodními podmínkami",
    dataProcessingAgreement: "Souhlas se zpracováním osobních údajů",
  },
};

export type AppTranslationType = typeof csTranslation;
