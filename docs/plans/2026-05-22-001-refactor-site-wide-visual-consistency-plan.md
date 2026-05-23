---
title: "refactor: Site-Wide Visual Consistency Overhaul"
type: refactor
status: completed
date: 2026-05-22
origin: docs/brainstorms/2026-05-22-site-wide-visual-consistency-requirements.md
---

# refactor: Site-Wide Visual Consistency Overhaul

## Overview

Six visual inconsistency problems make the site feel assembled from parts rather than designed as a system. This plan resolves all six in a single pass: replace the stock-photo hero with an abstract animated background, unify all page-level hero sections (heading style, alignment, glow background), reduce homepage interior section glow intensity to match the about page, and upgrade the testimonials carousel to a premium 3D effect.

## Problem Frame

See origin document for full problem frame. Summary: the site's about page hero, page hero component, homepage sections, and testimonials each evolved independently and now contradict one another in background treatment, heading color style, text alignment, and animation quality. No change to copy, navigation, footer, or sections outside the scope list.

## Requirements Trace

- R1–R4. Hero abstract animation: replace full-bleed stock photo with CSS gradient-blob abstract background + GSAP entrance. Preserve stat pill, badge, scroll indicator, word-curtain headline entrance.
- R5. Page hero heading: gradient span accent (blue→violet) replaces `accent-underline` on all four page heroes.
- R6. Pricing page hero: change from `text-center` to left-aligned.
- R7. Pricing page hero heading: normalize font size to `text-5xl md:text-6xl lg:text-7xl`.
- R8. Page hero background: all four page heroes use the multi-stop `radial-gradient(circle,…)` atmospheric glow pattern from `AboutHero`.
- R9. Each of the four page heroes has a visually distinct glow circle layout.
- R10. Remove decorative "01" number from `AboutHero`.
- R11. Reduce glow circle peak opacity in `WhoWeAre`, `FeaturedWork`, `CTABand` from 0.22–0.24 to the `AboutHero` profile (blue ≈ 0.15, violet ≈ 0.12).
- R12. Confirm all three homepage interior sections use `bg-[var(--color-bg)]`.
- R13–R14. Testimonials: upgrade Swiper from plain slide to `EffectCards` 3D stacked-card transition, gated behind `prefers-reduced-motion`.

## Scope Boundaries

- No copy changes unless required by structural layout changes.
- Navigation, footer, MarqueeStrip, ServicesGrid, PricingCards, ProcessTimeline, FAQ are out of scope.
- No new npm packages — GSAP 3.12.7 and Swiper 12.1.4 already installed; `EffectCards` is part of `swiper/modules` (no extra install).
- Mobile-first responsive behavior must be preserved for every change.

## Context & Research

### Relevant Code and Patterns

- **Animation gating**: All inline component `<script>` blocks use `const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches` boolean guard (see `Testimonials.astro`). Layout-level animations use the exported `mm` from `src/scripts/animation.ts`.
- **CSS keyframe gating**: CSS `@keyframes` used for ambient animation go in a component-scoped `<style>` block inside `@media (prefers-reduced-motion: no-preference)`. See `HeroV2.astro` badge pulse pattern.
- **GSAP entrance timeline pattern**: `gsap.timeline({ delay: N })` with `mm.add()` wrapper. Uses `expo.out` for reveals, `power2/3.out` for fades. `immediateRender: false` on scroll-triggered animations. See `animation.ts`.
- **Glow circle target opacity profile** (AboutHero, the reference): Blue circle peaks at `0.15` (30% stop), violet peaks at `0.12` (28% stop). 8-stop structure: `transparent 0%, 0.01 5%, 0.04 10%, 0.10 20%, [peak] 30%, 0.10 45%, 0.03 60%, transparent 75%`.
- **Current homepage section peak opacity**: WhoWeAre + FeaturedWork = 0.22 (11-stop); CTABand = 0.24 (11-stop). Replace the entire gradient string, not just individual stops.
- **`initHeroV2Parallax`** in `animation.ts`: safely no-ops when `[data-herov2-img]` is absent. No change needed to `animation.ts` when the photo is removed.
- **Splitting.js**: initialized globally in `BaseLayout.astro`. HeroV2's word-curtain entrance relies on `[data-splitting]` being processed before its inline GSAP script fires — this behavior is unchanged.
- **`accent-underline` CSS class** and `@keyframes underline-reveal` are defined in `src/styles/global.css` lines 291–312. Both can be deleted once the `PageHero` prop logic is updated.

