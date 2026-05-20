---
title: "feat: Serve Motions Dark Premium Redesign"
type: feat
status: completed
date: 2026-05-19
origin: docs/brainstorms/2026-05-19-serve-motions-redesign-requirements.md
---

# feat: Serve Motions Dark Premium Redesign

## Overview

Complete visual overhaul of the Serve Motions Astro site from a light/teal theme to a dark cinematic aesthetic: electric blue + violet accent palette, Swiper testimonial carousel, vertical timeline rewrites, GSAP animation timing updates, and dark-compatible restyling of every section across all 4 pages + 404.

## Problem Frame

The current site uses `#FFFFFF` backgrounds with a `#00C9A7` teal accent — readable, but generic. The target audience is motion/digital agencies and growth-stage brands who expect premium visual quality. The redesign introduces a `#0A0A0A` base, `#4F6EF7`/`#7C3AED` electric blue–violet accent gradient, and cinematic animation timing to match this positioning.

Origin: `docs/brainstorms/2026-05-19-serve-motions-redesign-requirements.md`

## Requirements Trace

- R1 — Token system replacement + `--color-surface-2` addition
- R2–R3 — Dark background on all pages, no white sections
- R4 — Cursor ring visibility on dark bg
- R5 — Image overlays
- R6 — Preloader wordmark + timing update
- R7–R10 — Typography + section label style
- R11–R14 — Navigation restyle
- R15–R20 — Homepage Hero
- R21–R23 — Marquee strip
- R24–R25 — WhoWeAre two-column + image
- R27–R30 — Services grid dark cards
- R31–R33 — Featured work
- R35–R37 — Testimonials Swiper carousel
- R38–R39 — CTA band
- R40–R44 — About page
- R45–R48 — Services page
- R49–R51 — Contact page
- R52 — 404 page

## Scope Boundaries

- No new pages — Home, About, Services, Contact, 404 only
- No Three.js / WebGL / canvas
- No CMS or backend
- `swiper` is the only new npm dependency approved
- Pinned work card stack (R34) deferred to post-v1
- No breadcrumb navigation (R40 scope note)
- GSAP SplitText must NOT be used — Splitting.js exclusively

## Context & Research

### Relevant Code and Patterns

**Token system** (`src/styles/global.css` `@theme` block):
- All section backgrounds use `bg-[var(--color-bg)]` or `bg-[var(--color-surface)]` — auto-update via token swap
- Two hardcoded rules NOT covered by token swap: `header.scrolled` background (`rgba(255,255,255,0.8)`), `.cursor-ring` border (`rgba(11,11,26,0.35)`)
- `--color-surface-2` does not yet exist — must be added as a new token
- `--shadow-card` uses `rgba(0,0,0,0.08)` — needs to deepen for dark backgrounds

**Animation patterns** (`src/scripts/animation.ts`):
- `initPageOverlay()` uses `gsap.to(overlay, { opacity: 0, duration: 0.4 })` — update to `0.6`
- `initScrollAnimations()` uses `[data-animate]` attribute + GSAP stagger on direct children — keep unchanged
- `initCounters()` uses `[data-counter]` + `data-target` — keep unchanged
- All animations wrapped in `gsap.matchMedia()` for reduced-motion compliance — preserve this pattern

**Splitting.js pattern** (`src/scripts/splitting.ts`):
- Elements with `[data-splitting]` start `visibility:hidden`, Splitting runs, then `.splitting` class shows them
- No TypeScript declarations exist — `declare module 'splitting'` needed in `src/env.d.ts`

**Component script timing** (`src/layouts/BaseLayout.astro`):
- Scripts execute: `initSplitting()` → `initPageOverlay()` → `initScrollAnimations()` → `initCounters()` → `initCursor()` → `initMagnetic()`
- Hero `<script>` runs inline after `BaseLayout` script — `delay: 0.45` must increase to `0.7`

**Section label pattern** (used in every section component):
- Current: `<p class="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-alt)] mb-4">Label</p>`
- Target (R10): prepend `· ` (middle dot space) + change from `accent-alt` (becomes violet) to `accent` (electric blue)
- This update applies to every section component across all pages

**Service cards** (`src/components/sections/home/ServicesGrid.astro`):
- `.service-card` in `global.css` currently uses `border-left: 4px solid transparent` — must change to uniform `border: 1px solid transparent` (R29)
- Hover: `border-left-color: var(--color-accent)` → must change to `border-color: rgba(79,110,247,0.4)` on all sides
- Decorative number: `group-hover:text-[rgba(0,201,167,0.12)]` (hardcoded teal) → must change to accent blue equivalent

**ServiceBlock panels** (`src/components/sections/services/ServiceBlock.astro`):
- Six service panels use hardcoded Tailwind light classes: `bg-white`, `bg-sky-50`, `bg-amber-200`, `bg-pink-300`, `bg-violet-200`, `bg-gray-50`, etc.
- `services.ts` bgGradient values are all light pastel Tailwind gradients — must switch to CSS `linear-gradient()` with very-low-opacity dark tints
- Full inventory of light colors per panel documented in research; all need manual dark replacements

**Testimonials** (`src/components/sections/home/Testimonials.astro`):
- Currently a static CSS grid of 3 blockquotes — no Swiper
- `src/data/testimonials.ts` has `{ id, quote, name, company, role }` — add `rating: number` field (1–5 for star display) and optional `avatar` (initials string)

**MilestoneTimeline** (`src/components/sections/about/MilestoneTimeline.astro`):
- Desktop currently: `hidden lg:grid grid-cols-4 gap-8` with horizontal top line
- Mobile currently: vertical `space-y-8` flex layout — this pattern is already correct and becomes the universal layout
- Rewrite: single vertical alternating layout for all breakpoints (remove `hidden lg:grid`)
- Content text: "NovaMark Digital" appears in milestone data — update brand name to "Serve Motions"

**ProcessTimeline** (`src/components/sections/services/ProcessTimeline.astro`):
- Desktop: `hidden lg:block` with horizontal `#timeline-progress` + `scaleX` GSAP animation
- Mobile: already vertical `space-y-10` flex layout — same as MilestoneTimeline
- `global.css` `.timeline-line`: `transform-origin: left; transform: scaleX(0)` — update to `transform-origin: top; transform: scaleY(0)` (R47)

**FAQAccordion** (`src/components/sections/services/FAQAccordion.astro`):
- Icon is a `<span>` with `icon.textContent = '+'` / `'×'` — JS text swap
- Replace with a CSS chevron `<svg>` element that rotates 45° on open via CSS `transform`
- Bug: `gsap.to(otherContent, { height: 0 })` in the close loop has no `killTweensOf` guard — stale `scrollHeight` mid-tween causes incorrect heights (R48)

**FeaturedWork** (`src/components/sections/home/FeaturedWork.astro`):
- Cards already use dark gradients from `src/data/work.ts` — already dark-native
- `.work-card:hover` in `global.css` currently `transform: scale(1.02)` — update to `scale(1.04)` (R33)
- No image overlay element currently exists — need to add a `::before` overlay in CSS or explicit overlay div

