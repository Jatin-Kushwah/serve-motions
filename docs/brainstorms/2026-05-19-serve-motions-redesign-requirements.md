---
date: 2026-05-19
topic: serve-motions-dark-redesign
---

# Serve Motions — Dark Premium Redesign

## Problem Frame

The current Serve Motions site (`novamark-digital`) uses a light theme (white background, teal accent) that reads as clean but unremarkable for a motion/digital agency. The goal is a full visual redesign to a dark, cinematic, premium aesthetic — inspired by the Gencyo Digital Marketing Agency template — while keeping the same 4 pages, same brand name, and the existing Astro + GSAP tech stack. The site must feel unique and professional, not a clone.

## Color System

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#0A0A0A` | Page background |
| `--color-surface` | `#141414` | Card / section surface |
| `--color-surface-2` | `#1C1C1C` | Elevated card surface (new token — must be added to `@theme`) |
| `--color-text` | `#FFFFFF` | Primary text |
| `--color-text-muted` | `#9A9A9A` | Secondary / body text |
| `--color-accent` | `#4F6EF7` | Primary accent (electric blue) |
| `--color-accent-alt` | `#7C3AED` | Secondary accent (violet) — gradient pair |
| `--color-border` | `rgba(255,255,255,0.08)` | Subtle borders |
| `--color-footer-bg` | `#050505` | Footer |

Accent gradient: `linear-gradient(135deg, #4F6EF7, #7C3AED)` — used on CTAs, highlights, and decorative elements.

---

## Requirements

**Global / System**
- R1. Replace all light-theme color tokens in `src/styles/global.css` `@theme` block with the dark palette above. Also **add** `--color-surface-2: #1C1C1C` as a new token (it does not exist in the current `@theme` block).
- R2. All pages share the dark background — no white or light-surface sections anywhere.
- R3. Section dividers use subtle `rgba(255,255,255,0.06)` borders or spacing, never white rules.
- R4. Custom cursor: dot remains. Ring default border changes from the current near-black (`rgba(11,11,26,0.35)`) to `rgba(255,255,255,0.35)` for visibility on dark bg. On hover (`[data-cursor-hover]` elements), ring border updates to `var(--color-accent)` (already in global.css `.cursor-ring.hovering`).
- R5. All images/photography: apply a dark overlay (`rgba(0,0,0,0.5)`) so text on image backgrounds is always readable. On work card hover (R33), overlay fades to ~10% opacity to reveal the full image — it does not disappear entirely.
- R6. Page load: preloader shows the centered **"Serve Motions" wordmark** in white on the dark overlay, fades out on `window.load`. Update `initPageOverlay` duration from 0.4s to 0.6s **and** update Hero.astro timeline `delay` from 0.45s to 0.7s so char animations start only after overlay fully clears.

**Typography**
- R7. Keep Syne for headings (bold, geometric — fits dark premium).
- R8. Keep Inter for body text.
- R9. Heading sizes use clamp: H1 `clamp(5.625rem, 9vw, 7.5rem)` (90–120px), H2 `clamp(3.5rem, 6vw, 4.5rem)`, H3 `clamp(2rem, 3.5vw, 2.5rem)`. Update Hero.astro's current `clamp(4rem,9vw,8rem)` to the new H1 value.
- R10. Section label style: small blue dot (`·`) + uppercase `tracking-widest` label text above H2 headings. Applies globally across all pages (homepage and all inner pages), not homepage-only.

**Navigation**
- R11. Header: transparent on load, transitions to `rgba(10,10,10,0.85)` + `backdrop-blur` when scrolled past **80px** (update Header.astro scroll listener from current `window.scrollY > 60` to `window.scrollY > 80`; also update `header.scrolled` background in global.css from the current light value to `rgba(10,10,10,0.85)`).
- R12. Nav links: white, underline-scale hover animation (existing), active state in accent blue.
- R13. CTA button: rename from "Get a Quote" to **"Let's Talk"** in both desktop nav and mobile menu. Style: accent gradient background, white text, pill shape, magnetic hover (existing `magnetic.ts`).
- R14. Mobile menu: existing full-screen overlay with GSAP link stagger is kept. The overlay background auto-updates via `var(--color-bg)` token — no structural rewrite needed. Add a reverse-stagger close animation (links fade out, then overlay fades). Font size optionally increased for cinematic feel.

