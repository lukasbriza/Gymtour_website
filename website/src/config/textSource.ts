const text = {
  menu: {
    cz: ["Hlavní stránka", "O nás", "Spolupráce", "Kontakt"],
  },
  home: {
    PageHeader: { cz: "Fitness / Welness katalog." },
    Header: {
      part1: { cz: "Choose" },
      part2: { cz: "Your" },
      part3: { cz: "Opportunity!" },
    },
    Button: { cz: "Klikni pro pokračování" },
  },
  crossroad: {
    FitnessPage: {
      Header: { cz: "Fitness" },
      Paragraph: {
        cz: `Každý by si měl vybrat takové místo, kde se bude cítit dobře. Někdo dá přednost menšímu, ale útulnému fitku, spíše rodinného charakteru. Naopak kdo má okolo sebe rád více lidí a prostoru, může si vybrat komplexní zařízení, kde je kromě posilovny i široký výběr dalších pohybových aktivit jako například squash, tenis, jumping, spinning, aerobik a další.\n\n
      Najděte si své fitcentrum ještě dnes!`,
      },
      Button: { cz: "Vyhledat" },
    },
    CoachPage: {
      Header: { cz: "Trenéři" },
      Paragraph: {
        cz: `Rádi by jste začali cvičit, ale nemáte tu správnou motivaci? Právě v těchto případech je naprosto ideální obrátit se na osobního trenéra, který vám s tím pomůže. Trenér zavede do vašeho života disciplínu, navíc vám ukáže, jak na to a bude fungovat jako vaše zpětná vazba. Dohled osobního trenéra je velice účinný a navíc budete mít jistotu, že děláte vše správně.\n\n
        Najděte si svého trenéra ještě dnes!`,
      },
      Button: { cz: "Vyhledat" },
    },
    RegisterPage: {
      Header: { cz: "Zaregistrovat se" },
      Paragraph: {
        cz: 'Pro "lajkování" příspěvků a vkládání hodnocení je třeba si u nás založit účet.',
      },
      Form: {
        input1: {
          placeholder: { cz: "Jméno" },
          errorMessage: {
            cz: "Nepovolený znak, nebo jméno je příliš krátké. Minimální délka je 5 znaků.",
          },
        },
        input2: {
          placeholder: { cz: "Heslo" },
          errorMessage: {
            cz: "Minimální délka hesla je 9 znaků, nebo používáte nepovolené znaky.",
          },
        },
        input3: {
          placeholder: { cz: "Email" },
          errorMessage: { cz: "Nespávný tvar emailové adresy." },
        },
        checkbox1: {
          label: { cz: "Souhlas s obchodními podmínkami" },
        },
        checkbox2: {
          label: { cz: "Souhlas se zpracováním osobních údajů" },
        },
        button: { cz: "Registrovat" },
        modal: {
          invalidInputs: {
            cz: "Do formuláře byly zadány nevalidní údaje. Přkontorlujte si je dle nápovědy, nebo kontaktujte administrátora.",
          },
          invalidTerms: {
            cz: "Bez souhlasu s obchodními podmínkami a souhlase se zpracováním údajů se nelze registrovat.",
          },
          sucessMsg: {
            cz: "Váš účet byl úspěšně registrován! Nyní se můžete přihlásit.",
          },
          button: {
            cz: "Pokračovat",
          },
        },
      },
    },
  },
  fitness: {
    PageHeader: { cz: "Fitness" },
    HeaderBackButton: { cz: "Zpět" },
    Content: {
      nextButton: {
        cz: " Další",
      },
    },
    Filter: {
      headers: [
        { cz: "Regiony" },
        { cz: "Vybavení" },
        { cz: "Hlavní" },
        { cz: "Ostatní" },
      ],
    },
  },
  contentPage: {
    Filter: {
      sort: [{ cz: "Podle popularity" }, { cz: "Podle názvu" }],
      sortHeader: { cz: "Seřadit" },
      filterButton: {
        cz: "Filtrovat",
      },
    },
  },
  coach: {
    PageHeader: { cz: "Trenéři" },
    HeaderBackButton: { cz: "Zpět" },
    Content: {
      nextButton: {
        cz: " Další",
      },
    },
    Filter: {
      headers: [
        { cz: "Regiony" },
        { cz: "Ostatní" },
        { cz: "Pohlaví" },
        { cz: "Specializace" },
      ],
    },
  },
  login: {
    Form: {
      input1: {
        placeholder: { cz: "Jméno" },
        errorMessage: {
          cz: "Nepovolený znak, nebo jméno je příliš krátké. Minimální délka je 5 znaků.",
        },
      },
      input2: {
        placeholder: { cz: "Heslo" },
        errorMessage: {
          cz: "Minimální délka hesla je 9 znaků, nebo používáte nepovolené znaky.",
        },
      },
      link1: {
        cz: "Zapomenuté heslo?",
      },
      link2: {
        cz: "Zapomenuté jméno?",
      },
      button: {
        cz: "Přihlásit",
      },
    },
    modal: {
      invalidInputs: {
        cz: "Nesprávné heslo nebo uživatelské jméno. Zkuste to prosím znovu, nebo požádejte o obnovu hesla.",
      },
      sucessMsg: {
        cz: "Přihlášení proběhlo úspěšně. Můžete pokračovat do správy účtu.",
      },
      buttonSucess: {
        cz: "Pokračovat",
      },
      buttonFail: {
        cz: "Zpět",
      },
    },
  },
  dahboard: {
    Sidebar: {
      routes: [
        { cz: "Přehled" },
        { cz: "Přidat záznam" },
        { cz: "Upravit záznam" },
        { cz: "Nastavení" },
        { cz: "Odhlásit" },
      ],
    },
    Settings: {
      header: {
        cz: "Změna osobních údajů",
      },
      text: {
        cz: "doprovodný text",
      },
      form: {
        header1: {
          cz: "Nové uživatelské jméno:",
        },
        input1: {
          placeholder: { cz: "Přihlašovací jméno" },
          errorMessage: {
            cz: "Nepovolený znak, nebo jméno je příliš krátké. Minimální délka je 5 znaků.",
          },
        },
        button1: { cz: "Změnit" },
        header2: { cz: "Staré heslo:" },
        input2: {
          placeholder: { cz: "Staré heslo" },
          errorMessage: {
            cz: "Minimální délka hesla je 9 znaků, nebo používáte nepovolené znaky.",
          },
        },
        header3: { cz: "Nové heslo:" },
        input3: {
          placeholder: {
            cz: "Nové heslo",
          },
          errorMessage: {
            cz: "Minimální délka hesla je 9 znaků, nebo používáte nepovolené znaky.",
          },
        },
        button2: { cz: "Změnit" },
        header4: { cz: "Nový email:" },
        input4: {
          placeholder: { cz: "Nový email" },
          errorMessage: { cz: "Nespávný tvar emailové adresy." },
        },
        button3: { cz: "Změnit" },
      },
    },
  },
  footer: {
    Section1: {
      header: { cz: "Sledujte nás" },
    },
    Section2: {
      header: { cz: "Ostatní" },
      link1: { cz: "Obchodní podmínky" },
      link2: { cz: "Zpracování údajů" },
    },
    Section3: {
      header: { cz: "Gymtour" },
      link1: { cz: "Hlavní stránka" },
      link2: { cz: "Spolupráce" },
      link3: { cz: "O nás" },
      link4: { cz: "Trenéři" },
      link5: { cz: "Fitness" },
    },
  },
  errorModal: {
    button: { cz: "Zavřít" },
    headers: {
      contentFilter: [
        { cz: "Nepovedlo se získat záznamy" },
        { cz: "Nepovedlo se získat data" },
      ],
      overview: { cz: "Získání informací selhalo" },
      fitness: {
        searchItem: { cz: "Něco se pokazilo" },
      },
      coach: {
        searchItem: { cz: "Něco se pokazilo" },
      },
    },
    contactMessage: {
      cz: " Kontaktujte administrátora na emailové adrese info@gymtour.cz",
    },
  },
};

export { text };