**WhoWeAre** (`src/components/sections/home/WhoWeAre.astro`):
- Currently: left = copy, right = stats (3 counters)
- R24 target: left = copy + stats below, right = image with overlay
- Content text: "NovaMark Digital was founded" — update to "Serve Motions was founded"

**Header** (`src/components/layout/Header.astro`):
- Scroll threshold: `window.scrollY > 60` → `> 80`
- CTA text: "Get a Quote" (two occurrences — desktop Button + mobile Button) → "Let's Talk"
- Mobile overlay close animation: currently `closeOverlay()` removes `.open` class immediately; add reverse GSAP stagger (links fade out, then overlay fades)
- CTA button needs `data-magnetic` attribute for existing `magnetic.ts` integration

**Button.astro** gradient variant:
- Current `primary` variant uses `bg-[var(--color-accent)]` — after token swap becomes electric blue #4F6EF7
- For the CTA buttons requiring accent gradient (R13, R19), add a `gradient` variant: `background: linear-gradient(135deg, #4F6EF7, #7C3AED)`

**PageHero** (`src/components/ui/PageHero.astro`):
- Currently plain section with `pt-40 pb-24` and no background class
- R40/R45/R49 require dark hero treatment for inner pages: full-width section with distinct dark surface background, possibly `data-splitting` on H1

**SectionCTA** (`src/components/ui/SectionCTA.astro`):
- Currently `bg-[var(--color-accent)]` — after token swap becomes electric blue bg
- CTABand.astro (homepage) needs a full replacement with R38's dark + radial-blob design
- SectionCTA is only used by CTABand.astro; CTABand will be rewritten to not use SectionCTA

**Version note**: `package.json` specifies `^3.12.7` for GSAP (requirements doc says 3.15) and `^1.1.20` for Lenis (doc says 1.3.23). The SplitText non-use rule applies regardless of installed version. All existing animation code is compatible with both ranges.

### Institutional Learnings

None — `docs/solutions/` does not yet exist for this project.

### External References

- Swiper docs: https://swiperjs.com/swiper-api — `slidesPerView`, `loop`, `autoplay`, `navigation`, `pagination`
- Tailwind v4 custom properties: `@theme {}` block serves as CSS variable source; all `bg-*`, `text-*`, `border-*` utilities that use `var()` in `[]` syntax auto-respond to token changes
- GSAP `killTweensOf`: call before re-tweening an element to prevent stale state

## Key Technical Decisions

- **Token swap is the primary multiplier**: Changing the 8 `@theme` tokens propagates to ~80% of the codebase's colors automatically. All remaining hardcoded colors are enumerated and addressed unit-by-unit.
- **ServiceBlock panels use dark glass-morphism**: Rather than per-color dark alternatives for each of 6 panels, all service illustration panels adopt `bg-[var(--color-surface-2)]` with a very-low-opacity brand-tint gradient overlay. This is simpler, consistent, and avoids creating 6 unique dark pastel systems.
- **MilestoneTimeline: remove the dual desktop/mobile layouts**: The existing mobile vertical layout is already the correct visual pattern. The rewrite promotes it to universal, eliminating the `hidden lg:grid` horizontal variant entirely.
- **ProcessTimeline: same approach as MilestoneTimeline**: Promote the mobile vertical layout to universal. Remove the `hidden lg:block` horizontal variant.
- **Circular badge (R18): SVG `<textPath>`**: Resolves the deferred planning question. SVG textPath makes text follow a circular arc — CSS spin rotates the whole element as a block without curving the text. SVG textPath is a single `<svg>` element with `<textPath>` on a `<circle>` path, roughly 80 chars of markup. Acceptable complexity for the visual quality gain.
- **Hero orb (R17): CSS `will-change: transform` + GSAP ScrollTrigger y**: CSS radial-gradient blob on a `div.hero-orb` element. GSAP ScrollTrigger adds a slow `y` parallax. Using `will-change: transform` on `.hero-orb` promotes it to its own compositor layer, preventing repaint on scroll.
- **Section labels (R10): inline `·` in each component, switch to `var(--color-accent)`**: No shared helper needed — the pattern is 1 line and easier to grep+verify if written explicitly per component.
- **Testimonials avatar fallback**: The existing `testimonials.ts` data has no avatar images. Display initials (first letter of `name`) in a colored circle rather than `<img>` tags. Add `initials` field to `Testimonial` interface, or derive it from `name` at render time.
- **CTABand becomes standalone**: `CTABand.astro` will be rewritten as a self-contained dark section with radial-blob background and gradient text highlight. It will no longer import `SectionCTA.astro`. `SectionCTA.astro` can be kept for potential future use or removed.

## Open Questions

### Resolved During Planning

- **R18 SVG textPath vs CSS spin**: SVG textPath chosen — better visual fidelity, single element, manageable complexity. (see origin: `docs/brainstorms/2026-05-19-serve-motions-redesign-requirements.md#outstanding-questions`)
- **R44 MilestoneTimeline data sufficiency**: 4 items confirmed in component — adequate for alternating left/right vertical layout (items at index 0, 2 have content on one side; 1, 3 on the other).
- **R17 Hero orb repaint concern**: `will-change: transform` on `.hero-orb` element + GSAP `y` only (no `top`/`margin`) confines repaints to compositor. No canvas needed.

### Deferred to Implementation

- **Swiper exact CSS import path**: Swiper v9+ uses modular CSS imports; the exact import for `swiper/css`, `swiper/css/autoplay`, `swiper/css/navigation`, `swiper/css/pagination` should be verified against the installed version's module structure
- **Hero char animation `y` vs `yPercent`**: R20 specifies `y: 40`. Current Hero uses `yPercent: 100`. The plan specifies `y: 40px` (absolute) to match the spec. Implementer should confirm this produces the correct visual against the preloader timing.
- **`data-magnetic` on Button.astro**: `magnetic.ts` targets `[data-magnetic]`. Verify Button.astro supports arbitrary data attribute passthrough via Astro's `...rest` props before adding to gradient CTA.

## High-Level Technical Design

> *This illustrates the intended approach and is directional guidance for review, not implementation specification. The implementing agent should treat it as context, not code to reproduce.*

**Token swap propagation model:**

```
global.css @theme { 8 tokens updated + 1 new token added }
    │
    ├─► ~80% of component colors auto-update via var() references
    │
    ├─► 4 hardcoded CSS rules need manual patch (header.scrolled, 
    │   .cursor-ring, .service-card border, .timeline-line axis)
    │
    └─► ServiceBlock.astro + services.ts — fully manual
        (6 service panels × N hardcoded Tailwind classes each)
```

**Swiper carousel structure (Testimonials, R35–R37):**

