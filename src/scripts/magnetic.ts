import { gsap } from 'gsap';

export function initMagnetic(): void {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const moveX = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const moveY = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
    const strength = 0.4;

    el.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      moveX((e.clientX - cx) * strength);
      moveY((e.clientY - cy) * strength);
    });

    el.addEventListener('mouseleave', () => {
      moveX(0);
      moveY(0);
    });
  });
}
