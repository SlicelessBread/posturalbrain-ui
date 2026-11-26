import { ThemeSwitch } from '../src';

export const card = { group: 'Accesso', height: 160, subtitle: 'Automatico, chiaro, scuro: tocca per provare' };

// The preview is static markup: this stands in for useTheme so the card can be tried.
export const script = `
  // Demo only: applies the choice to this preview.
  const root = document.documentElement;
  const initial = root.dataset.theme;
  const buttons = document.querySelectorAll('.pb-theme-switch [data-value]');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      const choice = button.dataset.value;
      const system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      root.dataset.theme = choice === 'auto' ? (initial || system) : choice;
    });
  });
`;

export default function Example() {
  return <ThemeSwitch />;
}