```
<section>
  <div class="swiper">
    <div class="swiper-wrapper">
      {testimonials.map(t => (
        <div class="swiper-slide">  <!-- card: stars, quote, author -->
        </div>
      ))}
    </div>
    <div class="swiper-button-prev"> ... </div>
    <div class="swiper-button-next"> ... </div>
    <div class="swiper-pagination"> ... </div>
  </div>
</section>
<script>  <!-- Swiper init: slidesPerView responsive, loop, autoplay -->
```

**Vertical timeline pattern (MilestoneTimeline + ProcessTimeline):**

```
<div class="relative">
  <!-- Vertical accent line (absolute, runs full height) -->
  <div class="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)]" />

  {items.map((item, i) => (
    <div class={i % 2 === 0 ? "flex flex-row" : "flex flex-row-reverse"}>
      <div class="w-1/2 pr-12 text-right OR pl-12 text-left">  <!-- content -->
      <div class="circle node centered on the line" />
      <div class="w-1/2 pl-12 OR pr-12">  <!-- empty spacer -->
    </div>
  ))}
</div>
<!-- Mobile: single column, line anchored left, content indented -->
```

## Implementation Units

### Phase 1 — Foundation

- [ ] **Unit 1: Global CSS token swap + CSS rule patches**

**Goal:** Replace all light-theme `@theme` tokens with the dark palette, add `--color-surface-2`, and patch the 4 CSS rules that use hardcoded light-mode values.

**Requirements:** R1–R4, R11 (header bg), R29 (service card border), R47 (timeline-line axis)

**Dependencies:** None — this is the prerequisite for all other units

**Files:**
- Modify: `src/styles/global.css`

**Approach:**
- In `@theme {}`, replace all 8 existing color tokens with dark values per requirements color system table; add `--color-surface-2: #1C1C1C` as a new token; update `--shadow-card` and `--shadow-lg` to deeper shadows for dark surfaces
- Patch `header.scrolled`: change `rgba(255,255,255,0.8)` → `rgba(10,10,10,0.85)`
- Patch `.cursor-ring`: change `rgba(11,11,26,0.35)` → `rgba(255,255,255,0.35)` (default ring) — `.cursor-ring.hovering` already uses `var(--color-accent)`, no change needed
- Patch `.service-card`: replace `border-left: 4px solid transparent` with `border: 1px solid var(--color-border)` (all sides); in `.service-card:hover`, replace `border-left-color: var(--color-accent)` with `border-color: rgba(79,110,247,0.4)`
- Patch `.timeline-line`: change `transform-origin: left` → `transform-origin: top`; change `transform: scaleX(0)` → `transform: scaleY(0)`
- Update `@keyframes underline-reveal` accent bar to use the new accent color (auto via token)
- Update `.nav-link::after` background (auto via token)
- **H2/H3 heading size utilities (R9)**: add two global utility classes — `.heading-h2 { font-size: clamp(3.5rem, 6vw, 4.5rem); }` and `.heading-h3 { font-size: clamp(2rem, 3.5vw, 2.5rem); }`. Alternatively, document the clamp values so each component can apply them inline. Note: most H2 elements currently use `text-4xl md:text-5xl` Tailwind utilities — these are close but slightly below the R9 spec. Implementer should decide whether to apply the exact clamp globally or leave headings at current sizes and only apply to new/rewritten sections. Either approach is acceptable; consistency is the goal.
- Work card `.work-card:hover`: update `scale(1.02)` → `scale(1.04)` (R33)
- Add `.work-card-overlay` CSS rule: `::before` pseudo-element with `rgba(0,0,0,0.5)` overlaying work card images; hover state transitions to `rgba(0,0,0,0.1)` (R5, R33)

**Patterns to follow:**
- Existing `@theme {}` block structure in `src/styles/global.css`

**Test scenarios:**
- Test expectation: none — pure CSS token/rule changes with no JavaScript behavior

**Verification:**
- Every `var(--color-bg)` usage on page renders as `#0A0A0A`; no white or off-white section backgrounds visible on any page
- `header.scrolled` class shows dark semi-transparent background when scrolled
- `.cursor-ring` border is visible (white) on dark background

---

- [ ] **Unit 2: env.d.ts + preloader wordmark + animation timing**

**Goal:** Add Splitting.js type declaration, update `BaseLayout.astro` to show "Serve Motions" wordmark in the preloader, update preloader fade duration, and update Hero animation delay.

**Requirements:** R6, R9 (H1 clamp), R15 (env.d.ts)

**Dependencies:** Unit 1 (dark bg must exist for white wordmark to be visible)

**Files:**
- Create: `src/env.d.ts`
- Modify: `src/scripts/animation.ts`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/sections/home/Hero.astro` (delay only)

**Approach:**
- `src/env.d.ts`: add `/// <reference types="astro/client" />` + `declare module 'splitting';`
- `src/scripts/animation.ts`: in `initPageOverlay()`, change `duration: 0.4` → `duration: 0.6`
- `src/layouts/BaseLayout.astro`: update `#page-overlay` div to include centered wordmark markup — a `<span>` containing "Serve Motions" styled white, Syne font, `text-2xl font-extrabold tracking-tight`; the preloader fades the entire overlay including the wordmark
- `src/components/sections/home/Hero.astro`: change `delay: 0.45` → `delay: 0.7` in the GSAP timeline; also change `yPercent: 100` → `y: 40` and `stagger: 0.018` → `stagger: 0.04` and `duration: 0.7` → `duration: 0.8` to match R20

**Patterns to follow:**
- Existing `#page-overlay` in `src/layouts/BaseLayout.astro`
- Existing `gsap.matchMedia()` wrapper in `src/scripts/animation.ts`

**Test scenarios:**
- Page load shows centered "Serve Motions" text on dark overlay before fading out
- Hero characters animate in after preloader has cleared (no overlap at ~0.7s)
- Reduced motion: preloader removes instantly, no char animation

**Verification:**
- On load, overlay with wordmark is visible for ~0.6s then fades
- Hero chars start sliding in at 0.7s mark, not overlapping preloader fade

---

### Phase 2 — Navigation

- [ ] **Unit 3: Header dark restyle + mobile close animation + CTA updates**

**Goal:** Update header scroll behavior, rename CTA button, add mobile close reverse animation, and wire magnetic effect to CTA.

**Requirements:** R11–R14

**Dependencies:** Unit 1 (token colors), Unit 2 (env.d.ts for TypeScript)

**Files:**
- Modify: `src/components/layout/Header.astro`
- Modify: `src/components/ui/Button.astro`