### Institutional Learnings

No `docs/solutions/` exists in this repo. Learnings are derived from codebase review above.

## Key Technical Decisions

- **Abstract hero background: CSS gradient-blob approach** — Three to four absolutely-positioned `<div>` elements with `border-radius: 50%`, `filter: blur(80-100px)`, and blue/violet `rgba` background colors. CSS `@keyframes` create slow ambient drift. Zero new dependencies; integrates with the existing GSAP word-curtain entrance on top. Canvas/WebGL rejected: requires a new dependency (Three.js or tsParticles) which the scope boundary prohibits without justification.
- **Hero: remove `[data-herov2-img]` entirely** — The Ken Burns `fromTo()` call in HeroV2's inline script and the `[data-herov2-img]` `<img>` element are both removed. `initHeroV2Parallax` in `animation.ts` already guards against a missing sentinel and silently no-ops.
- **Swiper effect: `EffectCards`** — From `swiper/modules` (already in bundle). Stacked-card 3D look is the most premium option without a new dependency. Tradeoff: removes the tablet 2-column layout (`slidesPerView: 2` breakpoint is deleted). One card + depth stack is more visually compelling than two plain cards side-by-side. `cardsEffect: { perSlideOffset: 8, perSlideRotate: 2, rotate: true, slideShadows: false }` for subtle premium feel.
- **PageHero prop: `accentWord` → `gradientPhrase`** — Renamed prop, same string-replacement logic, but wraps the match in a gradient `<span>` instead of `.accent-underline`. Handles single-word ("how") and phrase ("real growth") matches.
- **AboutHero glow background: unchanged** — `AboutHero` already uses the correct multi-stop circle pattern and is the visual reference. The "01" removal (Unit 3) is the only change to that file.
- **PageHero glow circle layouts** — Four distinct placements:
  - **About** (unchanged): blue 900×900 top-right `-400px/-300px`, violet 500×500 bottom-left `-200px/-150px`
  - **Services** (new): blue 800×800 top-left `-350px/-250px`, violet 450×450 bottom-right `-150px/-80px`
  - **Contact** (new): blue 750×750 top-right `-280px/-180px` (shifted lower than about), violet 550×550 bottom-left `-100px/-120px` (slightly larger)
  - **Pricing** (new): blue 1000×1000 center-top `-450px` centered, violet 400×400 bottom-right `-120px/-60px`

## Open Questions

### Resolved During Planning

- **Which abstract visual for hero?** CSS gradient-blob divs with `filter: blur` and CSS `@keyframes` drift. No new dependency. (see Key Technical Decisions)
- **Which Swiper 3D effect?** `EffectCards` from `swiper/modules`. Already in bundle. (see Key Technical Decisions)
- **`accentWord` prop rename?** Yes, renamed to `gradientPhrase`, same replacement logic, gradient span instead of underline span. (see Key Technical Decisions)

### Deferred to Implementation

- **Exact blob sizes and positions for hero abstract background**: Implementer should tune the blob pixel dimensions and drift keyframe values visually to ensure the abstract background reads as premium at all breakpoints. The approach (blurred divs + CSS keyframes) is fixed; the specific values are visual calibration.
- **`cardsEffect` config values**: `perSlideOffset: 8, perSlideRotate: 2` are starting points. Implementer should verify the 3D depth feels premium without being overwhelming, and adjust `perSlideOffset` / `perSlideRotate` if the stacking feels too extreme or too flat.

## High-Level Technical Design

