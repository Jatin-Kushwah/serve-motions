---
date: 2026-05-22
topic: site-wide-visual-consistency
---

# Site-Wide Visual Consistency Overhaul

## Problem Frame

The site has six distinct inconsistency problems that make it feel unpolished and assembled from parts rather than designed as a system:

1. The homepage hero uses a full-bleed stock photo that reads as generic and doesn't animate prominently.
2. The four page-level hero sections (about, services, contact, pricing) have mismatched text alignment, heading color treatments, and background glows.
3. The pricing page hero is center-aligned while every other page is left-aligned.
4. The about page hero carries a decorative "01" number element that serves no clear purpose.
5. The homepage interior sections (WhoWeAre, FeaturedWork, CTABand) have glow circles significantly more opaque than the about page hero, making the two parts of the site feel tonally different.
6. The testimonials carousel transition is a basic slide — appropriate for a template, not a premium agency site.

All six must be fixed in a single pass to ship a site that holds up next to top-tier agency sites.

## Requirements

**Hero Section**

- R1. Replace the current full-bleed stock photo hero with an abstract, motion-driven visual background — such as an animated gradient mesh, floating geometric shapes, or a particle/noise field — consistent with the site's blue (`#4F6EF7`) → violet (`#7C3AED`) palette.
- R2. The hero animation must be clearly visible and premium-feeling on load: the abstract background should have at least one continuous ambient animation (e.g. slow drift or pulse) plus a GSAP entrance sequence for the text elements.
- R3. The floating stat pill, circular text badge, scroll indicator, and headline word-clip entrance animation in `src/components/sections/home/HeroV2.astro` must be preserved.
- R4. All hero animations must be gated behind `prefers-reduced-motion: no-preference` via `gsap.matchMedia()`.

**Page Hero Heading Style**

- R5. All page-level hero sections — `src/components/ui/PageHero.astro` (services, contact), `src/components/sections/about/AboutHero.astro`, and the pricing page inline hero in `src/pages/pricing.astro` — must use the same heading color treatment: the key accent word(s) rendered with the blue-violet gradient (`background: linear-gradient(135deg, #4F6EF7, #7C3AED); -webkit-background-clip: text; -webkit-text-fill-color: transparent`). Remove the `accent-underline` pattern from PageHero.
- R6. All four page heroes must be left-aligned. The pricing page hero currently uses `text-center` — fix it to match the left-aligned layout of every other page.
- R7. Heading font sizes must be consistent across all four pages: `text-5xl md:text-6xl lg:text-7xl` (or equivalent `clamp()`). The pricing page currently uses a smaller scale — normalize it.

**Page Hero Background**

- R8. All four page-level hero sections must share the same atmospheric glow background style as the current `AboutHero`: two radial-gradient circles (one blue, one violet) using the ring-style multi-stop `radial-gradient(circle, transparent 0%, rgba(…,0.01) 5%, … rgba(…,0.15) 30%, …)` pattern. The dot-grid overlay currently in `PageHero` may be retained.
- R9. Each page's glow circles must differ in position and/or size from the other pages so they don't look identical. Four distinct layouts are required (about, services, contact, pricing). The about page's current circle positions and sizes are the reference baseline and should not change.

**About Page Hero Cleanup**

- R10. Remove the decorative background "01" number element from `src/components/sections/about/AboutHero.astro`. No replacement needed.

**Homepage Section Circles**

- R11. Reduce the glow circle opacity values in `WhoWeAre`, `FeaturedWork`, and `CTABand` to match the subtler opacity profile of the `AboutHero` circles. The target peak opacity per channel: blue ≈ 0.15, violet ≈ 0.12. Do not change circle sizes or positions.
- R12. Confirm all three sections (`WhoWeAre`, `FeaturedWork`, `CTABand`) use `bg-[var(--color-bg)]` as their section background (same as `AboutHero`'s implicit background). Adjust any that don't.

**Testimonials Animation**

- R13. Replace the current basic Swiper slide transition with a premium 3D card transition — for example, a perspective tilt/flip or a stacked-card raise effect — so the active card change feels like an intentional, high-quality interaction rather than a template carousel. The existing per-element entrance stagger (stars → quote → footer) may be retained or improved.
- R14. The upgrade must use Swiper's `effect` API or GSAP `onSlideChange` hook, and must remain gated behind `prefers-reduced-motion`.

## Success Criteria

- A visitor landing on any page immediately reads the site as a coherent premium system, not a collection of individually-styled sections.
- The pricing and contact page heroes look visually identical in alignment and style to services and about.
- All four page heroes have visually distinct glow placement (circles not in the same position on each page).
- The homepage WhoWeAre, FeaturedWork, and CTABand sections feel tonally consistent with the about page hero in terms of background and circle intensity.
- The testimonials transition earns a "that's a nice touch" reaction, not a "standard slider" response.
- The homepage hero has a clearly visible animated background that reads as a premium abstract visual, not a stock photo.
- All animations degrade gracefully under `prefers-reduced-motion`.

## Scope Boundaries

- Copy/content changes are out of scope unless required to support a structural layout change.
- The navigation, footer, MarqueeStrip, ServicesGrid, PricingCards, ProcessTimeline, and FAQ sections are not in scope.
- No new npm dependencies without justification; GSAP and Swiper (already installed) cover the animation requirements.
- Mobile-first responsive behavior must be preserved for every change.

## Key Decisions

- **Hero direction: abstract motion visual** — Replaces the current full-bleed Unsplash stock photo with an animated abstract background (gradient mesh / floating shapes / noise field). Rationale: the photo reads as generic and doesn't differentiate the brand; an abstract visual ties directly to the blue-violet palette and allows ambient continuous animation.
- **Heading accent style: gradient, not underline** — The pricing page's gradient accent word treatment is adopted site-wide and the `accent-underline` CSS pattern in PageHero is removed.
- **Glow circles: opacity reduction, not repositioning** — For WhoWeAre, FeaturedWork, CTABand, only the opacity values change; sizes and positions stay fixed to avoid layout disruption.

## Outstanding Questions

### Deferred to Planning

- [Affects R1][Needs research] What specific abstract visual technique best fits the existing GSAP + Tailwind setup — CSS gradient mesh, SVG-based floating shapes, or canvas/WebGL particle field? Evaluate bundle cost for any new dependency.
- [Affects R13][Needs research] Which Swiper effect API option (e.g. `cards`, `creative`) or custom GSAP approach best delivers the premium 3D feel without requiring an additional Swiper plugin import?
- [Affects R5] The `accentWord` prop on `PageHero` currently drives the underline — clarify whether to change the prop to a `gradientWords` array or a simpler string replacement during planning.

## Next Steps
→ `/ce:plan` for structured implementation planning
