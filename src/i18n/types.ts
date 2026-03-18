export interface NavContent {
  ziele: string;
  projekte: string;
  kontakt: string;
}

export interface HeroContent {
  kicker: string;
  headlineLine1: string;
  typewriterWords: string[];
  subline: string;
  cta: string;
  ctaSecondary: string;
}

export interface ZieleItem {
  title: string;
  description: string;
}

export interface ZieleContent {
  title: string;
  items: ZieleItem[];
}

export interface ProjekteItem {
  title: string;
  description: string;
  tag: string;
}

export interface ProjekteContent {
  title: string;
  items: ProjekteItem[];
}

export interface KontaktContent {
  title: string;
  description: string;
  name: string;
  email: string;
  message: string;
  send: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
}

export interface FooterContent {
  tagline: string;
  legal: string;
}

export interface Content {
  nav: NavContent;
  hero: HeroContent;
  ziele: ZieleContent;
  projekte: ProjekteContent;
  kontakt: KontaktContent;
  footer: FooterContent;
}