> *This illustrates the intended approach and is directional guidance for review, not implementation specification. The implementing agent should treat it as context, not code to reproduce.*

**Hero abstract background layer structure (new):**
```
<section id="hero" …>
  <!-- Abstract ambient layer -->
  <div aria-hidden="true" class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="blob blob-blue-1" />   ← large blue blob, top-right, slow drift
    <div class="blob blob-violet-1" /> ← medium violet blob, bottom-left, alt drift
    <div class="blob blob-blue-2" />   ← smaller blue blob, center-left
  </div>

  <!-- Existing elements preserved -->
  <div data-herov2-pill …>200+ Brands Scaled</div>  ← stat pill (preserved)
  <div class="max-w-7xl …">                          ← content (unchanged)
    <div class="hero-label …" />
    <div class="overflow-hidden mb-8">
      <h1 data-splitting …>We Build Brands That Move.</h1>
    </div>
    <div class="hero-sub …" />
  </div>
  <div class="… shape-rotate …">                    ← circular text badge (preserved)
  <div class="absolute bottom-12 …">Scroll</div>    ← scroll indicator (preserved)
</section>
```

**PageHero glow system (unified pattern for all 4 pages):**
- `PageHero.astro` gets two positioned `<div>` elements with the 8-stop multi-stop circle pattern, positioned differently per page via new props or via distinct CSS classes/inline styles.
- The per-page distinct positions are driven by inline style values passed from the calling page (services, contact) or hardcoded in `pricing.astro`'s inline hero section.
- The dot-grid overlay in `PageHero` is retained.

**Swiper EffectCards transition:**
```
Before: modules: [Navigation, Autoplay], effect: 'slide' (implicit), slidesPerView: 1 / 2 (breakpoint)
After:  modules: [Navigation, Autoplay, EffectCards], effect: 'cards',
        cardsEffect: { perSlideOffset: 8, perSlideRotate: 2, rotate: true, slideShadows: false },
        slidesPerView: 1  (at all breakpoints — breakpoints config removed)
```

## Implementation Units

- [x] **Unit 1: PageHero — gradient accent heading, alignment, and font-size consistency**

**Goal:** Unify heading color treatment (gradient span), fix pricing page alignment and font size, remove `accent-underline` CSS.

**Requirements:** R5, R6, R7

**Dependencies:** None

**Files:**
- Modify: `src/components/ui/PageHero.astro`
- Modify: `src/styles/global.css`
- Modify: `src/pages/pricing.astro`
- Modify: `src/pages/services.astro` (prop rename: `accentWord` → `gradientPhrase`)

**Approach:**
- In `PageHero.astro`: rename the `accentWord` prop to `gradientPhrase`. Change the string-replacement logic to wrap the matching phrase in `<span style="background: linear-gradient(135deg, #4F6EF7, #7C3AED); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">…</span>` instead of the `.accent-underline` span.
- In `global.css`: delete the `.accent-underline` rule block (lines 291–308) and the `@keyframes underline-reveal` block (lines 310–312).
- In `pricing.astro`: change the hero section's `text-center` to left-aligned (remove `text-center` from section and `mx-auto` from the `max-w-3xl` container, matching the `max-w-7xl / max-w-3xl` pattern from PageHero). Change heading size from `text-4xl md:text-5xl lg:text-6xl` to `text-5xl md:text-6xl lg:text-7xl`.
- In `services.astro`: update the `PageHero` prop call from `accentWord="how"` to `gradientPhrase="how"`.

**Patterns to follow:**
- Gradient span inline style: see `src/components/sections/home/HeroV2.astro` (`.hero-gradient-word`) and `src/components/sections/home/CTABand.astro` (`business online?` span).
- Left-aligned page hero layout: see `src/components/ui/PageHero.astro` existing `.max-w-7xl / .max-w-3xl` structure.

