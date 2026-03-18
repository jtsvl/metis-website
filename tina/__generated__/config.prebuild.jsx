// tina/config.ts
import { defineConfig } from "tinacms";
var navFields = [
  { type: "string", name: "ziele", label: "Ziele / Goals" },
  { type: "string", name: "projekte", label: "Projekte / Projects" },
  { type: "string", name: "kontakt", label: "Kontakt / Contact" },
  { type: "string", name: "menu", label: "Menu" }
];
var heroFields = [
  { type: "string", name: "kicker", label: "Kicker" },
  { type: "string", name: "headlineLine1", label: "Headline Line 1" },
  {
    type: "string",
    name: "typewriterWords",
    label: "Typewriter Words",
    list: true,
    description: "One word/phrase per item. Displayed in rotation in the hero headline."
  },
  {
    type: "string",
    name: "subline",
    label: "Subline",
    ui: { component: "textarea" }
  },
  { type: "string", name: "cta", label: "Primary CTA" },
  { type: "string", name: "ctaSecondary", label: "Secondary CTA" }
];
var zieleFields = [
  { type: "string", name: "title", label: "Section Title" },
  {
    type: "object",
    name: "items",
    label: "Goal Items",
    list: true,
    fields: [
      { type: "string", name: "title", label: "Title" },
      {
        type: "string",
        name: "description",
        label: "Description",
        ui: { component: "textarea" }
      }
    ]
  }
];
var projekteFields = [
  { type: "string", name: "title", label: "Section Title" },
  {
    type: "object",
    name: "items",
    label: "Project Items",
    list: true,
    fields: [
      { type: "string", name: "title", label: "Title" },
      {
        type: "string",
        name: "description",
        label: "Description",
        ui: { component: "textarea" }
      },
      { type: "string", name: "tag", label: "Tag" }
    ]
  }
];
var kontaktFields = [
  { type: "string", name: "title", label: "Section Title" },
  {
    type: "string",
    name: "description",
    label: "Description",
    ui: { component: "textarea" }
  },
  { type: "string", name: "name", label: "Name Label" },
  { type: "string", name: "email", label: "Email Label" },
  { type: "string", name: "message", label: "Message Label" },
  { type: "string", name: "send", label: "Submit Button" },
  { type: "string", name: "namePlaceholder", label: "Name Placeholder" },
  { type: "string", name: "emailPlaceholder", label: "Email Placeholder" },
  { type: "string", name: "messagePlaceholder", label: "Message Placeholder" }
];
var footerFields = [
  { type: "string", name: "tagline", label: "Tagline" },
  { type: "string", name: "legal", label: "Legal Text" }
];
var sectionFields = [
  { type: "object", name: "nav", label: "Navigation", fields: navFields },
  { type: "object", name: "hero", label: "Hero", fields: heroFields },
  { type: "object", name: "ziele", label: "Ziele / Goals", fields: zieleFields },
  {
    type: "object",
    name: "projekte",
    label: "Projekte / Projects",
    fields: projekteFields
  },
  {
    type: "object",
    name: "kontakt",
    label: "Kontakt / Contact",
    fields: kontaktFields
  },
  { type: "object", name: "footer", label: "Footer", fields: footerFields }
];
var config_default = defineConfig({
  clientId: process.env.TINA_PUBLIC_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
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
          allowedActions: { create: false, delete: false }
        },
        fields: sectionFields
      },
      {
        name: "en",
        label: "English Content",
        path: "src/data",
        match: { include: "en" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: sectionFields
      }
    ]
  }
});
export {
  config_default as default
};
