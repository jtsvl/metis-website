# TinaCMS Integration Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate TinaCMS into the METIS Astro v6 site so non-technical editors can update all bilingual content via a visual UI at `/admin/index.html`, with saves committed to GitHub and Netlify auto-deploying.

**Architecture:** Content moves from a hardcoded TypeScript const in `src/i18n/content.ts` into two JSON files (`src/data/de.json`, `src/data/en.json`) managed by TinaCMS. A thin wrapper in `content.ts` imports the JSON and re-exports it with the same `content[lang]` API, so no Astro components need changes. TinaCMS generates the admin UI as static assets into `public/admin/`.

**Tech Stack:** Astro v6, TinaCMS (tinacms + @tinacms/cli), TypeScript, Netlify, Tina Cloud (free tier)

**Spec:** `docs/superpowers/specs/2026-03-17-tinacms-integration-design.md`

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/data/de.json` | German content (managed by TinaCMS) |
| Create | `src/data/en.json` | English content (managed by TinaCMS) |
| Create | `src/i18n/types.ts` | `Content` interface — explicit types for all fields |
| Modify | `src/i18n/content.ts` | Thin wrapper: imports JSON, re-exports `content`, `languages`, `defaultLang`, `Lang` |
| Create | `tina/config.ts` | TinaCMS collection definitions for DE + EN |
| Create | `netlify.toml` | Build command + publish dir |
| Modify | `package.json` | Update `dev` script |
| Commit | `tina/__generated__/` | Generated schema files (must be in Git) |

No changes to `src/layouts/Layout.astro`, `src/components/LandingPage.astro`, or any page file.

---

## Task 1: Install TinaCMS

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Run the TinaCMS init command**

```bash
npx @tinacms/cli@latest init
```

When prompted for the public assets directory, enter: `public`. Accept any other defaults.

The command installs `tinacms` and `@tinacms/cli`, scaffolds a starter `tina/config.ts`, and may create sample content files. **Note the exact env var names printed at the end** — you will need them in Task 9. They should be `TINA_PUBLIC_CLIENT_ID` and `TINA_TOKEN`, but verify.

- [ ] **Step 2: Verify installed packages**

```bash
cat package.json | grep -E "tinacms|@tinacms"
```

Expected: `tinacms` in `dependencies`, `@tinacms/cli` in `devDependencies`. If the init command put `@tinacms/cli` in `dependencies`, move it to `devDependencies` manually in `package.json`.

- [ ] **Step 3: Delete sample content files created by init**

The init command often creates a `content/` directory or demo markdown files. Delete anything that isn't `tina/config.ts`:

```bash
ls tina/
# Keep only config.ts — delete any __generated__/, demo files, etc.
```

If a `content/` directory was created at the project root, delete it — we use `src/data/` instead.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install tinacms and @tinacms/cli"
```

---

## Task 2: Create the `Content` TypeScript interface

**Files:**
- Create: `src/i18n/types.ts`

- [ ] **Step 1: Create `src/i18n/types.ts`**

```typescript
// src/i18n/types.ts

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
```

- [ ] **Step 2: Commit**

```bash
git add src/i18n/types.ts
git commit -m "feat: add Content interface for typed JSON imports"
```

---

## Task 3: Create content JSON files

**Files:**
- Create: `src/data/de.json`
- Create: `src/data/en.json`

These are transcribed directly from the current values in `src/i18n/content.ts`. Create `src/data/` first:

```bash
mkdir -p src/data
```

- [ ] **Step 1: Create `src/data/de.json`**