**Test scenarios:**
- Happy path: Services page — "how" in the heading renders in blue-violet gradient color, not underlined.
- Happy path: Contact page — heading renders fully white (no gradientPhrase prop passed), no underline.
- Happy path: Pricing page — hero section is left-aligned; heading text size matches services/contact/about at all breakpoints.
- Edge case: The `gradientPhrase` string appears only once in the headline (no double-replacement).
- Regression: `.accent-underline` class no longer exists in global.css; no visual artifact remains on services/contact pages.

**Verification:**
- All four page heroes render gradient-colored accent words with no underline hover state.
- Pricing hero heading is left-aligned and the same font scale as other pages.
- No `accent-underline` references remain in any file.

---

- [x] **Unit 2: PageHero — atmospheric glow background unification**

**Goal:** Replace the simple ellipse glows in `PageHero.astro` with the multi-stop circle pattern from `AboutHero`. Assign distinct circle positions per page (services, contact). Update the pricing page inline hero to the same pattern with a distinct layout.

**Requirements:** R8, R9

**Dependencies:** Unit 1 (both modify `PageHero.astro` — do in the same editing pass)

**Files:**
- Modify: `src/components/ui/PageHero.astro`
- Modify: `src/pages/pricing.astro`

**Approach:**
- In `PageHero.astro`: replace the two existing ellipse glow `<div>` elements with two multi-stop circle-gradient `<div>` elements using the 8-stop pattern from `AboutHero`. Accept two sets of optional props (`blueStyle` / `violetStyle` as inline style strings) so the calling page can supply per-page distinct positions. Provide default positions for services page. Keep the dot-grid overlay unchanged.
- In `services.astro`: pass `PageHero` the services-specific glow positions (blue 800×800 top-left, violet 450×450 bottom-right — see Key Technical Decisions).
- In `contact.astro`: pass `PageHero` the contact-specific glow positions (blue 750×750 top-right shifted, violet 550×550 bottom-left — see Key Technical Decisions).
- In `pricing.astro` inline hero: replace the existing simple ellipse glow `<div>` elements with multi-stop circle-gradient `<div>` elements at the pricing-specific layout (blue 1000×1000 center-top, violet 400×400 bottom-right).
- `AboutHero.astro` glow circles: **no change** — they are the reference and are already correct.

**Patterns to follow:**
- 8-stop gradient pattern: see `src/components/sections/about/AboutHero.astro` (the two glow `<div>` elements in that file).
- Prop-driven inline style: see how `src/components/sections/home/WhoWeAre.astro` uses scoped CSS classes for responsive sizing, then inline `style` for the gradient itself.

**Test scenarios:**
- Happy path: Services page glow circles are visually in upper-left (blue) and lower-right (violet) areas.
- Happy path: Contact page glow circles are in upper-right (blue) and lower-left (violet) — different from services.
- Happy path: Pricing page glow circles are visually in center-top (blue) and lower-right (violet) — different from services and contact.
- Contrast check: Each page hero background reads as atmospheric but not overpowering (peak opacity ≤ 0.15 for blue, ≤ 0.12 for violet per the 8-stop spec).
- Regression: The dot-grid overlay in PageHero is still visible on services and contact pages.

**Verification:**
- All four page heroes (about, services, contact, pricing) use the multi-stop circle pattern.
- No two pages have glow circles in the same position.
- The dot-grid overlay is retained.

---

- [x] **Unit 3: About hero — remove "01" decorative element**

**Goal:** Remove the large background "01" number from `AboutHero.astro`.

**Requirements:** R10

**Dependencies:** None

**Files:**
- Modify: `src/components/sections/about/AboutHero.astro`

**Approach:**
- Delete the `<div class="absolute right-0 top-1/2 …" aria-hidden="true">01</div>` block (lines 25–30 in the current file). No replacement, no restyling.

**Test scenarios:**
- Test expectation: none — this is a pure removal with no behavioral change. Visual verification via the browser is sufficient.

**Verification:**
- The about page hero no longer shows a large "01" on the right side at any viewport width.

---

- [x] **Unit 4: Homepage interior sections — glow opacity reduction**

