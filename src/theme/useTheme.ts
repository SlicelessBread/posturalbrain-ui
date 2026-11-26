'use client';

import { useSyncExternalStore } from 'react';
import { applyThemeChoice, LIGHT_QUERY, parseChoice, THEME_STORAGE_KEY, type Theme, type ThemeChoice } from './theme';

// <html> is the single source of truth at run time: ThemeScript writes it before hydration.
const getChoice = (): ThemeChoice => parseChoice(document.documentElement.dataset.themeChoice);
const getTheme = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
const serverChoice = (): ThemeChoice => 'auto';
const serverTheme = (): Theme => 'dark';

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

function onSystemChange() {
  // ThemeScript does the same; doing it here too keeps the hook right when the script is missing
  // and whichever of the two listeners the browser calls first.
  if (getChoice() === 'auto') applyThemeChoice('auto');
  notify();
}

function onStorage(event: StorageEvent) {
  // The choice was changed, or the store cleared (key null), in another tab of the same app.
  if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
  let stored: string | null = null;
  try {
    if (event.storageArea !== window.localStorage) return;
    stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return;
  }
  applyThemeChoice(parseChoice(stored));
  notify();
}

// One pair of browser listeners for all subscribers: added with the first, removed with the last.
let system: MediaQueryList | null = null;

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    system = window.matchMedia(LIGHT_QUERY);
    system.addEventListener('change', onSystemChange);
    window.addEventListener('storage', onStorage);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      system?.removeEventListener('change', onSystemChange);
      system = null;
      window.removeEventListener('storage', onStorage);
    }
  };
}

function setChoice(choice: ThemeChoice) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, choice);
  } catch {
    // Storage is blocked: the choice still holds until the page is closed.
  }
  applyThemeChoice(choice);
  notify();
}

/** The theme choice of this device, the theme it leads to, and how to change it. */
export function useTheme(): { choice: ThemeChoice; theme: Theme; setChoice: (choice: ThemeChoice) => void } {
  const choice = useSyncExternalStore(subscribe, getChoice, serverChoice);
  const theme = useSyncExternalStore(subscribe, getTheme, serverTheme);
  return { choice, theme, setChoice };
}
