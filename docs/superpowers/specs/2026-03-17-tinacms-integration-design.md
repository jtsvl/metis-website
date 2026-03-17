# TinaCMS Integration Design

**Date:** 2026-03-17
**Project:** METIS Website
**Status:** Approved

## Overview

Add TinaCMS to the METIS Astro v6 static site so non-technical editors can update all site content (both DE and EN) through a visual UI. Saves commit to GitHub; Netlify auto-deploys on push.

## Content Architecture

Replace `src/i18n/content.ts` (a single hardcoded TypeScript object) with two JSON files managed by TinaCMS:

```
src/data/
  de.json   ← German content
  en.json   ← English content
```

A thin `src/i18n/content.ts` wrapper re-imports those JSON files and re-exports them with the existing `content[lang]` shape. `LandingPage.astro` and `Layout.astro` require no changes.

### TypeScript typing

The current `content.ts` uses `as const` for literal-level narrowing. After migrating to JSON imports, `as const` cannot be applied. Instead, define an explicit `Content` interface in `src/i18n/types.ts` and cast each JSON import against it. This preserves structural type safety at the cost of literal-level narrowing — acceptable since no downstream code depends on exact string literals.

`tsconfig.json` must include `"resolveJsonModule": true` for JSON imports to work. Check Astro's default tsconfig and add it if missing.

```ts
// src/i18n/content.ts
import type { Content } from './types';
import de from '../data/de.json';
import en from '../data/en.json';

export const languages = { de: "Deutsch", en: "English" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "de";

export const content: Record<Lang, Content> = {
  de: de as Content,
  en: en as Content,
};
```

The `Content` interface in `src/i18n/types.ts` explicitly types every field (including `typewriterWords: string[]`).

### JSON structure (both files)

```json
{
  "nav": { "ziele": "...", "projekte": "...", "kontakt": "..." },
  "hero": {
    "kicker": "...",
    "headlineLine1": "...",
    "typewriterWords": ["...", "..."],
    "subline": "...",
    "cta": "...",
    "ctaSecondary": "..."
  },
  "ziele": {
    "title": "...",
    "items": [{ "title": "...", "description": "..." }]
  },
  "projekte": {
    "title": "...",
    "items": [{ "title": "...", "description": "...", "tag": "..." }]
  },
  "kontakt": {
    "title": "...", "description": "...",
    "name": "...", "email": "...", "message": "...", "send": "...",
    "namePlaceholder": "...", "emailPlaceholder": "...", "messagePlaceholder": "..."
  },
  "footer": { "tagline": "...", "legal": "..." }
}
```

## TinaCMS Configuration

`tina/config.ts` defines two collections (one per language), each pointing at a single fixed JSON file. `match` and `ui.allowedActions` prevent editors from creating or deleting documents — required to preserve the single-file assumption in `content.ts`.

```ts
// tina/config.ts (abbreviated shape)
import { defineConfig } from "tinacms";

export default defineConfig({
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,
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
        ui: { allowedActions: { create: false, delete: false } },
        fields: [ /* nav, hero, ziele, projekte, kontakt, footer — see field definitions below */ ],
      },
      {
        name: "en",
        label: "English Content",
        path: "src/data",
        match: { include: "en" },
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [ /* same shape as de */ ],
      },
    ],
  },
});
```

Each section (nav, hero, ziele, projekte, kontakt, footer) is an `object` field with nested sub-fields. `typewriterWords` must be:

```ts
{ type: "string", name: "typewriterWords", label: "Typewriter Words", list: true }
```

This serializes as a JSON array, required by `LandingPage.astro` (`t.hero.typewriterWords.join(',')`).

### Generated files

```
tina/
  config.ts          ← collection definitions (hand-authored)
  __generated__/     ← auto-generated types and schema (MUST be committed to Git)
```

`tina/__generated__/` must be committed. Tina Cloud reads `_graphql.json` and `_schema.json` at build time. Check `.gitignore` and ensure this directory is not excluded. If it is, add `!tina/__generated__/` as an override.

## Admin Route

Astro static output does not serve unknown paths. TinaCMS's `tinacms dev` / `tinacms build` generates the admin UI into `public/admin/` (configured via `build.outputFolder: "admin"` and `build.publicFolder: "public"` in `tina/config.ts`). This means the admin is served as a static asset at `/admin/index.html` — no custom `src/pages/admin/` file is needed. Editors access it at `/admin/index.html` (or `/admin` if a redirect is added).

## Editor Access

- **Local dev:** editors visit `http://localhost:4321/admin/index.html`; TinaCMS runs in local mode; no credentials required
- **Production:** editors visit `https://<site>.netlify.app/admin/index.html`; authenticate via Tina Cloud (free tier); saves are committed to GitHub on the editor's behalf

## Build & Deploy

### Development

```bash
npm run dev   # runs: tinacms dev -c "astro dev"
```

`tinacms dev` starts the local Tina server and generates `tina/__generated__/`. Local mode requires no `TINA_PUBLIC_CLIENT_ID` or `TINA_TOKEN`.

### Production (Netlify)

Create or update `netlify.toml`. If Netlify UI build settings exist, clear them to avoid conflicts.

```toml
[build]
  command = "npx tinacms build && npm run build"
  publish = "dist"
```

`tinacms build` generates the admin UI into `public/admin/` and emits `tina/__generated__/`. `npm run build` runs `astro build`, which copies `public/admin/` into `dist/`.

### Tina Cloud (one-time developer setup)

1. Create a free project at [tina.io](https://tina.io)
2. Connect it to the GitHub repository
3. Add to Netlify environment variables (exact names printed by `npx @tinacms/cli@latest init` — verify against CLI output):
   - `TINA_PUBLIC_CLIENT_ID`
   - `TINA_TOKEN`

After setup, editors log in at `/admin/index.html`, edit content, hit Save — a commit appears in the repo and Netlify auto-deploys.

## Dependencies

Run `npx @tinacms/cli@latest init` in the project root. The init command handles dependency installation and prints the correct env var names. Packages added:
- `tinacms` — runtime dependency (React-based editor UI served in the browser at `/admin`)
- `@tinacms/cli` — dev dependency (CLI for `tinacms dev` and `tinacms build`)

## Implementation Steps (ordered)

1. Run `npx @tinacms/cli@latest init` — installs deps, scaffolds `tina/config.ts`, and prints env var names
2. Check `tsconfig.json` — add `"resolveJsonModule": true` if not present
3. Create `src/i18n/types.ts` with full `Content` interface matching all sections and fields
4. Create `src/data/de.json` and `src/data/en.json` from current `content.ts` values
5. Rewrite `src/i18n/content.ts` to import JSON files and re-export with `Record<Lang, Content>` typing (preserving `content`, `languages`, `defaultLang`, `Lang` exports)
6. Replace the scaffolded `tina/config.ts` with the DE + EN collections (match, format, allowedActions, all field definitions including `typewriterWords` as `list: true`)
7. Update `package.json` `dev` script to `tinacms dev -c "astro dev"`
8. Create or update `netlify.toml` with `command = "npx tinacms build && npm run build"` and `publish = "dist"`
9. Run `npx tinacms dev -c "echo done"` to generate `tina/__generated__/`; verify `.gitignore` does not exclude it; commit generated files
10. Test locally: run `npm run dev`, open `/admin/index.html`, edit a field in each language, verify JSON file updates and the Astro page reflects the change

## Out of Scope

- Rich-text / Markdown body content (not needed; all fields are plain strings or string arrays)
- Image management (no images in current content)
- Preview mode / visual editing overlay (can be added later)
- Role-based access control (Tina Cloud free tier handles auth sufficiently)
