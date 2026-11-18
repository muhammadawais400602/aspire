# Aspire College

Aspire Group of Colleges — student, teacher, and campus portal delivering the Aspire Institute of Technology (AIT) Digital Skill Certification program.

## Stack

- Next.js 15 (App Router, React 19)
- TypeScript
- Google Fonts via `next/font` (Space Grotesk, Inter)
- Zero-dependency scroll motion (IntersectionObserver, `prefers-reduced-motion` aware)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — Next.js lint

## Routes

- `/` — public homepage (admissions-facing)

## Design

- Paper-neutral background with a deep moss accent, used sparingly.
- Space Grotesk for display, Inter for body.
- Editorial single-column layout, generous gutters, type-led hierarchy.
- Light scroll reveals and sticky-nav blur only; no scroll-jacking.
- Light and dark themes defined through CSS custom properties.