**Goal:** Reduce glow circle peak opacity in `WhoWeAre`, `FeaturedWork`, and `CTABand` to match the `AboutHero` profile. Confirm background color is `--color-bg` on all three.

**Requirements:** R11, R12

**Dependencies:** None

**Files:**
- Modify: `src/components/sections/home/WhoWeAre.astro`
- Modify: `src/components/sections/home/FeaturedWork.astro`
- Modify: `src/components/sections/home/CTABand.astro`

**Approach:**
- In each file, replace the current 11-stop multi-stop gradient string for both the blue and violet circles with the shorter 8-stop pattern from `AboutHero`, using the same stop percentages but the AboutHero peak values (blue ≈ 0.15, violet ≈ 0.12). **Do not surgically reduce individual stop values** — replace the entire gradient string so the opacity curve matches, not just the peak.
- Target 8-stop pattern (blue): `radial-gradient(circle, transparent 0%, rgba(79,110,247,0.01) 5%, rgba(79,110,247,0.04) 10%, rgba(79,110,247,0.10) 20%, rgba(79,110,247,0.15) 30%, rgba(79,110,247,0.10) 45%, rgba(79,110,247,0.03) 60%, transparent 75%)`
- Target 8-stop pattern (violet): same structure, `rgba(124,58,237,…)` with peak `0.12` at the 30% stop.
- Circle `width`, `height`, and position classes/styles: **unchanged**. Only the gradient color stop values change.
- Confirm each section element uses `bg-[var(--color-bg)]`; if any uses a different surface color, correct it.

**Patterns to follow:**
- Reference gradient: `src/components/sections/about/AboutHero.astro` glow `<div>` elements.

**Test scenarios:**
- Happy path: After the change, the WhoWeAre, FeaturedWork, and CTABand sections feel tonally similar to the about page hero in terms of glow intensity.
- Regression: Circle sizes and positions on WhoWeAre, FeaturedWork, CTABand are unchanged.
- Regression: Section backgrounds remain dark (no accidental surface color change).

**Verification:**
- Visually compare the homepage interior sections against the about page hero in a browser — glow intensity should read as the same tonal register.
- No layout shifts or size changes to the glow elements.

---

- [x] **Unit 5: Homepage hero — abstract animated background**

**Goal:** Replace the full-bleed stock photo and its overlays with an abstract CSS gradient-blob animated background. Preserve all existing UI elements (stat pill, circular badge, scroll indicator, word-curtain headline entrance).

**Requirements:** R1, R2, R3, R4

**Dependencies:** None

**Files:**
- Modify: `src/components/sections/home/HeroV2.astro`

**Approach:**
- **Remove**: the full-bleed `<img data-herov2-img>` element, the multi-stop dark overlay `<div>` above it, and the bottom-fade `<div>`. Also remove the `fromTo('[data-herov2-img]', …)` Ken Burns call from the GSAP timeline in the component's `<script>` block.
- **Add**: An absolutely-positioned abstract layer `<div aria-hidden="true">` containing 3 color blobs:
  - Blue blob 1: large (e.g. 700–900px), positioned top-right, high `filter: blur(100px)`, `rgba(79,110,247,0.18–0.22)`, slow drift animation.
  - Violet blob: medium (e.g. 500–600px), positioned bottom-left, `filter: blur(80px)`, `rgba(124,58,237,0.14–0.18)`, alt drift direction.
  - Blue blob 2: smaller (e.g. 300–400px), positioned center-left or center, `filter: blur(60px)`, `rgba(79,110,247,0.10)`, third drift pattern.
