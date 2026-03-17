# METIS Website

Website für die gemeinnützige Gesellschaft METIS – evidenzbasierte Programme für Grundrechts- und Demokratieförderung.

## Tech Stack

- [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com)
- Bilingual: German (default `/`) and English (`/en`)
- Static output, Netlify-ready (form handling via `data-netlify`)

## Structure

```
src/
  i18n/content.ts      # All DE/EN copy
  layouts/Layout.astro # Nav + footer
  components/LandingPage.astro  # All sections
  pages/index.astro    # German page
  pages/en/index.astro # English page
  styles/global.css    # Tailwind import
```

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # Static output → dist/
```