**Homepage — Hero Section**
- R15. Full-viewport dark hero with large character-animated headline using **Splitting.js** (existing `src/scripts/splitting.ts` pattern — not GSAP SplitText, which is a separate plugin).
- R16. Headline style: white bold main text + one accent-colored word/phrase per line.
- R17. Decorative element: large blurred blue-violet gradient orb/blob in the background using CSS `radial-gradient` — no images or canvas needed.
- R18. Rotating circular text badge ("SERVE MOTIONS · DIGITAL AGENCY ·") around a center icon, implemented via **SVG `<textPath>`** (not a CSS `spin` on a block element — CSS spin rotates the element as a unit, it does not make text follow a circular arc). If SVG complexity is undesirable, fall back to a CSS-spinning circular block where the full text block rotates.
- R19. Dual CTA: primary (accent gradient pill) + secondary (outline pill).
- R20. Hero entrance: Splitting.js chars slide up from `y:40`, `opacity: 0 → 1`, stagger `0.04s`, `0.8s` duration. Timeline starts only after preloader overlay is gone (R6).

**Homepage — Marquee Strip**
- R21. Full-width scrolling marquee of agency keywords, styled with accent-color dot separators.
- R22. Background: `--color-surface` (`#141414`), slightly elevated from main bg.
- R23. Pauses on hover (existing behavior, keep).

**Homepage — Who We Are / About Teaser**
- R24. Two-column layout: left = large bold text + stats, right = image with rounded corners + dark overlay. Below `lg` breakpoint: columns stack — text first, then image (max-height 400px). This restructures the existing right column from stats-only to image; stats (R25) move below the copy on the left side.
- R25. Stats: 3 counters animating on scroll (existing GSAP counter logic, restyled dark).
- R26. ~~Bullet list of 4 brand values~~ — **removed**. Values are already surfaced on the About page (ValuesSection.astro). The WhoWeAre section keeps its existing content: headline + copy + 3 stat counters. No content duplication.

**Homepage — Services Grid**
- R27. 3×2 grid of service cards (6 services).
- R28. Card style: `--color-surface` background, `--color-border` border, large faded number (01–06) top-right corner in `rgba(255,255,255,0.04)`, accent-blue icon, title, 2-line description, arrow link. **Services are globally numbered 01–06** — the same number always refers to the same service across the homepage grid and the Services page.
- R29. Card hover: border color (all sides, replacing the current left-only border) shifts to `var(--color-accent)` at 40% opacity; `translateY(-4px)`; icon brightens. Note: the existing `.service-card` global.css rule uses `border-left` only — this must change to a uniform `border` on all four sides.
- R30. Cards animate in on scroll with staggered fade+slide-up (`0.1s` stagger, existing `[data-animate]` pattern).

**Homepage — Featured Work**
- R31. Section heading + "View All" link right-aligned.
- R32. 3 work cards in a row — large image (aspect-ratio 4:3), project name, category tags below.
- R33. Card hover: image scales to `1.04`, dark overlay fades to ~10% opacity revealing "View Project →" text overlay.
- R34. *(Deferred — see Outstanding Questions)* Pinned scroll stack (GSAP pin + scale) is technically unresolved and higher-scope than a restyle. For v1, restyle the existing 3-column grid dark. The pinned stack is a post-v1 enhancement.

**Homepage — Testimonials**
- R35. Testimonials section rebuilt as a **Swiper carousel** (add `swiper` as a new dependency — scope boundary exception approved). Configuration: `slidesPerView: 3` desktop / `2` tablet / `1` mobile, `loop: true`, `autoplay: { delay: 4000, pauseOnMouseEnter: true }`.
- R36. Card: star rating (5 stars in accent yellow/white), quote text, client name + title + avatar. Dark surface background, accent-left-border on active slide.
- R37. Navigation: prev/next arrow buttons (`40×40px` circles, `--color-surface-2` bg, accent-blue chevron icon). Pagination dots below in accent blue.

