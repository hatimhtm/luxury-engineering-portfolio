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

- **39 projects**, ranked. Flagships like GoPilates, Hope Assistant, Estelle, Viral OS and CloneOS lead with case studies; client websites have screenshots; smaller builds are listed.
- **Case studies** for every project: the problem, what was built, results, and the stack, generated from one data file (`lib/projects.ts`).
- **Launch films** for GoPilates and Estelle that play muted while they're on screen.

## How it's built

| | |
|---|---|
| **3D in Blender** | The hero and the case-study stills are real renders: the apps' actual screens on modelled phones and a display, lit by a low sun. Dark mode swaps in a night render of the same scene. |
| **Glass, approximated** | The navigation and panels approximate Apple's Liquid Glass with backdrop blur and layered edge highlights, and fall back to solid surfaces when the system asks for reduced transparency. |
| **Motion with a reason** | Sections rise in once as they enter the screen, the hero shifts a few pixels with the pointer, and films pause when you scroll away. All of it turns off with reduced motion. |
| **Light and dark** | Colours are CSS variables; the theme follows the device until you pick one, with no flash on load. |
| **Contact** | The form posts to `/api/contact`, which validates and rate-limits before forwarding. |

**Stack:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Framer Motion, Phosphor icons, Satoshi (self-hosted), Blender (Cycles) for the renders. Deployed on Vercel.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # what Vercel runs
```

## Credits

Satoshi by Indian Type Foundry, used under the ITF Free Font License. App screens belong to their apps' owners and appear with permission.

© 2026 Hatim El Hassak
