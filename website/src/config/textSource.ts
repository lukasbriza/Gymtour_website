const text = {
  menu: {
    cz: ["Hlavní stránka", "O nás", "Spolupráce", "Kontakt"],
  },
  menuTooltip: { cz: "Účet" },
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
      header: { cz: "Přihlásit" },
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
    ForgetPasswordForm: {
      header: { cz: "Obnova hesla" },
      text: {
        cz: `Pro obnovení hesla vyplňte přihlašovací jméno a email přiřazený k účtu,
      pro který chcete heslo obnovit. Po ověření Vám zašleme vygenerované heslo na email,
      které si v administraci změníte.`,
      },
      inputHeader1: { cz: "Přihlašovací jméno k účtu:" },
      input1: {
        placeholder: { cz: "Jméno" },
        errorMessage: { cz: "test" },
      },
      inputHeader2: { cz: "Email k účtu:" },
      input2: {
        placeholder: { cz: "Email" },
        errorMessage: { cz: "test" },
      },
      button: { cz: "Obnovit" },
    },
    ForgetNameForm: {
      header: { cz: "Obnova jména" },
      text: {
        cz: `Pro obnovení uživatelského jména vyplňte heaslo a email přiřazený k účtu,
        pro který chcete uživatelské jméno obnovit. Po ověření Vám zašleme vygenerované jméno na email,
        které si v administraci následně změníte.`,
      },
      inputHeader1: { cz: "Email k účtu:" },
      input1: {
        placeholder: { cz: "Email" },
        errorMessage: { cz: "test" },
      },
      inputHeader2: { cz: "Heslo k účtu:" },
      input2: {
        placeholder: { cz: "Heslo" },
        errorMessage: { cz: "test" },
      },
      button: { cz: "Obnovit" },
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
        cz: "Po každé změně údajů Vám bude zaslán informační email. V změny emailové adresy, nezapomeňte změnu adresy potvrdit kliknutím na odkaz ve zprávě zaslané na Váš starý email.",
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
    Overview: {
      section1: {
        text: { cz: "ID:" },
      },
      section2: {
        header: { cz: "Účet" },
      },
      section3: {
        text: { cz: "Uživatelské jméno:" },
      },
      section4: {
        text: { cz: "Email uživatele:" },
      },
      section5: {
        text: { cz: "Počet fitness/welness záznamů:" },
      },
      section6: {
        text: { cz: "Počet coach záznamů:" },
      },
      section7: {
        text: { cz: "Souhlas s podmínkami přidán:" },
      },
      section8: {
        text: { cz: "GDPR souhlas přidán:" },
      },
    },
  },
  emailUpdate: {
    modal: {
      approveSucess: { cz: "Ověření emailové adresy proběhlo úspěšně." },
      approveEarlier: {
        cz: "Klikl jste na již použitý odkaz, změna již byla ověřena dříve.",
      },
      approveError: {
        header: { cz: "Ověření emailové adresy selhalo" },
        text: {
          cz: "Je možné že platnost odkazu vypršela, prosím opakujte proces znovu. V případě potíží nás kontaktujte na info@gymtour.cz",
        },
      },
    },
    formModal: {
      button: { cz: "Zavřít" },
    },
    sucessComponent: {
      header: { cz: "Email ověřen" },
      content: {
        pt1: { cz: " Váš email byl úspěšně změněn." },
        pt2: {
          cz: " Kliknutím na tlačítko níže budete přesměrování na hlavní stránku.",
        },
      },
      button: { cz: "Přesměrovat" },
    },
    failureComponent: {
      header: { cz: "Ověření selhalo" },
      content: {
        pt1: {
          cz: 'Bohužel se nám nepodařilo ověřit Váš email. Můžete zkusit vygenerovat nový odkaz v sekci "Nastavení", nebo nás můžete kontaktovat na info@gymtour.cz.',
        },
        pt2: {
          cz: " Kliknutím na tlačítko níže budete přesměrování na hlavní stránku.",
        },
      },
      button: { cz: "Přesměrovat" },
    },
    alreadyApprovedComponent: {
      header: { cz: "Ověření proběhlo" },
      content: {
        pt1: { cz: "Změna Vašeho emailu byla již ověřena." },
        pt2: {
          cz: " Kliknutím na tlačítko níže budete přesměrování na hlavní stránku.",
        },
      },
      button: { cz: "Přesměrovat" },
    },
    missingIdComponent: {
      header: { cz: "Chybějící ID" },
      content: {
        pt1: {
          cz: "V URL jsme nezaznamenali žádné ID. Klikněte prosím znovu na odkaz, který jsme Vám zaslali do Vašeho emailu.",
        },
        pt2: {
          cz: " Kliknutím na tlačítko níže budete přesměrování na hlavní stránku.",
        },
      },
      button: { cz: "Přesměrovat" },
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