**Homepage — CTA Band**
- R38. Full-width dark section with large heading + accent gradient text highlight + single CTA button.
- R39. Background: radial gradient blob for depth: `radial-gradient(ellipse 60% 80% at 80% 50%, rgba(79,110,247,0.08), transparent)`. No noise texture (avoids new assets).

**About Page**
- R40. Page hero: full-width with dark team photo (or solid dark bg), headline character-animated. No breadcrumbs — breadcrumb navigation is new scope not in the original site.
- R41. "Who We Are" two-column: text left, image right — same style as homepage teaser (R24). Below `lg`: text first, image second (max-height 400px).
- R42. Values section (ValuesSection.astro): restyle dark in place — keep existing icon-based 4-column card structure (`grid-cols-4`). Change token colors only (background, text, border). Do not change to numbered 2×2 grid (same numbered pattern as services creates visual redundancy).
- R43. Team grid: member cards with photo, name, title. Social links are **always visible** (not revealed on hover) to avoid touch-device confusion. Card hover: `translateY(-4px)` lift only.
- R44. Milestone timeline (MilestoneTimeline.astro): **rewrite** (not restyle) to a vertical alternating layout. Existing component is a 4-column horizontal grid — structurally incompatible with the required alternating left/right vertical blocks. Desktop: alternating `flex-row` / `flex-row-reverse` per item with vertical accent line via absolute positioning. Mobile: single column, timeline line anchored to left edge, content indented.

**Services Page**
- R45. Page hero: same dark style as About (R40).
- R46. Service blocks (ServiceBlock.astro): restyle each of the 6 blocks for dark theme. **Critical**: each service block contains hardcoded light-background decorative panels (bg-white, bg-sky-50, bg-amber-200, bg-white/60, etc.) that are not CSS tokens — these will appear as jarring light islands on dark bg. All inlined light colors in the 6 service panels must be replaced with dark-compatible equivalents (`--color-surface-2`, dark-tinted accent colors). Desktop: alternating image left/right, numbered 01–06. Mobile: text first, image second (same order for all 6).
- R47. Process timeline (ProcessTimeline.astro): convert from current horizontal desktop layout to vertical. The existing `.timeline-line` uses `scaleX` with `transform-origin: left` — update to `scaleY` with `transform-origin: top` for vertical draw animation. Update global.css `.timeline-line` accordingly.
- R48. FAQ accordion: restyled dark. Icon changes from current `+` / `×` text-content swap to a **CSS-rotated chevron or line element** — rotate `45°` on open via CSS `transform transition` (0.3s ease), removing the JS text-content swap. Also add `gsap.killTweensOf(otherContent)` before closing other items to prevent stale `scrollHeight` mid-tween bugs.

**Contact Page**
- R49. Page hero: same dark style.
- R50. Two-column: left = contact form, right = contact info + social links.
- R51. Form inputs: `--color-surface-2` background. Default state: `1px solid rgba(255,255,255,0.08)` border (satisfies WCAG 1.4.11 non-text contrast — do **not** use zero border). Focus: accent-blue border. Use `box-shadow: inset 0 0 0 1000px var(--color-surface-2)` to override browser autofill background. Error state: red-tinted left border + error message below field. Success: confirmation message replaces form.

**404 Page**
- R52. Large "404" in accent gradient, centered, with short message and home CTA button.

---

## Animation Inventory