```json
{
  "nav": {
    "ziele": "Ziele",
    "projekte": "Projekte",
    "kontakt": "Kontakt"
  },
  "hero": {
    "kicker": "Gemeinnützig · Unabhängig · Wirkungsorientiert",
    "headlineLine1": "Demokratie braucht",
    "typewriterWords": ["Wissen.", "Mut.", "Engagement.", "Dialog.", "Grundrechte."],
    "subline": "METIS entwickelt evidenzbasierte Programme für politische Bildung, Medienkompetenz und demokratische Resilienz in Deutschland und Europa.",
    "cta": "Unsere Arbeit",
    "ctaSecondary": "Mehr über uns"
  },
  "ziele": {
    "title": "Unsere Ziele",
    "items": [
      {
        "title": "Politische Bildung",
        "description": "Wir fördern das Verständnis für Verfassungswerte und demokratische Institutionen in Deutschland und Europa durch praxisnahe Bildungsangebote."
      },
      {
        "title": "Medienkompetenz",
        "description": "Wir schulen kritisches Denken im Umgang mit digitalen Medien und Desinformation – für eine informierte und widerstandsfähige Gesellschaft."
      },
      {
        "title": "Einstellungsforschung",
        "description": "Wir untersuchen den Wandel demokratischer Einstellungen in der Bevölkerung und liefern wissenschaftlich fundierte Grundlagen für politisches Handeln."
      }
    ]
  },
  "projekte": {
    "title": "Projekte",
    "items": [
      {
        "title": "Verfassung im Unterricht",
        "description": "Lehrmodule für Schulen zu Grundgesetz, Grundrechten und europäischen Werten – entwickelt gemeinsam mit Pädagoginnen und Pädagogen.",
        "tag": "Bildung"
      },
      {
        "title": "Digitale Mündigkeit",
        "description": "Workshops und Online-Materialien zur kritischen Bewertung von Nachrichtenquellen und algorithmischer Beeinflussung.",
        "tag": "Medien"
      },
      {
        "title": "Demokratiebarometer",
        "description": "Jährliche Erhebung zu demokratischen Einstellungen und Vertrauen in staatliche Institutionen in der deutschen Wahlbevölkerung.",
        "tag": "Forschung"
      }
    ]
  },
  "kontakt": {
    "title": "Kontakt",
    "description": "Sie möchten mit uns zusammenarbeiten oder haben Fragen zu unseren Programmen? Wir freuen uns über Ihre Nachricht.",
    "name": "Name",
    "email": "E-Mail",
    "message": "Nachricht",
    "send": "Nachricht senden",
    "namePlaceholder": "Ihr Name",
    "emailPlaceholder": "ihre@email.de",
    "messagePlaceholder": "Ihre Nachricht..."
  },
  "footer": {
    "tagline": "Für eine starke Demokratie.",
    "legal": "Gemeinnützige Gesellschaft · Impressum · Datenschutz"
  }
}
```

- [ ] **Step 2: Create `src/data/en.json`**

```json
{
  "nav": {
    "ziele": "Goals",
    "projekte": "Projects",
    "kontakt": "Contact"
  },
  "hero": {
    "kicker": "Non-profit · Independent · Impact-driven",
    "headlineLine1": "Democracy needs",
    "typewriterWords": ["Knowledge.", "Courage.", "Engagement.", "Dialogue.", "Fundamental Rights."],
    "subline": "METIS designs evidence-based programs for civic education, media literacy, and democratic resilience in Germany and Europe.",
    "cta": "Our work",
    "ctaSecondary": "About us"
  },
  "ziele": {
    "title": "Our Goals",
    "items": [
      {
        "title": "Civic Education",
        "description": "We promote understanding of constitutional values and democratic institutions in Germany and Europe through practical educational programs."
      },
      {
        "title": "Media Literacy",
        "description": "We build critical thinking skills for navigating digital media and disinformation — fostering an informed and resilient society."
      },
      {
        "title": "Attitude Research",
        "description": "We study shifts in democratic attitudes among the population and provide evidence-based foundations for political action."
      }
    ]
  },
  "projekte": {
    "title": "Projects",
    "items": [
      {
        "title": "Constitution in the Classroom",
        "description": "Teaching modules for schools covering the Basic Law, fundamental rights, and European values — co-developed with educators.",
        "tag": "Education"
      },
      {
        "title": "Digital Citizenship",
        "description": "Workshops and online materials for critically evaluating news sources and understanding algorithmic influence.",
        "tag": "Media"
      },
      {
        "title": "Democracy Barometer",
        "description": "Annual survey on democratic attitudes and trust in state institutions among the German electorate.",
        "tag": "Research"
      }
    ]
  },
  "kontakt": {
    "title": "Contact",
    "description": "Would you like to collaborate with us or have questions about our programs? We look forward to hearing from you.",
    "name": "Name",
    "email": "Email",
    "message": "Message",
    "send": "Send message",
    "namePlaceholder": "Your name",
    "emailPlaceholder": "your@email.com",
    "messagePlaceholder": "Your message..."
  },
  "footer": {
    "tagline": "For a strong democracy.",
    "legal": "Non-profit organization · Imprint · Privacy"
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/data/de.json src/data/en.json
git commit -m "feat: add bilingual content JSON files"
```

