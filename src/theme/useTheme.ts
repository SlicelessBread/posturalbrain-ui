'use client';

import { useSyncExternalStore } from 'react';
import { applyThemeChoice, parseChoice, THEME_STORAGE_KEY, type Theme, type ThemeChoice } from './theme';

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

function onStorage(event: StorageEvent) {
  // The choice was changed in another tab of the same app.
  if (event.key !== THEME_STORAGE_KEY) return;
  applyThemeChoice(parseChoice(event.newValue));
  notify();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // ThemeScript registered its own listener first, so <html> is already updated when this one runs.
  const system = window.matchMedia('(prefers-color-scheme: light)');
  system.addEventListener('change', listener);
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    system.removeEventListener('change', listener);
    window.removeEventListener('storage', onStorage);
  };
}

// <html> is the single source of truth at run time: ThemeScript writes it before hydration.
const getSnapshot = () => `${parseChoice(document.documentElement.dataset.themeChoice)}|${document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'}`;
const getServerSnapshot = () => 'auto|dark';

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
  const [choice, theme] = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot).split('|') as [ThemeChoice, Theme];
  return { choice, theme, setChoice };
}
