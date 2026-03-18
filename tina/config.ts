import { defineConfig } from "tinacms";

const navFields = [
  { type: "string" as const, name: "ziele", label: "Ziele / Goals" },
  { type: "string" as const, name: "projekte", label: "Projekte / Projects" },
  { type: "string" as const, name: "kontakt", label: "Kontakt / Contact" },
  { type: "string" as const, name: "menu", label: "Menu" },
];

const heroFields = [
  { type: "string" as const, name: "kicker", label: "Kicker" },
  { type: "string" as const, name: "headlineLine1", label: "Headline Line 1" },
  {
    type: "string" as const,
    name: "typewriterWords",
    label: "Typewriter Words",
    list: true,
    description: "One word/phrase per item. Displayed in rotation in the hero headline.",
  },
  {
    type: "string" as const,
    name: "subline",
    label: "Subline",
    ui: { component: "textarea" },
  },
  { type: "string" as const, name: "cta", label: "Primary CTA" },
  { type: "string" as const, name: "ctaSecondary", label: "Secondary CTA" },
];

const zieleFields = [
  { type: "string" as const, name: "title", label: "Section Title" },
  {
    type: "object" as const,
    name: "items",
    label: "Goal Items",
    list: true,
    fields: [
      { type: "string" as const, name: "title", label: "Title" },
      {
        type: "string" as const,
        name: "description",
        label: "Description",
        ui: { component: "textarea" },
      },
    ],
  },
];

const projekteFields = [
  { type: "string" as const, name: "title", label: "Section Title" },
  {
    type: "object" as const,
    name: "items",
    label: "Project Items",
    list: true,
    fields: [
      { type: "string" as const, name: "title", label: "Title" },
      {
        type: "string" as const,
        name: "description",
        label: "Description",
        ui: { component: "textarea" },
      },
      { type: "string" as const, name: "tag", label: "Tag" },
    ],
  },
];

const kontaktFields = [
  { type: "string" as const, name: "title", label: "Section Title" },
  {
    type: "string" as const,
    name: "description",
    label: "Description",
    ui: { component: "textarea" },
  },
  { type: "string" as const, name: "name", label: "Name Label" },
  { type: "string" as const, name: "email", label: "Email Label" },
  { type: "string" as const, name: "message", label: "Message Label" },
  { type: "string" as const, name: "send", label: "Submit Button" },
  { type: "string" as const, name: "namePlaceholder", label: "Name Placeholder" },
  { type: "string" as const, name: "emailPlaceholder", label: "Email Placeholder" },
  { type: "string" as const, name: "messagePlaceholder", label: "Message Placeholder" },
];

const footerFields = [
  { type: "string" as const, name: "tagline", label: "Tagline" },
  { type: "string" as const, name: "legal", label: "Legal Text" },
];

const sectionFields = [
  { type: "object" as const, name: "nav", label: "Navigation", fields: navFields },
  { type: "object" as const, name: "hero", label: "Hero", fields: heroFields },
  { type: "object" as const, name: "ziele", label: "Ziele / Goals", fields: zieleFields },
  {
    type: "object" as const,
    name: "projekte",
    label: "Projekte / Projects",
    fields: projekteFields,
  },
  {
    type: "object" as const,
    name: "kontakt",
    label: "Kontakt / Contact",
    fields: kontaktFields,
  },
  { type: "object" as const, name: "footer", label: "Footer", fields: footerFields },
];

export default defineConfig({
  branch: process.env.TINA_BRANCH || process.env.HEAD || "main",
  clientId: process.env.TINA_PUBLIC_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  schema: {
    collections: [
      {
        name: "de",
        label: "German Content",
        path: "src/data",
        match: { include: "de" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: sectionFields,
      },
      {
        name: "en",
        label: "English Content",
        path: "src/data",
        match: { include: "en" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: sectionFields,
      },
    ],
  },
});