---

## Task 4: Rewrite `content.ts` to import JSON

**Files:**
- Modify: `src/i18n/content.ts`
- Possibly modify: `tsconfig.json`

- [ ] **Step 1: Note on JSON imports**

JSON imports work via Vite/Astro — no `tsconfig.json` change needed. The `"moduleResolution": "Bundler"` mode used by Astro handles JSON imports at the bundler level regardless of the `resolveJsonModule` TS flag. No action required here.

- [ ] **Step 2: Replace `src/i18n/content.ts`**

```typescript
// src/i18n/content.ts
import type { Content } from './types';
import de from '../data/de.json';
import en from '../data/en.json';

export const languages = {
  de: "Deutsch",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "de";

export const content: Record<Lang, Content> = {
  de: de as Content,
  en: en as Content,
};
```

- [ ] **Step 3: Verify the site builds without TypeScript errors**

```bash
npm run build 2>&1 | tail -20
```

Expected: Build succeeds and outputs to `dist/`.

- [ ] **Step 4: Spot-check built output — both languages rendered**

```bash
grep -r "Demokratie braucht" dist/
grep -r "Democracy needs" dist/
```

Expected: Both strings found — confirms DE and EN pages rendered from JSON correctly.

- [ ] **Step 5: Commit**

```bash
git add src/i18n/content.ts tsconfig.json
git commit -m "feat: migrate content.ts to import bilingual JSON files"
```

---

## Task 5: Write the TinaCMS collection config

**Files:**
- Modify: `tina/config.ts` (replacing the init-generated scaffold)

- [ ] **Step 1: Replace `tina/config.ts` with the full collection config**

```typescript
// tina/config.ts
import { defineConfig } from "tinacms";

const navFields = [
  { type: "string" as const, name: "ziele", label: "Ziele / Goals" },
  { type: "string" as const, name: "projekte", label: "Projekte / Projects" },
  { type: "string" as const, name: "kontakt", label: "Kontakt / Contact" },
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
```

- [ ] **Step 2: Commit**

```bash
git add tina/config.ts
git commit -m "feat: add TinaCMS collection config for DE and EN content"
```

---

## Task 6: Update scripts and add `netlify.toml`

**Files:**
- Modify: `package.json`
- Create: `netlify.toml`

- [ ] **Step 1: Update the `dev` script in `package.json`**

Change:
```json
"dev": "astro dev"
```
To:
```json
"dev": "tinacms dev -c \"astro dev\""
```

Keep `build`, `preview`, and `astro` scripts unchanged.

- [ ] **Step 2: Create `netlify.toml`**

```toml
[build]
  command = "npx tinacms build && npm run build"
  publish = "dist"
```

> **Note:** `tinacms build` calls Tina Cloud and requires `TINA_PUBLIC_CLIENT_ID` and `TINA_TOKEN`. Netlify builds will fail until those env vars are added in Task 9. This is expected — do not merge to a production branch until Task 9 is complete. Alternatively, use `npx tinacms build --local` during development to build without cloud credentials.

- [ ] **Step 3: Commit**

```bash
git add package.json netlify.toml
git commit -m "chore: update dev script for TinaCMS and add netlify.toml"
```

---

## Task 7: Generate and commit Tina schema files

**Files:**
- Commit: `tina/__generated__/` (auto-generated, must be in Git)

- [ ] **Step 1: Generate the schema (local mode — no credentials needed)**

```bash
npx tinacms dev -c "echo done"
```

This starts Tina in local mode, generates `tina/__generated__/` (containing `_graphql.json`, `_schema.json`, and TypeScript types) and the admin UI in `public/admin/`, then exits. No `TINA_PUBLIC_CLIENT_ID` or `TINA_TOKEN` are needed in local mode.

Expected output: Tina starts, generates files, then stops cleanly after the `echo done` command completes.

- [ ] **Step 2: Verify `.gitignore` does not exclude the generated files**

```bash
git status tina/__generated__/
```