**Approach:**
- `Header.astro`: change `window.scrollY > 60` → `window.scrollY > 80` in scroll listener
- `Header.astro`: change "Get a Quote" → "Let's Talk" in both desktop Button and mobile Button (two occurrences)
- `Header.astro`: add `data-magnetic` attribute to the desktop CTA Button call so `magnetic.ts` picks it up (verify Button forwards `...rest` props to the anchor element)
- `Header.astro` `closeOverlay()`: add GSAP reverse stagger before removing `.open` class — `gsap.to(mobileLinks, { opacity: 0, y: -10, duration: 0.25, stagger: 0.05 })` followed by overlay fade `onComplete` that removes the class; keep simple and non-janky
- `Button.astro`: add a `gradient` variant — `background: linear-gradient(135deg, var(--color-accent), var(--color-accent-alt))`, white text, pill shape; existing `primary` variant keeps its token-driven bg (which now auto-maps to electric blue after token swap). The `gradient` variant is for the header CTA and hero primary CTA.
- Consider updating mobile nav link font size to `text-5xl` for cinematic feel (R14)

**Patterns to follow:**
- Existing `openOverlay()` GSAP fromTo in `src/components/layout/Header.astro`
- Existing button variants in `src/components/ui/Button.astro`

**Test scenarios:**
- Happy path: header is transparent at scroll 0; dark blurred bg appears at scroll 81px, not 61px
- Happy path: mobile menu opens with stagger-in; close button triggers stagger-out before overlay disappears
- Happy path: CTA label reads "Let's Talk" in both desktop nav and mobile menu
- Edge case: keyboard Escape still closes mobile menu correctly after close animation change

**Verification:**
- Scrolling to exactly 80px triggers no class change; 81px triggers `scrolled`
- Mobile menu close shows links fading out before the overlay itself disappears

---

### Phase 3 — Homepage Hero

- [ ] **Unit 4: Hero section full redesign**

**Goal:** Add dark orb background, circular text badge, gradient accent word, updated CTAs, and correct all animation parameters.

**Requirements:** R15–R20

**Dependencies:** Unit 1 (dark bg, accent tokens), Unit 2 (delay timing), Unit 3 (Button gradient variant)

**Files:**
- Modify: `src/components/sections/home/Hero.astro`

**Approach:**
- **Background**: replace inline `style="background: radial-gradient(...)"` with a `.hero-orb` positioned `div` — `position: absolute`, offset to upper-right, `z-index: -1`, styled with CSS `background: radial-gradient(ellipse 70% 70% at center, rgba(79,110,247,0.12), transparent)`; add a second smaller orb lower-left in violet `rgba(124,58,237,0.07)`. Add `will-change: transform` to both orbs. Add GSAP ScrollTrigger parallax in the hero script: `gsap.to('.hero-orb', { y: -80, ease: 'none', scrollTrigger: { trigger: 'section', start: 'top top', end: 'bottom top', scrub: true } })`.
- **H1 size**: update from `text-6xl sm:text-7xl md:text-8xl lg:text-[clamp(4rem,9vw,8rem)]` to `text-[clamp(3.5rem,7vw,5.625rem)] lg:text-[clamp(5.625rem,9vw,7.5rem)]` to match R9 H1 clamp
- **Accent word**: the headline already has `<span class="text-[var(--color-accent-alt)]">Dominate.</span>` — update to `text-[var(--color-accent)]` (electric blue) since accent-alt is now violet, which may be too dark for headline highlights. Consider updating headline copy for dark premium tone, e.g. "We Build Brands That Move." with "Move" in gradient text (optional, implementer judgment)
- **Circular badge (R18)**: add an SVG `<textPath>` badge element — absolutely positioned, top-right of section (visible only on `lg` screens). Circle radius ~70px, text: "SERVE MOTIONS · DIGITAL AGENCY ·" on the path. Apply `animation: rotate-slow 12s linear infinite` (reuse existing keyframe from `global.css`). Center icon: small `⚡` or simple SVG star shape.
- **Dual CTA (R19)**: change primary Button to use `variant="gradient"` (new from Unit 3); update label "Start a Project" → "Let's Talk"; keep secondary `variant="outline"` "Our Services"
- **Scroll indicator**: the current scroll indicator SVG line is fine; it auto-updates color via token

**Patterns to follow:**
- Existing `data-splitting` + `.splitting` class pattern in Hero.astro
- Existing `gsap.matchMedia()` wrapper
- `shape-rotate` class + `rotate-slow` keyframe in `src/styles/global.css`

**Test scenarios:**
- Happy path: hero orb is visible as soft blue glow on dark bg; scrolling causes slow parallax movement on the orb
- Happy path: circular text badge rotates continuously on desktop
- Happy path: chars animate in after ~0.7s with correct y:40→0, stagger 0.04s, duration 0.8s
- Reduced motion: badge is static, chars appear immediately without animation

**Verification:**
- Hero section has no visible white/light background
- Circular badge rotates on desktop, not visible or hidden on mobile (use `hidden lg:block`)
- CTA primary button shows gradient (not solid) background

---

### Phase 4 — Homepage Content Sections

- [ ] **Unit 5: MarqueeStrip dark restyle**

**Goal:** Update separator style and section label.

**Requirements:** R21–R23

**Dependencies:** Unit 1

**Files:**
- Modify: `src/components/sections/home/MarqueeStrip.astro`

**Approach:**
- Token swap handles `bg-[var(--color-surface)]`, `border-[var(--color-border)]`, and `text-[var(--color-text-muted)]` automatically
- Update separator from `✦` to `·` (accent-colored dot, R21 spec)
- Update separator color from `text-[var(--color-accent)]` to `text-[var(--color-accent)]` (already correct after token swap — now electric blue)
- Marquee pause on hover already works via `animation-play-state: paused` CSS

**Test scenarios:**
- Test expectation: none — token-driven restyle with no behavior change

**Verification:**
- MarqueeStrip renders on `--color-surface` background with visible keyword text and blue dot separators

---

- [ ] **Unit 6: WhoWeAre two-column restructure + image**

**Goal:** Move stats below copy on left; add an image with dark overlay to right column; update brand name in copy.

**Requirements:** R24–R25

**Dependencies:** Unit 1

**Files:**
- Modify: `src/components/sections/home/WhoWeAre.astro`

