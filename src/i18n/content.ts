export const languages = {
  de: "Deutsch",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "de";

export const content = {
  de: {
    nav: {
      ziele: "Ziele",
      projekte: "Projekte",
      kontakt: "Kontakt",
    },
    hero: {
      headline: ["Demokratie", "stärken. Rechte schützen."],
      subline:
        "METIS entwickelt evidenzbasierte Programme für politische Bildung, Medienkompetenz und demokratische Resilienz in Deutschland und Europa.",
      cta: "Mehr erfahren",
    },
    ziele: {
      title: "Unsere Ziele",
      items: [
        {
          title: "Politische Bildung",
          description:
            "Wir fördern das Verständnis für Verfassungswerte und demokratische Institutionen in Deutschland und Europa durch praxisnahe Bildungsangebote.",
        },
        {
          title: "Medienkompetenz",
          description:
            "Wir schulen kritisches Denken im Umgang mit digitalen Medien und Desinformation – für eine informierte und widerstandsfähige Gesellschaft.",
        },
        {
          title: "Einstellungsforschung",
          description:
            "Wir untersuchen den Wandel demokratischer Einstellungen in der Bevölkerung und liefern wissenschaftlich fundierte Grundlagen für politisches Handeln.",
        },
      ],
    },
    projekte: {
      title: "Projekte",
      items: [
        {
          title: "Verfassung im Unterricht",
          description:
            "Lehrmodule für Schulen zu Grundgesetz, Grundrechten und europäischen Werten – entwickelt gemeinsam mit Pädagoginnen und Pädagogen.",
          tag: "Bildung",
        },
        {
          title: "Digitale Mündigkeit",
          description:
            "Workshops und Online-Materialien zur kritischen Bewertung von Nachrichtenquellen und algorithmischer Beeinflussung.",
          tag: "Medien",
        },
        {
          title: "Demokratiebarometer",
          description:
            "Jährliche Erhebung zu demokratischen Einstellungen und Vertrauen in staatliche Institutionen in der deutschen Wahlbevölkerung.",
          tag: "Forschung",
        },
      ],
    },
    kontakt: {
      title: "Kontakt",
      description:
        "Sie möchten mit uns zusammenarbeiten oder haben Fragen zu unseren Programmen? Wir freuen uns über Ihre Nachricht.",
      name: "Name",
      email: "E-Mail",
      message: "Nachricht",
      send: "Nachricht senden",
      namePlaceholder: "Ihr Name",
      emailPlaceholder: "ihre@email.de",
      messagePlaceholder: "Ihre Nachricht...",
    },
    footer: {
      tagline: "Für eine starke Demokratie.",
      legal: "Gemeinnützige Gesellschaft · Impressum · Datenschutz",
    },
  },
  en: {
    nav: {
      ziele: "Goals",
      projekte: "Projects",
      kontakt: "Contact",
    },
    hero: {
      headline: ["Strengthening Democracy.", "Protecting Rights."],
      subline:
        "METIS designs evidence-based programs for civic education, media literacy, and democratic resilience in Germany and Europe.",
      cta: "Learn more",
    },
    ziele: {
      title: "Our Goals",
      items: [
        {
          title: "Civic Education",
          description:
            "We promote understanding of constitutional values and democratic institutions in Germany and Europe through practical educational programs.",
        },
        {
          title: "Media Literacy",
          description:
            "We build critical thinking skills for navigating digital media and disinformation — fostering an informed and resilient society.",
        },
        {
          title: "Attitude Research",
          description:
            "We study shifts in democratic attitudes among the population and provide evidence-based foundations for political action.",
        },
      ],
    },
    projekte: {
      title: "Projects",
      items: [
        {
          title: "Constitution in the Classroom",
          description:
            "Teaching modules for schools covering the Basic Law, fundamental rights, and European values — co-developed with educators.",
          tag: "Education",
        },
        {
          title: "Digital Citizenship",
          description:
            "Workshops and online materials for critically evaluating news sources and understanding algorithmic influence.",
          tag: "Media",
        },
        {
          title: "Democracy Barometer",
          description:
            "Annual survey on democratic attitudes and trust in state institutions among the German electorate.",
          tag: "Research",
        },
      ],
    },
    kontakt: {
      title: "Contact",
      description:
        "Would you like to collaborate with us or have questions about our programs? We look forward to hearing from you.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      messagePlaceholder: "Your message...",
    },
    footer: {
      tagline: "For a strong democracy.",
      legal: "Non-profit organization · Imprint · Privacy",
    },
  },
} as const;
