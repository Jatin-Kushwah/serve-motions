import { gsap } from 'gsap';

export function initCursor(): void {
  if (window.matchMedia('(hover: none)').matches) return;

  const dot = document.querySelector<HTMLElement>('.cursor-dot');
  const ring = document.querySelector<HTMLElement>('.cursor-ring');
  if (!dot || !ring) return;

  // Dot tracks instantly; ring follows with quickTo for buttery smooth motion
  const setDotX = gsap.quickSetter(dot, 'x', 'px');
  const setDotY = gsap.quickSetter(dot, 'y', 'px');
  const moveRingX = gsap.quickTo(ring, 'x', { duration: 0.3, ease: 'power3.out' });
  const moveRingY = gsap.quickTo(ring, 'y', { duration: 0.3, ease: 'power3.out' });

  document.addEventListener('mousemove', (e) => {
    setDotX(e.clientX);
    setDotY(e.clientY);
    moveRingX(e.clientX);
    moveRingY(e.clientY);
  });

  document.querySelectorAll('[data-cursor-hover]').forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
}