Expected: Files appear as untracked (not ignored). If they don't appear, check `.gitignore` for any `tina/` or `tina/__generated__/` entries and remove or override them with `!tina/__generated__/`.

- [ ] **Step 3: Commit the generated files**

```bash
git add tina/__generated__/
git commit -m "chore: commit TinaCMS generated schema files"
```

- [ ] **Step 4: Verify admin UI was generated locally**

```bash
ls public/admin/
```

Expected: `index.html` present (plus JS assets).

> **What goes in Git vs what does not:**
> - `tina/__generated__/` — **commit this** (Tina Cloud reads the schema JSON at build time)
> - `public/admin/` — **do NOT commit this** (regenerated by `tinacms build` on every Netlify deploy). Add it to `.gitignore`:
>
> ```bash
> echo "public/admin/" >> .gitignore
> git add .gitignore
> git commit -m "chore: gitignore Tina admin build output"
> ```

---

## Task 8: End-to-end local test

No new files — verification only.

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Expected: Both Tina local server and Astro dev server start. Astro available at `http://localhost:4321`.

- [ ] **Step 2: Open the admin UI**

Navigate to `http://localhost:4321/admin/index.html`.

Expected: TinaCMS editor loads with "German Content" and "English Content" in the sidebar.

- [ ] **Step 3: Edit a German field and save**

Click "German Content" → open the document → change `hero.kicker` to `"Test · Test · Test"` → Save.

Expected: `src/data/de.json` is updated on disk. Watch the terminal for Vite's file-watcher picking up the change (you'll see a rebuild log line). If Vite doesn't auto-reload, do a manual page refresh. The German homepage at `http://localhost:4321` should show the new kicker text.

- [ ] **Step 4: Revert the test edit**

Change `hero.kicker` back to `"Gemeinnützig · Unabhängig · Wirkungsorientiert"` and Save.

- [ ] **Step 5: Edit an English field and save**

Click "English Content" → change `hero.cta` to `"Test CTA"` → Save.

Expected: `src/data/en.json` updated. English page at `http://localhost:4321/en` reflects the change.

- [ ] **Step 6: Revert the test edit**

Change `hero.cta` back to `"Our work"` and Save.

- [ ] **Step 7: Verify production build**

```bash
npm run build 2>&1 | tail -10
```

Expected: Build succeeds with no errors.

---

## Task 9: Tina Cloud setup (human-in-the-loop)

This task requires browser access to tina.io and the Netlify dashboard.

- [ ] **Step 1: Create a Tina Cloud project**

1. Go to [tina.io](https://tina.io) and sign in (or create a free account)
2. Click "New Project" → connect to the GitHub repository for this site
3. Note the **Client ID** and **Token** shown after project creation
   - The env var names were printed during `init` in Task 1 — use those exact names (expected: `TINA_PUBLIC_CLIENT_ID` and `TINA_TOKEN`)

- [ ] **Step 2: Add environment variables in Netlify**

1. Netlify dashboard → Site settings → Environment variables
2. Add:
   - `TINA_PUBLIC_CLIENT_ID` = Client ID from tina.io
   - `TINA_TOKEN` = Token from tina.io
3. Trigger a new deploy (push a commit or click "Trigger deploy") to verify the build passes with Tina Cloud credentials

- [ ] **Step 3: Verify the production admin UI**

Navigate to `https://<your-site>.netlify.app/admin/index.html`.

Expected: TinaCMS editor loads, prompts for Tina Cloud login. After login, "German Content" and "English Content" collections are visible and editable.

---

## Notes for the implementer

- **No Astro component changes needed.** `LandingPage.astro` and `Layout.astro` consume content via `t.someKey` unchanged.
- **`typewriterWords` in the editor** appears as a list of string inputs (one word/phrase per entry). Order matches display order in the typewriter animation.
- **`tina/__generated__/`** is maintained by TinaCMS. Do not hand-edit its contents. Re-run `npx tinacms dev -c "echo done"` after any changes to `tina/config.ts`.
- **Local mode vs production mode:** locally, Tina writes files directly to disk. In production, Tina Cloud commits changes to GitHub via the GitHub API. `src/data/*.json` are the source of truth in both cases.
- **`public/admin/`** is generated by Tina and should be gitignored (it is regenerated on every build). Add `public/admin/` to `.gitignore`.
