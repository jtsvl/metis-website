# METIS Website — Design System Spec
**Date:** 2026-03-17
**Status:** Approved by client
**Reference:** [braks.legal](https://www.braks.legal) (editorial, type-forward, dark-dominant)

---

## 1. Design Principles

| Principle | Description |
|-----------|-------------|
| **Schlicht** | Nothing decorative that doesn't carry meaning. Restraint over ornamentation. |
| **Type-forward** | Typography is the primary design element. Hierarchy through weight, scale, and spacing. |
| **Dark & authoritative** | Dark charcoal base signals seriousness and civic weight — like a court document or a broadsheet. |
| **One accent** | A single, logo-matched slate blue punctuates CTAs, labels, and interactive states. Nothing else. |
| **Motion with purpose** | The hero typewriter animation signals the breadth of METIS's mission. All other motion is subtle: hover transitions only. |

---

## 2. Colour Tokens

> **Tailwind v4 token strategy (Issue 6):** All design tokens are defined in a `@theme { }` block inside `src/styles/global.css`. This generates native Tailwind utility classes (`bg-bg`, `text-text-1`, `border-border`, etc.) and is the idiomatic Tailwind v4 approach — no `var()` arbitrary syntax needed in markup. The `:root` CSS custom properties are *also* emitted by Tailwind's `@theme`, so they remain available for inline styles when needed.

All colours defined as CSS custom properties in `src/styles/global.css`.

### Background & Surface

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#161618` | Page background |
| `--bg-2` | `#1e1e21` | Sections, panels (Ziele, Kontakt) |
| `--bg-3` | `#252528` | Cards, inputs, hover states |
| `--border` | `rgba(255,255,255,0.08)` | Default borders |
| `--border-hover` | `rgba(255,255,255,0.18)` | Hover/focus borders |

### Text

| Token | Value | Usage | Contrast on `--bg` |
|-------|-------|-------|--------------------|
| `--text-1` | `#f0eeeb` | Headlines, primary copy | ~16:1 ✅ AAA |
| `--text-2` | `rgba(240,238,235,0.65)` | Body copy, descriptions | ~6.4:1 ✅ AA |
| `--text-3` | `rgba(240,238,235,0.38)` | Labels, nav, muted metadata | ~3.1:1 — large text / UI only |

> **Note (Issue 7):** `--text-2` is set to 0.65 opacity (not 0.55) to achieve ≥ 4.5:1 on `--bg` for WCAG AA body text. `--text-3` at 0.38 achieves ~3.1:1 and is used only for labels ≥ 10px uppercase (counts as "large text equivalent" by WCAG). Pairs to verify before ship: `--text-2` on `--bg-2` (#1e1e21) and `--text-2` on `--bg-3` (#252528) — both will be lighter than on `--bg` and should pass.

### Accent (derived from METIS logo)

| Token | Value | Usage |
|-------|-------|-------|
| `--accent` | `#5b7fa6` | CTAs, active nav, focus rings, kicker text |
| `--accent-light` | `#7a9ec4` | Hover state on accent, icon outlines |
| `--accent-dim` | `rgba(91,127,166,0.15)` | Icon backgrounds, badge backgrounds |

---

## 3. Typography

Two fonts from Google Fonts, loaded via `<link>` in `Layout.astro` `<head>` (Issue 4):

```html
<!-- Paste exactly into Layout.astro <head>, before global.css -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### Font Families

| Role | Font | Weights |
|------|------|---------|
| **Display** (headings, hero) | [DM Sans](https://fonts.google.com/specimen/DM+Sans) | 300 Light, 500 Medium |
| **Body** (copy, UI) | [Inter](https://fonts.google.com/specimen/Inter) | 400 Regular, 500 Medium, 600 SemiBold |

### Type Scale

| Token | Size | Weight | Letter-spacing | Usage |
|-------|------|--------|---------------|-------|
| `--t-d1` | `clamp(52px, 8vw, 80px)` | DM Sans 300 | -0.02em | Hero headline (animated) |
| `--t-d2` | `clamp(36px, 5vw, 52px)` | DM Sans 300 | -0.015em | Section hero display |
| `--t-h1` | `32px` | DM Sans 500 | -0.01em | Section titles |
| `--t-h2` | `22px` | DM Sans 500 | 0 | Card titles, sub-sections |
| `--t-body` | `16px` | Inter 400 | 0 | Body copy |
| `--t-small` | `13px` | Inter 400 | 0 | Descriptions, secondary |
| `--t-label` | `10px` | Inter 500 | 0.16em (+ uppercase) | Kickers, tags, nav links |

### Letter-spacing conventions
- All-caps labels: `0.14–0.18em`
- Hero kicker: `0.20em`
- Navigation: `0.12em`
- Body and headings: `-0.01em` to `0` (tight, not loose)

---

## 4. Spacing

> **Horizontal padding decision (Issue 5):** The page gutter (horizontal padding on the max-width wrapper) is `40px` desktop and `20px` mobile. `--space-l` (48px) is used only for vertical gaps *between* elements within a section, not for the page gutter. These are two distinct properties.

Based on an 8px grid.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `8px` | Tight gaps, icon padding |
| `--space-s` | `16px` | Between inline elements |
| `--space-m` | `24px` | Between card contents |
| `--space-l` | `48px` | Between section elements |
| `--space-xl` | `80px` | Section vertical padding |
| `--space-2xl` | `120px` | Hero top/bottom padding |

---

## 5. Layout & Grid

| Property | Value |
|----------|-------|
| Max content width | `1100px` |
| Page gutter (horizontal) | `40px` (desktop `≥640px`), `20px` (mobile) |
| Section grid | CSS Grid, `grid-template-columns: repeat(3, 1fr)`, gap `24px` |
| Border radius | `4px` (buttons, inputs) · `6px` (cards) · `2px` (labels/badges) |

---

## 6. Motion & Animation

| Element | Animation | Duration |
|---------|-----------|----------|
| Hero typewriter | Type char-by-char → pause 1.8s → delete → cycle | `100ms/char` type, `60ms/char` delete |
| Cursor blink | `border-right` opacity toggle | `1s step-end infinite` |
| Card hover | `border-color` transition | `200ms ease` |
| Button hover | `background` lightens slightly | `150ms ease` |
| Nav links | `color` transition | `150ms ease` |
| Page scroll | `scroll-behavior: smooth` on `<html>` | Native |

Typewriter words (hero): `"Wissen." → "Mut." → "Engagement." → "Dialog." → "Grundrechte."`
English equivalents: `"Knowledge." → "Courage." → "Engagement." → "Dialogue." → "Fundamental Rights."`

> **content.ts schema update (Issues 1 & 2):** The existing `hero.headline` two-element array is restructured. The static prefix of the second line (e.g. "Demokratie braucht") moves to a new `hero.headlinePrefix` key. The cycling words replace `hero.headline[1]` entirely and live in a new `hero.typewriterWords: string[]` key. The component reads `t.hero.headlinePrefix` as a static string and `t.hero.typewriterWords` as the animation word list. This preserves the "no hardcoded text in components" rule.

**New `content.ts` keys** (both `de` and `en` objects):
```ts
hero: {
  headlineLine1: "Demokratie braucht",   // DE; "Democracy needs" for EN
  headlinePrefix: "",                    // empty — prefix is part of line1
  typewriterWords: ["Wissen.", "Mut.", "Engagement.", "Dialog.", "Grundrechte."],
  // EN: ["Knowledge.", "Courage.", "Engagement.", "Dialogue.", "Fundamental Rights."]
  subline: "...",
  cta: "Unsere Arbeit",
  ctaSecondary: "Mehr über uns",
}
```
The component renders:
```html
<h1>
  {t.hero.headlineLine1}<br>
  <span id="typewriter">{t.hero.typewriterWords[0]}</span>
</h1>
```

---

## 7. Components

### Navigation (`Layout.astro`)
- Fixed, `z-50`, `backdrop-blur-sm`, `bg-[--bg]/90`
- Left: Logo mark + "METIS" wordmark (DM Sans 500, tracked) + tagline in `--text-3`
- Right: Nav links (Inter, `--t-label`, `--text-2` → `--text-1` on hover) + language switcher (accent border, accent text)
- Height: `64px`

### Hero (`LandingPage.astro`, section `#hero`) — Issues 3 & 8 addressed
- Full viewport (`min-h-screen`)
- Kicker line: `--t-label`, `--accent`, `0.20em` tracking, uppercase
- Headline: `--t-d1`, DM Sans 300, two lines — line 2 is the animated word + cursor
- Sub-copy: `--t-body`, `--text-2`, max-width `540px`
- CTAs: primary button + ghost/underline secondary
- Dot-grid texture: `position: absolute`, bottom-right, implemented as a CSS `radial-gradient` background-image pattern (no inline HTML grid — keeps DOM clean):
  ```css
  background-image: radial-gradient(circle, var(--text-1) 1.5px, transparent 1.5px);
  background-size: 16px 16px;
  width: 320px; height: 160px;
  opacity: 0.12;
  pointer-events: none;
  ```
  Dot color: `--text-1` (warm white). Dot diameter: 3px. Grid pitch: 16px. This matches the braks.legal dot pattern.
- Background: `--bg` (flat, no gradient)

### Section wrapper pattern — horizontal padding clarified
- `background: --bg` or `--bg-2` (alternating)
- `padding: --space-xl 0`
- `max-width: 1100px`, centered, horizontal padding `40px` desktop / `20px` mobile
- Section title: `--t-h1`, preceded by a `--t-label` kicker

### Goal Card (Ziele section)
- `background: --bg-3`, `border: 1px solid --border`, `border-radius: 6px`, `padding: 24px`
- Icon container: `36×36px`, `background: --accent-dim`, `border: 1px solid --accent`, `border-radius: 4px`
- Title: `--t-h2`, `--text-1`
- Body: `--t-small`, `--text-2`
- Hover: `border-color: --border-hover`

### Project Card (Projekte section)
- Same shell as goal card
- Tag badge: `--t-label`, `--accent`, `background: --accent-dim`
- Title: `--t-h2`
- Description: `--t-small`, `--text-2`

### Contact Form (Kontakt section)
- Section background: `--bg-2`
- Input: `background: --bg-3`, `border: 1px solid --border`, `border-radius: 4px`, padding `10px 14px`
- Input focus: `border-color: --accent`
- Placeholder: `--text-3`
- Labels: `--t-label`, `--text-3`
- Submit: primary button, full-width

### Footer (`Layout.astro`)
- `background: --bg-2`, top `border: 1px solid --border`
- Two-column: brand/tagline left, legal/links right
- All text: `--t-small`, `--text-3`

---

## 8. Implementation Checklist

### Files to modify
- `src/styles/global.css` — replace single `@import "tailwindcss";` line with `@import "tailwindcss";` followed by the `@theme { }` block from Section 8
- `src/layouts/Layout.astro` — update nav design + footer + add Google Fonts link
- `src/components/LandingPage.astro` — rewrite all four sections with new tokens
- `src/i18n/content.ts` — update hero typewriter word arrays (DE + EN)

### New additions
- Google Fonts `<link>` tags in `Layout.astro` `<head>` (exact tags defined in Section 3)
- Typewriter JS: inline `<script>` tag at bottom of `LandingPage.astro` hero section (Astro bundles it automatically). The script targets `document.getElementById('typewriter')` — that ID must be on the animated `<span>`. It reads the word list from a JS array embedded in the script; because Astro components are server-rendered, the component passes the word list via a `data-words` attribute on the `<span>` and the script reads `el.dataset.words.split(',')`.
  ```html
  <!-- In LandingPage.astro hero: -->
  <span id="typewriter" data-words={t.hero.typewriterWords.join(',')}>{t.hero.typewriterWords[0]}</span>

  <!-- At bottom of LandingPage.astro: -->
  <script>
    const el = document.getElementById('typewriter');
    const words = el.dataset.words.split(',');
    // ... typewriter loop
  </script>
  ```
  Astro's default `<script>` handling defers script execution to after DOM is ready — no `DOMContentLoaded` wrapper needed.

### Tailwind v4 token strategy
- Define all tokens in a `@theme { }` block in `src/styles/global.css` (Tailwind v4 native)
- This generates utility classes: `bg-bg`, `bg-bg-2`, `bg-bg-3`, `text-text-1`, `text-text-2`, `text-text-3`, `text-accent`, `border-border`, etc.
- No `var()` arbitrary syntax in markup
- Example `@theme` block:
  ```css
  @theme {
    --color-bg:           #161618;
    --color-bg-2:         #1e1e21;
    --color-bg-3:         #252528;
    --color-text-1:       #f0eeeb;
    --color-text-2:       rgba(240,238,235,0.65);
    --color-text-3:       rgba(240,238,235,0.38);
    --color-accent:       #5b7fa6;
    --color-accent-light: #7a9ec4;
    --color-accent-dim:   rgba(91,127,166,0.15);
    --color-border:       rgba(255,255,255,0.08);
    --color-border-hover: rgba(255,255,255,0.18);
    --font-display:       'DM Sans', system-ui, sans-serif;
    --font-body:          'Inter', system-ui, sans-serif;
  }
  ```

---

## 9. Acceptance Criteria

> **Note on `.superpowers/` directory:** The visual companion mockups used during design exploration are saved to `.superpowers/brainstorm/mockups/` in the project root. This directory is local-only and should be added to `.gitignore`. No code changes are required — this is a one-time manual addition to `.gitignore`.

- [ ] Dark charcoal hero is full-viewport
- [ ] Typewriter animation cycles through ≥4 words in both DE and EN
- [ ] Cursor blinks at correct 1s cadence
- [ ] Dot-grid texture (CSS radial-gradient, 16px pitch, opacity 0.12) visible in hero bottom-right
- [ ] Logo slate-blue accent (`#5b7fa6`) used for all CTAs, active links, and focus states
- [ ] `--text-1` on `--bg`: ≥ 14:1 (verify with browser devtools or webaim.org/resources/contrastchecker)
- [ ] `--text-2` on `--bg`: ≥ 4.5:1 (AA body text)
- [ ] `--text-2` on `--bg-2`: ≥ 4.5:1
- [ ] Navigation is fixed, blurs background on scroll
- [ ] Language switcher switches DE ↔ EN correctly, typewriter words switch language
- [ ] Netlify contact form still has `data-netlify="true"`, `name="contact"`, and hidden `form-name` input
- [ ] `npm run build` exits with code 0, no TypeScript errors
- [ ] Google Fonts load on first visit (network tab: 2 font requests to fonts.gstatic.com)