- **CSS animation**: Define 2–3 `@keyframes` for the blob drift (`transform: translate(X, Y)` only — no layout-shifting properties) inside a `<style>` block scoped to the component, wrapped in `@media (prefers-reduced-motion: no-preference)`. Under reduced motion, blobs render static in their starting position.
- **Preserve unchanged**: `data-herov2-pill` stat pill, circular text badge with pulsing rings, scroll indicator, `data-splitting` heading with word-curtain GSAP entrance, `hero-label` and `hero-sub` fade animations. The existing GSAP timeline continues minus the Ken Burns call.
- **`initHeroV2Parallax`** in `animation.ts`: no change needed — the sentinel `[data-herov2-img]` is gone, the function no-ops safely.
- **Section background**: The section already uses `bg-[var(--color-bg)]`. The blobs render on top of this dark background, giving the gradient-mesh effect.

**Patterns to follow:**
- Blob approach: follows the established glow circle `<div>` pattern used in WhoWeAre, CTABand, etc. — but with heavier `filter: blur` and CSS keyframe drift.
- CSS animation gating: see HeroV2's `<style>` block `@media (prefers-reduced-motion: no-preference)` wrapping the badge pulse animation.
- GSAP timeline: see existing HeroV2 timeline structure — remove only the Ken Burns call, keep all other fromTo calls.

**Test scenarios:**
- Happy path: On load, the hero shows an abstract animated background (blobs drifting slowly) behind the "We Build Brands That Move." headline with word-curtain entrance.
- Happy path: The stat pill ("200+ Brands Scaled"), circular text badge, and scroll indicator are all present and visible.
- Edge case: Under `prefers-reduced-motion: reduce`, blobs render statically (no CSS animation fires), GSAP snap-sets `opacity: 1` on label/sub elements.
- Regression: No stock photo or dark overlay visible in the hero.
- Regression: The word-curtain entrance (`.word` elements animating `y: 110% → 0%`) still fires on load.
- Responsive: Hero layout is intact at 375px, 768px, 1280px, and 1920px — no horizontal overflow.

**Verification:**
- The hero reads as a premium abstract visual, not a stock photo.
- The abstract background has visible ambient animation under `prefers-reduced-motion: no-preference`.
- All preserved elements (pill, badge, scroll indicator, headline entrance) work correctly.

---

- [x] **Unit 6: Testimonials — Swiper EffectCards 3D transition**

**Goal:** Upgrade the testimonials carousel from the default slide effect to Swiper's `EffectCards` 3D stacked-card transition. Retain the existing GSAP per-element entrance stagger and progress bar. Gate behind `prefers-reduced-motion`.

**Requirements:** R13, R14

**Dependencies:** None

**Files:**
- Modify: `src/components/sections/home/Testimonials.astro`

**Approach:**
- **Add imports**: `import { EffectCards } from 'swiper/modules'` and `import 'swiper/css/effect-cards'` in the `<script>` block.
- **Update Swiper config**:
  - Add `EffectCards` to the `modules` array.
  - Set `effect: 'cards'`.
  - Add `cardsEffect: { perSlideOffset: 8, perSlideRotate: 2, rotate: true, slideShadows: false }`.
  - Remove the `breakpoints` config (the `slidesPerView: 2` at 768px is incompatible with EffectCards — the effect forces 1-up).
  - Adjust `speed` to `700` (slightly slower than 600 to let the 3D transform register).
- **Reduced motion**: The existing `const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches` guard is already present. Under reduced motion, Swiper `autoplay` is already disabled. Add a condition: if `prefersReduced`, set `effect: 'slide'` and omit `EffectCards` from modules, or simply skip the EffectCards import in that path. The simpler approach: always import EffectCards but in the reduced-motion branch skip the effect by checking `prefersReduced` before initializing — or configure Swiper conditionally.
- **Container sizing**: EffectCards renders cards in a stacked layout. The `.testimonials-swiper` container may need a max-height or height set for correct visual stacking. Implementer should verify the container dimensions work with the card effect.
- **Existing GSAP `animateSlideIn`**: unchanged — it fires on `slideChange` and operates on the card's child elements. Works with EffectCards.
- **Navigation buttons and progress bar**: unchanged. They remain wired to the same Swiper instance.

**Patterns to follow:**
- Current Swiper setup: `src/components/sections/home/Testimonials.astro` — extend, not replace.
- Reduced-motion boolean guard: existing `const prefersReduced = …` pattern at the top of the script.

