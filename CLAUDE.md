# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build static site to dist/
npm run preview   # Preview the built site
```

## Architecture

This is an Astro v6 static site with Tailwind CSS v4 (loaded via `@tailwindcss/vite` plugin, not PostCSS). It deploys to Netlify.

### i18n Pattern

All copy lives exclusively in `src/i18n/content.ts`. Components never contain hardcoded text strings. The site is bilingual:
- German (`de`) is the default language, served at `/`
- English (`en`) is served at `/en`

The `Lang` type is `"de" | "en"`. Pages pass `lang` as a prop down to `Layout.astro` and `LandingPage.astro`, which call `content[lang]` to get translated strings.

### Page Structure

Both language pages follow the same pattern:
```
src/pages/index.astro        → <Layout lang="de"><LandingPage lang="de" /></Layout>
src/pages/en/index.astro     → <Layout lang="en"><LandingPage lang="en" /></Layout>
```

`Layout.astro` provides the HTML shell, fixed navigation (with language switcher), and footer. `LandingPage.astro` contains all four sections: Hero → Ziele → Projekte → Kontakt.

### Contact Form

The contact form uses Netlify form handling (`data-netlify="true"`, `name="contact"`). The hidden `form-name` input is required for Netlify to detect it at build time.

### Adding Content or Sections

1. Add translations to both `de` and `en` objects in `src/i18n/content.ts`
2. Use the new keys via `t.yourKey` in components — never inline strings
3. Add new pages under `src/pages/` (German) and `src/pages/en/` (English)
