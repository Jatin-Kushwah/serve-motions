import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

export function initScrollAnimations(): void {
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.utils.toArray<HTMLElement>('[data-animate]').forEach((section) => {
      const children = Array.from(section.children) as HTMLElement[];
      if (children.length === 0) return;

      // immediateRender: false keeps elements visible at their CSS state
      // until the ScrollTrigger fires — prevents blank sections on load
      gsap.from(children, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.1,
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });
    });
  });
}

export function initPageOverlay(): void {
  const overlay = document.getElementById('page-overlay');
  if (!overlay) return;

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => overlay.remove(),
    });
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    overlay.remove();
  });
}

export function initCounters(): void {
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.utils.toArray<HTMLElement>('[data-counter]').forEach((el) => {
      const target = parseInt(el.dataset.target ?? '0', 10);
      const proxy = { val: 0 };

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(proxy, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(proxy.val).toString();
            },
          });
        },
      });
    });
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.utils.toArray<HTMLElement>('[data-counter]').forEach((el) => {
      el.textContent = el.dataset.target ?? '0';
    });
  });
}

export function initHeadingReveal(): void {
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.utils.toArray<HTMLElement>('[data-animate-heading]').forEach((heading) => {
      const section = heading.closest('section');
      const bodyEl = section?.querySelector('[data-animate-body]');

      // Single timeline per section: heading clip-path, then body stagger overlapping at -=0.5
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          once: true,
        },
      });

      tl.fromTo(
        heading,
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.9,
          ease: 'expo.out',
          immediateRender: false,
        }
      );

      if (bodyEl) {
        const bodyChildren = Array.from(bodyEl.children) as HTMLElement[];
        if (bodyChildren.length > 0) {
          tl.fromTo(
            bodyChildren,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              stagger: 0.07,
              immediateRender: false,
            },
            '-=0.5'
          );
        }
      }
    });
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.utils.toArray<HTMLElement>('[data-animate-heading]').forEach((el) => {
      gsap.set(el, { clipPath: 'inset(0 0 0% 0)' });
    });
    gsap.utils.toArray<HTMLElement>('[data-animate-body]').forEach((el) => {
      gsap.set(Array.from(el.children) as HTMLElement[], { opacity: 1, y: 0 });
    });
  });
}

export function initWorkCards(): void {
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const grid = document.querySelector('[data-animate-work]');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.work-card')) as HTMLElement[];
    if (cards.length === 0) return;

    // Bottom-up wipe: inset(0 0 100% 0) = bottom inset clips card from bottom
    gsap.fromTo(
      cards,
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0% 0)',
        stagger: 0.10,
        duration: 0.75,
        ease: 'expo.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          once: true,
        },
      }
    );
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    const cards = document.querySelectorAll('[data-animate-work] .work-card');
    gsap.set(Array.from(cards) as HTMLElement[], { clipPath: 'inset(0 0 0% 0)' });
  });
}

export function initServicesStagger(): void {
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const grid = document.querySelector('[data-animate-services]');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.service-card')) as HTMLElement[];
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.07,
        duration: 0.5,
        ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          once: true,
        },
      }
    );
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    const cards = document.querySelectorAll('[data-animate-services] .service-card');
    gsap.set(Array.from(cards) as HTMLElement[], { opacity: 1, y: 0 });
  });
}

export function initClipReveal(): void {
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.utils.toArray<HTMLElement>('[data-animate-clip]').forEach((el) => {
      const innerImg = el.querySelector<HTMLElement>('[data-whoweare-img]');

      // Clip-path bottom-up reveal on the container
      gsap.fromTo(
        el,
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.2,
          ease: 'expo.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Ken Burns scale-in on the inner image — runs simultaneously with clip reveal
      // Image starts at scale 1.08 (already 115% height for parallax coverage), settles to 1.0
      if (innerImg) {
        gsap.fromTo(
          innerImg,
          { scale: 1.1 },
          {
            scale: 1,
            duration: 1.6,
            ease: 'expo.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    });
  });

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.utils.toArray<HTMLElement>('[data-animate-clip]').forEach((el) => {
      gsap.set(el, { clipPath: 'inset(0 0 0% 0)' });
      const innerImg = el.querySelector<HTMLElement>('[data-whoweare-img]');
      if (innerImg) gsap.set(innerImg, { scale: 1 });
    });
  });
}

export function initWhoWeAreParallax(): void {
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const img = document.querySelector<HTMLElement>('[data-whoweare-img]');
    if (!img) return;
    const section = img.closest('section');
    if (!section) return;

    // Image drifts upward as the section scrolls through the viewport —
    // creates depth separation between the text column and the image column.
    // 115% image height provides coverage so edges are never exposed.
    gsap.fromTo(
      img,
      { y: 0 },
      {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      }
    );
  });
}

export { mm };