**Approach:**
- **Left column**: keep headline and body copy; move the 3 stats `data-counter` blocks to below the copy paragraphs on the left side (currently they're the entire right column)
- **Right column**: add an `<img>` or gradient placeholder (since no real photography exists — use a dark gradient placeholder `div` that resembles a dark abstract photo). Add a `rounded-2xl overflow-hidden` wrapper. Add a `relative` container with a `::before` dark overlay `rgba(0,0,0,0.5)` or use an absolutely-positioned sibling `div` with the overlay color and pointer-events-none
- **Responsive**: below `lg`, left column (text + stats) comes first; right column (image) follows with `max-h-[400px]`
- **Brand name**: update "NovaMark Digital was founded" → "Serve Motions was founded" in the copy paragraph
- **Section label**: update from `text-[var(--color-accent-alt)]` → `text-[var(--color-accent)]` + prepend `· ` (R10 section label pattern)

**Patterns to follow:**
- `lg:grid-cols-2` pattern from existing layout
- `data-counter` + `data-target` stats pattern (keep identical)

**Test scenarios:**
- Happy path desktop: copy + stats on left; image on right
- Happy path mobile: copy + stats rendered first; image below with max height
- Edge case: reduced motion — counters show target value immediately (existing `initCounters` behavior)

**Verification:**
- Stats counters still animate on scroll in the new position
- Right column placeholder looks like a dark image, not a blank space

---

- [ ] **Unit 7: ServicesGrid dark cards + section label**

**Goal:** Restyle service cards for dark bg; fix number hover color; update section label.

**Requirements:** R27–R30

**Dependencies:** Unit 1 (service card CSS patches)

**Files:**
- Modify: `src/components/sections/home/ServicesGrid.astro`

**Approach:**
- Token swap handles card background (`bg-[var(--color-bg)]` → dark), border, text colors automatically
- Number decorative span: change hardcoded `text-[var(--color-border)]` on default state — after token swap `--color-border` is `rgba(255,255,255,0.08)` which is correctly subtle; the hover `group-hover:text-[rgba(0,201,167,0.12)]` is hardcoded teal and must be changed to `group-hover:text-[rgba(79,110,247,0.08)]` (accent blue)
- Icon container: `bg-[var(--color-surface)]` on default → token auto-updates; `group-hover:bg-[var(--color-accent)]` auto-updates to electric blue
- Arrow link: `text-[var(--color-accent-alt)]` → change to `text-[var(--color-accent)]` (electric blue for links, not violet)
- Section label: update to R10 style — `· ` prefix + `text-[var(--color-accent)]`
- Card hover lift (`translateY(-4px)` + shadow) is handled by `.service-card:hover` in `global.css` (Unit 1)

**Patterns to follow:**
- Existing `data-animate` + GSAP stagger (no change needed)

**Test scenarios:**
- Happy path: 6 cards render on dark surface; on hover, card lifts with uniform border accent border
- Happy path: decorative numbers are barely visible (rgba low opacity), not prominent

**Verification:**
- No white or light-colored card backgrounds remain
- Uniform border appears on all 4 sides on hover (not just left)

---

- [ ] **Unit 8: FeaturedWork image overlay + "View All" link**

**Goal:** Add dark overlay that reveals on hover; add "View All" right-aligned link; add section label.

**Requirements:** R31–R33

**Dependencies:** Unit 1 (`.work-card-overlay` CSS, `.work-card:hover` scale update)

**Files:**
- Modify: `src/components/sections/home/FeaturedWork.astro`

**Approach:**
- FeaturedWork cards already use dark `bgGradient` values — no background changes needed
- Work card `.work-card-overlay` CSS is defined in Unit 1. In the component, add an absolutely-positioned overlay `div` inside each card with `class="work-card-overlay"` on top of the gradient background div
- Add "View Project →" text inside the overlay div (`opacity-0 group-hover:opacity-100 transition-opacity`)
- Add "View All Work" button/link right-aligned next to the section heading (R31): `<Button href="/work" variant="outline">View All →</Button>` — note: there's no `/work` page in scope, so use a `#` href or link to Contact for now (implementer decision)
- Section label: update to R10 style — `· ` + `text-[var(--color-accent)]`
- Add `group` class to work card articles (already present? verify)

**Patterns to follow:**
- Existing `group` + `group-hover:` utility pattern in other cards

**Test scenarios:**
- Happy path: overlay is visible as dark layer on cards; hover reveals "View Project →" text
- Happy path: image appears to "reveal" (overlay fades from 50% to 10% opacity) on hover

**Verification:**
- Work cards do not show full white or light background in any state
- Hover overlay transition is smooth (CSS transition, not JS)

---

- [ ] **Unit 9: Testimonials Swiper carousel rebuild**

**Goal:** Replace static 3-column grid with a fully configured Swiper carousel.

**Requirements:** R35–R37

**Dependencies:** Unit 1 (dark surfaces), `swiper` npm package must be installed

**Files:**
- Modify: `src/components/sections/home/Testimonials.astro`
- Modify: `src/data/testimonials.ts` (add `rating` field)
- Modify: `package.json` (add `swiper` dependency — run `npm install swiper`)

**Approach:**
- `src/data/testimonials.ts`: add `rating: number` to `Testimonial` interface; add `rating: 5` to all 3 existing entries; optionally add more testimonial entries (carousel loop works better with 4–5 slides). No real avatar images — derive initials from `name.charAt(0)` at render time.
- `Testimonials.astro`: import Swiper CSS for core + navigation + pagination + autoplay modules using the Swiper modular CSS paths (verify exact import paths against installed version). Import `Swiper` and plugins in a `<script>` block.
- **Card structure** (R36): star rating row (5 × `★` spans, accent yellow for filled stars), quote text, horizontal rule, author row (initials avatar circle + name + title + company)
- **Active card accent**: left border on active slide card — use CSS `.swiper-slide-active .testimonial-card { border-left: 2px solid var(--color-accent); }`
- **Swiper config** (R35): `slidesPerView: 1` mobile, `breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }`, `spaceBetween: 24`, `loop: true`, `autoplay: { delay: 4000, pauseOnMouseEnter: true }`, `navigation: { nextEl: '.swiper-btn-next', prevEl: '.swiper-btn-prev' }`, `pagination: { el: '.swiper-pagination', clickable: true }`
- **Navigation buttons** (R37): custom `.swiper-btn-prev` / `.swiper-btn-next` divs — `40×40px` circles, `bg-[var(--color-surface-2)]`, chevron SVG icon in `text-[var(--color-accent)]`
- **Pagination dots**: style via CSS — `.swiper-pagination-bullet` gets `bg-[var(--color-border)]`; `.swiper-pagination-bullet-active` gets `bg-[var(--color-accent)]`

**Patterns to follow:**
- Existing `data-animate` pattern for section entry
- Swiper's recommended initialization pattern for Astro (`<script>` block with `import`)

**Test scenarios:**
- Happy path: carousel auto-advances every 4s, pauses on hover
- Happy path: prev/next arrows navigate manually; loop wraps correctly
- Happy path: 3 slides visible on desktop; 2 on tablet; 1 on mobile
- Edge case: only 3 testimonials exist — loop with `loopedSlides` may need config; ensure no blank slides
- Integration: Swiper initializes after DOM is ready (in `<script>` block, not frontmatter)

**Verification:**
- Swiper carousel renders and auto-advances in browser
- Navigation arrows and pagination dots are visible and functional
- Cards show star rating, quote, and author with initials avatar

---

- [ ] **Unit 10: CTABand dark section with radial blob**

**Goal:** Replace the existing `SectionCTA`-based CTABand with a standalone dark section featuring gradient text and a radial blob background.

**Requirements:** R38–R39

**Dependencies:** Unit 1, Unit 3 (gradient Button variant)

**Files:**
- Modify: `src/components/sections/home/CTABand.astro`

**Approach:**
- Rewrite `CTABand.astro` as a standalone component — remove the `import SectionCTA` and render directly
- Background: `bg-[var(--color-bg)]` section with `position: relative overflow-hidden`; add an absolutely-positioned `div.cta-blob` with `background: radial-gradient(ellipse 60% 80% at 80% 50%, rgba(79,110,247,0.08), transparent)` (R39)
- Headline: large `font-[var(--font-heading)]` text; wrap one phrase in a `<span>` with `background: linear-gradient(135deg, #4F6EF7, #7C3AED); -webkit-background-clip: text; -webkit-text-fill-color: transparent` for gradient text highlight effect
- CTA: single `<Button variant="gradient">Let's Talk</Button>` linking to `/contact`
- Section layout: centered or left-aligned per implementer judgment — centered works well for a standalone CTA band

**Patterns to follow:**
- `src/components/ui/Button.astro` gradient variant (Unit 3)

**Test scenarios:**
- Happy path: section renders on dark bg with blue gradient text highlight visible
- Happy path: CTA button shows gradient and links to /contact

**Verification:**
- No light-colored background on CTABand
- Radial blob is subtle, not overwhelming the text

---

### Phase 5 — About Page

- [ ] **Unit 11: About page sections restyle (AboutHero, ValuesSection, TeamGrid)**

**Goal:** Dark-restyle About page sections; add "Who We Are" two-column section; update PageHero for inner-page dark treatment.

**Requirements:** R40–R43

**Dependencies:** Unit 1

**Files:**
- Modify: `src/components/ui/PageHero.astro`
- Modify: `src/components/sections/about/ValuesSection.astro`
- Modify: `src/components/sections/about/TeamGrid.astro`
- Modify: `src/components/sections/about/AboutHero.astro`

**Approach:**
- **PageHero.astro** (R40, R45, R49 — shared across About, Services, Contact): add `bg-[var(--color-surface)]` or `bg-[var(--color-bg)]` background class; optionally add `data-splitting` to the `<h1>` for char animation on inner pages. If char animation is added, a `<script>` block with `gsap.matchMedia()` is needed (reuse the Hero.astro char animation pattern but with `delay: 0` since no preloader on inner pages)
- **R41 — About "Who We Are" two-column (verify + add if missing)**: Read `src/pages/about.astro` to check if a two-column WhoWeAre-style section already exists on the About page. If it does not exist, add one either by:
  - Reusing `WhoWeAre.astro` on the About page with different copy, or
  - Creating a new inline section in the About page that mirrors the R24 layout (text left, image/visual right; below `lg`: text first, image second at `max-h-[400px]`). The About version should have agency-specific copy (team size, story, mission statement). This is distinct from `WhoWeAre.astro` on the homepage which has counters.
- **ValuesSection.astro** (R42): token swap handles backgrounds and text automatically. Update section label to R10 style. Update icon color from `text-[var(--color-accent-alt)]` → `text-[var(--color-accent)]`
- **TeamGrid.astro** (R43): token swap handles most colors. Social links: verify current visibility — if hidden behind hover, make always visible. Hover: `translateY(-4px)` only (add to card CSS or inline). Section label R10 update.
- **AboutHero.astro**: SVG decorative shapes use `var(--color-accent)` / `var(--color-accent-alt)` — auto-update. Background shapes are already abstract; verify they look intentional on dark bg. Section label R10 update.

**Patterns to follow:**
- `data-splitting` + Splitting.js pattern from `src/scripts/splitting.ts`
- Existing `gsap.matchMedia()` in `src/components/sections/home/Hero.astro`

**Test scenarios:**
- Happy path: About page loads with dark hero; sections show dark backgrounds, no light islands
- Happy path: Values cards dark surface, icon in electric blue
- Happy path: Team grid social links visible without hover

**Verification:**
- No white or off-white backgrounds on any About page section
- Team social links are always visible

---

- [ ] **Unit 12: MilestoneTimeline vertical alternating rewrite**

**Goal:** Replace horizontal desktop grid with vertical alternating left/right layout for all breakpoints.

**Requirements:** R44

**Dependencies:** Unit 1

**Files:**
- Modify: `src/components/sections/about/MilestoneTimeline.astro`

**Approach:**
- Remove the `hidden lg:grid grid-cols-4` desktop variant entirely
- Remove the `lg:hidden` mobile variant entirely
- Write a single universal layout:
  - Outer container: `relative` wrapper
  - Vertical accent line: `absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[var(--color-border)]` (desktop); on mobile, line shifts to `left-5`
  - Each milestone: `flex items-center gap-0` with `flex-row` for even indices, `flex-row-reverse` for odd indices
  - Content block (`w-1/2`): year in large muted heading, title in bold, description in muted text
  - Circle node: centered on the line — `absolute left-1/2 -translate-x-1/2` positioned circle with accent bg and inner dot
  - Spacer: empty `w-1/2` on the opposite side
  - Mobile (`max-lg`): single column, line anchored to left, content indented with `pl-12`
- Update brand name: "NovaMark Digital" → "Serve Motions" in `milestones` array descriptions
- Section label R10 update

**Technical design:**
- Use Astro's `.map((m, i) => ...)` with `i % 2 === 0` condition to switch `flex-row` / `flex-row-reverse`
- The vertical line is a single absolute element spanning the full container height — do not use per-item line segments
- Circle nodes: `z-10` to appear above the line

**Patterns to follow:**
- Existing mobile vertical layout in `MilestoneTimeline.astro` as the basis for the universal pattern

**Test scenarios:**
- Happy path: 4 milestone items display alternating left/right on desktop
- Happy path: mobile shows single column with line anchored left
- Edge case: verify `data-animate` GSAP stagger still works with the new markup structure

**Verification:**
- Desktop: items alternate sides with accent circles on the vertical center line
- Mobile: single column with visible left-anchored line

---

### Phase 6 — Services Page

- [ ] **Unit 13: ServiceBlock dark panel restyle + services.ts data**

**Goal:** Eliminate all hardcoded light colors from the 6 service illustration panels.

**Requirements:** R46

**Dependencies:** Unit 1

**Files:**
- Modify: `src/components/sections/services/ServiceBlock.astro`
- Modify: `src/data/services.ts`

**Approach:**
- **`services.ts`**: replace all 6 `bgGradient` values (currently Tailwind class strings like `'from-emerald-50 to-teal-50'`) with inline CSS `linear-gradient()` strings using very-low-opacity tinted backgrounds:
  - seo: `'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(13,148,136,0.03) 100%)'`
  - social: `'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(109,40,217,0.04) 100%)'`
  - paid: `'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(217,119,6,0.04) 100%)'`
  - brand: `'linear-gradient(135deg, rgba(236,72,153,0.08) 0%, rgba(225,29,72,0.04) 100%)'`
  - email: `'linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(99,102,241,0.04) 100%)'`
  - web: `'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(59,130,246,0.04) 100%)'`
- **`ServiceBlock.astro` text column**: token swap handles backgrounds, text, borders. Check bullet icon `bg-[var(--color-accent)]` — auto-updates to electric blue.
- **`ServiceBlock.astro` illustration panels**: replace ALL hardcoded light classes. Strategy: adopt a uniform dark glass-morphism style across all 6 panels:
  - Panel outer wrapper: `bg-[var(--color-surface-2)] rounded-2xl border border-[var(--color-border)]`
  - Inner UI mockup elements currently using `bg-white`, `bg-sky-50`, `bg-amber-200`, etc.: replace with `bg-[var(--color-surface)]` for container elements; `bg-[rgba(255,255,255,0.04)]` for skeleton/filler elements; keep accent-colored elements (progress bars, badges) but switch their colors to the dark accent palette (e.g., `bg-[var(--color-accent)]` for success/active states instead of `bg-emerald-500`)
  - All `text-gray-400`, `text-sky-600`, `text-indigo-600` etc. → `text-[var(--color-text-muted)]` or specific accent colors from the new palette
  - `border-emerald-100`, `border-sky-100`, `divide-sky-50` → `border-[var(--color-border)]`
  - This is the highest-effort unit — expect ~150–200 line changes across the 6 panels
- **Section label**: R10 style update
- **Alternating layout** (R46 mobile): `text first, image second` for all 6 on mobile — verify ServiceBlock already handles this or add `order-first` / `order-last` per breakpoint

**Patterns to follow:**
- `bg-[var(--color-surface-2)]` for elevated card surfaces
- `rgba(255,255,255,0.04)` for barely-visible skeleton/filler elements on dark

**Test scenarios:**
- Happy path: all 6 service sections render without any white/light backgrounds
- Happy path: illustration panels look intentional (dark glass UI mockups, not broken white boxes)
- Edge case: on mobile, text column appears first for every service block regardless of alternating direction

**Verification:**
- Visual check: scroll all 6 service blocks on Services page — no visible light islands
- `bgGradient` inline styles render as very subtle colored tints, not solid pastels

---

- [ ] **Unit 14: ProcessTimeline vertical layout rewrite**

**Goal:** Convert horizontal desktop process timeline to vertical, matching the vertical mobile layout.

**Requirements:** R47

**Dependencies:** Unit 1 (`.timeline-line` axis patch already applied)

**Files:**
- Modify: `src/components/sections/services/ProcessTimeline.astro`

**Approach:**
- Same strategy as MilestoneTimeline (Unit 12): remove `hidden lg:block` horizontal variant and `lg:hidden` mobile variant; write single universal vertical layout
- **Vertical line**: absolute positioned, full container height, `bg-[var(--color-border)]`; `#timeline-progress` overlay element animates `scaleY: 0 → 1` from top to bottom (CSS `transform-origin: top` already patched in Unit 1)
- **Each step**: `flex` row — circle with number on left, content on right (no alternating since this is a sequential process, not a history; all steps read left to right)
- **Circle**: `bg-[var(--color-accent)] rounded-full` with step number in white bold
- **GSAP animation**: update the script block — change `scaleX: 1` → `scaleY: 1` to match the new axis; `scrollTrigger` trigger/start/end stays the same
- Remove `matchMedia` `min-width: 1024px` condition — vertical layout works at all widths, so animation fires universally (while still inside `prefers-reduced-motion` check)
- Section label R10 update

**Patterns to follow:**
- MilestoneTimeline mobile vertical pattern
- Existing ScrollTrigger `scaleX` pattern — just change axis

**Test scenarios:**
- Happy path: 4 process steps render vertically with accent line animating down on scroll
- Happy path: timeline line draws from top to bottom as section enters viewport
- Reduced motion: line appears fully visible immediately

**Verification:**
- No horizontal layout appears at any viewport width
- ScrollTrigger animation fires on desktop and mobile (not `min-width: 1024px` gated)

---

- [ ] **Unit 15: FAQAccordion CSS chevron + killTweensOf fix**

**Goal:** Replace JS text-swap icon with CSS-rotating SVG chevron; add tween kill guard to prevent height bugs.

**Requirements:** R48

**Dependencies:** Unit 1

**Files:**
- Modify: `src/components/sections/services/FAQAccordion.astro`

**Approach:**
- Replace `<span class="faq-icon ...">+</span>` with `<svg class="faq-icon w-5 h-5 text-[var(--color-accent)] transition-transform duration-300" ...>` containing a simple chevron path (two lines forming a `>` shape). Add `rotate-45` Tailwind utility on open state instead of JS text mutation
- In `open()` function: remove `icon.textContent = '×'`; add `icon.classList.add('rotate-45')`
- In `close()` function: remove `icon.textContent = '+'`; add `icon.classList.remove('rotate-45')`
- Add `gsap.killTweensOf(otherContent)` immediately before each `gsap.to(otherContent, { height: 0 })` call in the "close others" loop
- Keep all other logic unchanged (ARIA, keyboard handling, `isOpen` state)
- Section label R10 update

**Patterns to follow:**
- Existing `transition-transform duration-300` pattern in `global.css` and inline styles
- `gsap.killTweensOf()` GSAP API

**Test scenarios:**
- Happy path: clicking a FAQ item opens it with smooth height animation; chevron rotates 45°
- Happy path: clicking another item closes the first (chevron un-rotates) then opens the second
- Error path: rapidly clicking multiple items should not produce incorrect heights — `killTweensOf` prevents mid-tween scrollHeight miscalculation
- Edge case: keyboard Enter/Space still triggers correctly after icon change

**Verification:**
- No `+` or `×` text characters in the FAQ icon
- Rapidly opening/closing multiple items does not produce stuck open states

---

### Phase 7 — Contact Page & 404

- [ ] **Unit 16: ContactForm dark inputs + error/success states**

**Goal:** Dark-restyle form inputs with autofill override; add error and success states.

**Requirements:** R50–R51

**Dependencies:** Unit 1

**Files:**
- Modify: `src/components/sections/contact/ContactForm.astro`
- Modify: `src/components/sections/contact/ContactInfo.astro` (if needed)

**Approach:**
- Token swap handles most of `ContactInfo.astro` automatically
- **Form inputs**: apply `bg-[var(--color-surface-2)]` background; default border `border border-[rgba(255,255,255,0.08)]` (not zero — satisfies WCAG 1.4.11); focus `focus:border-[var(--color-accent)] focus:outline-none focus:ring-0`; add `box-shadow: inset 0 0 0 1000px var(--color-surface-2)` via `autofill:shadow-[inset_0_0_0_1000px_#1C1C1C]` Tailwind arbitrary value or inline style to prevent browser autofill overriding the dark background
- Fix `placeholder:text-[var(--color-border)]` → `placeholder:text-[var(--color-text-muted)]` (current will be invisible since `--color-border` becomes `rgba(255,255,255,0.08)` which is nearly transparent)
- **Error state**: on field validation failure, add `border-l-2 border-l-red-500` and display a `<p class="text-red-400 text-xs mt-1">` error message below the field
- **Success state**: on form submission success, replace form with a centered confirmation message — heading "Message sent!", description, and a "Back to Home" link. This is purely visual HTML replacement in the JS submit handler.
- **R50 — Contact two-column layout**: Read `src/pages/contact.astro` and `src/components/sections/contact/ContactForm.astro` + `ContactInfo.astro` to verify if they are already in a two-column layout. If the contact page currently renders form and contact info stacked (single column), restructure to `lg:grid-cols-2` — ContactForm on the left, ContactInfo on the right. This may be a page-level change rather than a component change.
- **ContactInfo.astro**: section label R10 update; social links are always visible (if any hover-reveal exists, remove it)
- **PageHero** for contact page: handled in Unit 11

**Patterns to follow:**
- Netlify form submission pattern already in ContactForm (`data-netlify="true"`)
- Tailwind arbitrary value syntax for box-shadow autofill override

**Test scenarios:**
- Happy path: form renders with dark input backgrounds, visible placeholder text
- Edge case: browser autofill (e.g., email field) does not override dark bg with light browser autofill yellow/white
- Error path: submitting empty required fields shows red-tinted border + error message
- Happy path: successful submission shows confirmation message replacing the form

**Verification:**
- Input fields visible on dark background with subtle border
- Placeholder text readable (not near-invisible)
- Autofill does not produce a jarring white background on dark form

---

- [ ] **Unit 17: 404 page dark restyle**

**Goal:** Redesign 404 page with large gradient number, short message, and home CTA.

**Requirements:** R52

**Dependencies:** Unit 1, Unit 3 (gradient Button)

**Files:**
- Modify: `src/pages/404.astro`

**Approach:**
- Set section background to `bg-[var(--color-bg)]` (full-viewport dark)
- Large "404" number: `font-[var(--font-heading)] text-[clamp(8rem,20vw,18rem)] font-extrabold leading-none select-none` with gradient text: `background: linear-gradient(135deg, #4F6EF7, #7C3AED); -webkit-background-clip: text; -webkit-text-fill-color: transparent`
- Short message: "You've wandered off the map." or equivalent, in `text-[var(--color-text-muted)]`
- Home CTA: `<Button href="/" variant="gradient">Back to Home</Button>`
- Layout: centered vertically and horizontally, full viewport height

**Patterns to follow:**
- Gradient text technique used in CTABand (Unit 10)
- `src/components/ui/Button.astro` gradient variant

**Test scenarios:**
- Happy path: 404 page renders with large gradient number and CTA button visible on dark bg
- Happy path: CTA navigates to home page

**Verification:**
- 404 number is prominent, gradient, and readable
- No light backgrounds on this page

---

## System-Wide Impact

- **Interaction graph:** Token change in `global.css` propagates to every component simultaneously — all `var(--color-*)` references update on the first build after the token swap. This is the highest-leverage single change.
- **Lenis + ScrollTrigger pin:** R34 (pinned work card stack) is intentionally deferred. Do not add `pin: true` to any ScrollTrigger during this implementation — Lenis + GSAP pin have a known interaction issue documented in scope boundaries.
- **`data-animate` children count:** `initScrollAnimations()` animates _direct children_ of `[data-animate]` sections. Any restructuring of section markup (WhoWeAre, MilestoneTimeline, ProcessTimeline) must preserve the direct-children relationship or the stagger animation will miss elements. Wrap new inner content in a single intermediate div if needed.
- **Error propagation:** All animation scripts are wrapped in `gsap.matchMedia()` — this gracefully handles reduced-motion. Swiper initialization should also respect reduced-motion: disable `autoplay` if `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
- **State lifecycle risks:** Swiper's `loop: true` creates duplicate slides in the DOM. CSS targeting (e.g., `.swiper-slide-active`) must be used rather than DOM index to avoid selecting duplicates.
- **API surface parity:** `Button.astro` adding a `gradient` variant is additive — existing `primary` and `outline` usages are unaffected.
- **Unchanged invariants:** `Footer.astro` is already dark-native (hardcoded dark bg, white text) — no changes needed. `src/scripts/lenis.ts` is unchanged. `src/data/work.ts` gradient values are already dark.
- **Integration coverage:** Swiper initialization timing in Astro: `<script>` blocks in Astro components run client-side after DOM is ready — Swiper should initialize correctly without `document.addEventListener('DOMContentLoaded')`. However, if Swiper initializes before the component's DOM is mounted (unlikely in Astro SSG), add a DOMContentLoaded guard.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Swiper version mismatch — CSS import paths vary between v9, v10, v11 | After `npm install swiper`, check `node_modules/swiper/package.json` for version; verify correct CSS import paths against installed version's exports |
| MilestoneTimeline / ProcessTimeline rewrite breaks `data-animate` stagger | After rewrite, test that `initScrollAnimations()` stagger fires on section entry; ensure section element has `data-animate` and new children are direct children |
| ServiceBlock panel restyle — many LOC, risk of missed light classes | After dark restyle, run visual check by scrolling through all 6 panels on the Services page; use browser DevTools colour picker to flag any non-dark backgrounds |
| Swiper `loop: true` with only 3 slides — may need `loopedSlides: 3` or `watchSlidesProgress: true` | Test carousel loop wrap with 3 slides; if blank slides appear, add Swiper `loopedSlides` or switch to `loop: false` |
| Hero orb parallax repaints on low-end devices | `will-change: transform` prevents repaint; if jank still occurs on mobile, disable the ScrollTrigger parallax for the orb on touch devices using `gsap.matchMedia()` |
| CSS gradient text (`-webkit-text-fill-color: transparent`) not supported in all contexts | Wrap gradient text in a `<span>` and test in Firefox; provide a fallback `color: var(--color-accent)` if `-webkit-text-fill-color` fails |
| Button.astro `...rest` props — verify `data-magnetic` passes through | Check `Button.astro` for `{...rest}` spread before deploying; if absent, add it |

## Documentation / Operational Notes

- Run `npm install swiper` before implementing Unit 9
- Run `npm run dev` and test all 4 pages + 404 visually after Unit 1 (token swap) to establish a dark baseline before subsequent units
- After all units complete, run `npm run build` to confirm no TypeScript or Astro build errors
- The `src/env.d.ts` created in Unit 2 will suppress implicit-any warnings from `import Splitting from 'splitting'`

## Sources & References

- **Origin document:** [docs/brainstorms/2026-05-19-serve-motions-redesign-requirements.md](docs/brainstorms/2026-05-19-serve-motions-redesign-requirements.md)
- Color system: `src/styles/global.css` `@theme` block
- Animation patterns: `src/scripts/animation.ts`, `src/scripts/splitting.ts`
- Header patterns: `src/components/layout/Header.astro`
- ServiceBlock light-color inventory: `src/components/sections/services/ServiceBlock.astro`, `src/data/services.ts`
- Swiper docs: https://swiperjs.com/swiper-api
