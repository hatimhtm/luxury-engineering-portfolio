<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets-readme/hero-night.jpg" />
    <img src="assets-readme/hero.jpg" alt="GoPilates, Estelle and Hope Assistant on phones and a Mac display, rendered in Blender" width="100%" />
  </picture>
</p>

# hatimelhassak.is-a.dev

The portfolio of Hatim El Hassak, a senior product engineer who builds native apps for iPhone, Mac and Android, and the systems behind them.

**Live:** [hatimelhassak.is-a.dev](https://hatimelhassak.is-a.dev)

## What's on it

- **39 projects**, each with a case study and a visual: a trailer, a Blender render, or an edited capture of the real product.
- **Dedicated pages** for Work (filterable), About, Services, Stack and Contact.
- **Launch films** for GoPilates and Estelle.

## How it's built

| | |
|---|---|
| **Liquid Glass** | Real refraction, not just blur: each glass surface builds a displacement map for its own shape and bends the page behind it through an SVG filter, with a light rim and a slight colour split. Chromium gets the full effect; Safari and Firefox fall back to frosted glass, and to solid surfaces when the system asks for reduced transparency. |
| **3D in Blender** | The hero and the case-study stills are Cycles renders of the apps' real screens on modelled phones and a display. Dark mode swaps in a night render. |
| **Motion** | A glass lens you can drag over the hero, headings that rise word by word, a paragraph that lights up as you scroll, a film that grows to full screen, a case-study rail that moves sideways, a dock that magnifies under the cursor, a marquee that follows your scroll speed, and a timeline that draws itself. Everything turns off with reduced motion. |
| **Edited captures** | `scripts/sync_media.py` registers every visual in `public/work`; the captures are framed in browser windows and phones and tinted from each product's own colours. |
| **Light and dark** | Colours are CSS variables; the theme follows the device until you pick one, with no flash on load. |

**Stack:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Framer Motion, Phosphor icons, Satoshi and Clash Display (self-hosted), Blender (Cycles) for the renders. Deployed on Vercel.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # what Vercel runs
```

## Credits

Satoshi and Clash Display by Indian Type Foundry, used under the ITF Free Font License. App screens belong to their apps' owners and appear with permission.

© 2026 Hatim El Hassak