| Animation | Trigger | Implementation |
|---|---|---|
| Page preloader fade | Page load | `initPageOverlay` duration 0.6s (update from 0.4s); hero delay 0.7s |
| Char text reveal (hero) | Page load | GSAP + **Splitting.js** (`splitting.ts`), y:40→0, stagger 0.04s |
| Section child stagger | Scroll into view | GSAP ScrollTrigger, opacity+y, existing `[data-animate]` pattern |
| Scrolling marquee | Continuous | CSS `animation: marquee` infinite (existing) |
| Counter numbers | Scroll into view | GSAP counter (existing) |
| Card hover lift | Hover | CSS `translateY(-4px)` + border-color transition |
| Magnetic CTA button | Hover | Existing `magnetic.ts` script |
| Custom cursor | Mouse move | Existing `cursor.ts` script (update default ring color) |
| Circular badge rotation | Continuous | SVG `<textPath>` on circle, or CSS `spin 12s linear infinite` on block element |
| Parallax hero orb | Scroll | GSAP ScrollTrigger + y movement on `.hero-orb` element |
| Image scale on hover | Hover | CSS `scale(1.04)` on `img` inside work card |
| FAQ accordion | Click | GSAP height tween with `killTweensOf` guard; CSS chevron rotation |
| Header bg on scroll | Scroll | Existing handler, threshold updated 60→80px |
| Timeline line draw (Process) | Scroll | GSAP `scaleY` 0→1 (updated from current `scaleX`), `transform-origin: top` |
| Testimonial scroll-snap | Swipe/click | CSS `scroll-snap-type`, prev/next buttons |

---

## Success Criteria

- Opens to a visually striking dark hero — first impression matches premium agency quality
- Every page is cohesive in the dark palette — no visual inconsistencies or light-island artifacts
- All animations run at 60fps without jank (smooth Lenis scroll intact)
- Site looks unique — recognizably "Serve Motions", not a Gencyo clone
- Accent blue applied consistently and not overused
- Works on mobile (responsive Tailwind breakpoints intact)

## Scope Boundaries

- No new pages — same 4 pages (Home, About, Services, Contact) + 404
- No CMS, database, or backend changes
- No Three.js / WebGL
- One new npm package approved: `swiper` for testimonials carousel only
- Images: placeholder gradients / Unsplash URLs where the current site has no real photography
- Pinned work card stack (R34): deferred to post-v1

## Key Decisions

- **Dark theme over light**: Positions Serve Motions as premium/cinematic, matches the motion/digital niche
- **Electric blue (#4F6EF7) + violet (#7C3AED) accent**: Unique vs reference's orange; blue-violet gradient adds depth
- **Keep Astro + Tailwind v4 + GSAP**: No stack change — infrastructure already supports all required animations
- **No WebGL/Three.js**: CSS radial gradients + GSAP achieve visual depth without bundle cost
- **Swiper for testimonials**: Approved scope exception — adds polished carousel with autoplay and navigation
- **R34 pinned work stack deferred**: Technically uncertain (Lenis + ScrollTrigger pin interaction) and higher scope than a restyle

## Dependencies / Assumptions

- Actual installed versions (from lockfile): Astro **6.3.3**, Tailwind CSS **4.3.0**, GSAP **3.15.0**, Lenis **1.3.23**, Splitting.js **1.1.0**, Lucide icons **1.11.0**
- GSAP 3.15 includes SplitText as a bundled plugin — **do not use it**; the project uses Splitting.js exclusively
- Splitting.js 1.1.0 has no TypeScript type declarations. Add `declare module 'splitting'` to `src/env.d.ts` to suppress implicit-any warnings
- Real photography will be sourced from Unsplash (free, no attribution required for mockup)
- Font loading via `astro-google-fonts-optimizer` stays in place

## Outstanding Questions

### Resolve Before Planning
*(none — all blocking questions resolved above)*

### Deferred to Planning
- [Affects R18][Technical] SVG `<textPath>` circular text vs CSS-spin fallback — confirm which implementation to use based on visual fidelity vs complexity tradeoff
- [Affects R44][Technical] MilestoneTimeline rewrite — confirm the 4 milestone data items in the component are sufficient for the vertical alternating layout, or if more items are needed
- [Affects R17][Needs research] Hero orb — determine optimal CSS radial-gradient parameters for depth without causing repaint on scroll
- [Affects R34][Post-v1] GSAP ScrollTrigger pin + Lenis integration — resolve before implementing pinned work card stack

## Next Steps
→ `/ce:plan` for structured implementation planning
