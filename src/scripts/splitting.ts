import Splitting from 'splitting';

export function initSplitting(): void {
  const targets = document.querySelectorAll<HTMLElement>('[data-splitting]');
  if (targets.length === 0) return;

  Splitting({ target: '[data-splitting]' });

  targets.forEach((el) => {
    el.classList.add('splitting');
  });
}
