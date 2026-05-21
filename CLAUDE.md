# Novamark Digital — Project Standards

## Project Overview

Astro 6 + Tailwind CSS 4 + GSAP 3 + Lenis static marketing site for a digital agency.
Brand accent: `#4F6EF7` (blue) → `#7C3AED` (violet). Dark theme only.

---

## Design Standards (premium-motion-ui)

These principles apply to **all work in this project** — brainstorming, planning, and
implementation. Every CE skill (`ce:brainstorm`, `ce:plan`, `ce:work`, `frontend-design`)
must apply them. Never output generic UI. Always translate to a specific, premium direction.

**Reference bar**
- Apple: clarity, restraint, spacing, hierarchy, screen-fitting layouts — treat as the baseline.
- Awwwards / CSS Design Awards: ambitious visual ideas and motion inspiration — push beyond Apple where the brand allows.
- Brand, audience, and conversion goal always outweigh style trends.

**Core mission**
- Make the UI feel expensive without becoming chaotic.
- Improve the original idea, not just decorate it.
- Every design decision must be responsive by default.

**Clarity first**
- Main message obvious within seconds. Strong hierarchy. Intentional whitespace.
- Reduce noise before adding style.

**Premium visual system**
- Consistent type scale, spacing scale, and grid. One dominant layout language per page.
- Fewer colors, fewer effects, stronger composition. Spacing feels measured and confident.

**Motion with purpose**
- Animations must explain, reveal, guide, or delight — never flashy for its own sake.
- Prefer `transform` and `opacity` only. No layout-shifting animations.
- Smooth, restrained, elegant. Motion makes the product feel alive, not distracting.
- All animations gated behind `prefers-reduced-motion: no-preference`.

**Responsive excellence**
- Mobile-first. Every section reflows gracefully across phone → tablet → laptop → desktop.
- No horizontal scroll. Preserve hierarchy at every breakpoint.

**Accessibility**
- Strong contrast. Readable text at all sizes. Never rely on motion alone to convey meaning.
- Keyboard and screen-reader friendly. Every interactive element is obvious and usable.

**Implementation realism**
- Patterns that build cleanly in modern frontend code.
- No impossible or unstable effects. Scalable components over one-off visuals.

**Quality benchmark — ask before shipping any UI:**
- Is the hero instantly clear?
- Does the page feel premium at first glance?
- Does spacing look intentional?
- Does motion feel smooth and restrained?
- Does the layout hold up on mobile?
- Would this feel credible next to top-tier agency sites?

---

## Skill Behavior

- When running `ce:brainstorm`, `ce:plan`, or `ce:work`, do **not** invoke the `review` skill at any point — it consumes too many tokens. Skip any built-in review step these skills would normally trigger.

---

## Tech Conventions

- Components live in `src/components/sections/home/` (home page sections)
- Animations use GSAP + ScrollTrigger via `src/scripts/animation.ts`; all gated with `mm.add()`
- Smooth scroll via Lenis (`src/scripts/lenis.ts`) — do not set CSS `scroll-behavior: smooth`
- Tailwind CSS 4 utility classes + CSS custom properties in `src/styles/global.css`
- New dependencies require justification; keep bundle lean
