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

export { mm };