**Test scenarios:**
- Happy path: Clicking next/previous causes the current card to animate out with 3D depth/rotation and the next card stacks in from behind.
- Happy path: Autoplay (4s) triggers the EffectCards transition smoothly.
- Happy path: The per-element GSAP stagger (stars, quote, footer) still fires after each card change.
- Edge case: Under `prefers-reduced-motion: reduce`, the transition falls back to either plain slide or no animation (confirm no 3D effect fires).
- Regression: Navigation prev/next buttons still work correctly.
- Regression: The progress bar (`t-progress-bar`) still restarts on each slide change.
- Responsive: The 1-up card layout looks intentional at mobile (375px) and at tablet (768px) — not broken/sparse.

**Verification:**
- The testimonials section transition reads as a premium 3D stacked-card effect, not a plain horizontal slide.
- All interactive controls (next, prev, autoplay, progress bar) function correctly.
- Reduced-motion users do not see the 3D effect.

## System-Wide Impact

- **Interaction graph**: Removing `[data-herov2-img]` from HeroV2 causes `initHeroV2Parallax` in `animation.ts` to silently no-op — this is safe by design (existing guard `if (!img) return`). No other exported animation function references the hero image.
- **CSS dead code**: `.accent-underline` and `@keyframes underline-reveal` are deleted from `global.css`. Verify no other component references this class before deletion.
- **Swiper container sizing**: EffectCards requires a defined height on the Swiper container for the stacking to render correctly. If the container currently auto-sizes from its content, test that the stacked cards don't overflow or collapse.
- **Unchanged invariants**: `animation.ts` exported functions (`initHeadingReveal`, `initScrollAnimations`, `initClipReveal`, `initWhoWeAreParallax`, etc.) are not modified. All `[data-animate-heading]`, `[data-animate-body]`, `[data-animate-clip]` patterns continue to work as before on all pages.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| EffectCards forces `slidesPerView: 1` — removes tablet 2-up layout | Accepted tradeoff. The stacked 3D look is more premium than 2-up plain cards. Verify mobile/tablet spacing still looks intentional after the change. |
| CSS gradient-blob blobs may be too subtle or too intense on different screens | Visual calibration deferred to implementation. Start with `filter: blur(100px)` and opacity ~0.20; adjust until premium without overwhelming. |
| Removing the Ken Burns `fromTo` call may break the GSAP timeline ordering | The `fromTo('[data-herov2-img]', …)` fires at position `0` with `immediateRender: false`. Simply deleting it from the timeline does not affect other tweens. |
| `accent-underline` CSS deletion — any other components using this class? | Only one usage: `PageHero.astro` line 11. Grep confirms no other file references `.accent-underline`. Safe to delete from `global.css`. |
| PageHero glow prop approach (passing inline style strings) adds complexity | Props are optional with sensible defaults. Calling pages (services, contact) pass per-page values. If the prop-driven approach feels over-engineered during implementation, hardcoding per-page circle styles as scoped CSS classes inside `PageHero` via a page-identifier prop is an acceptable alternative. |

## Documentation / Operational Notes

- No new build steps or environment changes.
- All changes are static HTML/CSS/JS — no server-side or API concerns.
- After implementation, visually test all four pages (home, about, services, contact, pricing) at 375px, 768px, 1280px.

## Sources & References

- **Origin document:** [docs/brainstorms/2026-05-22-site-wide-visual-consistency-requirements.md](docs/brainstorms/2026-05-22-site-wide-visual-consistency-requirements.md)
- Related code: `src/components/sections/about/AboutHero.astro` (reference glow pattern)
- Related code: `src/scripts/animation.ts` (GSAP patterns, `initHeroV2Parallax` no-op guard)
- Related code: `src/components/sections/home/Testimonials.astro` (current Swiper setup)
- Related code: `src/styles/global.css` (`.accent-underline` + `@keyframes underline-reveal` to delete)
