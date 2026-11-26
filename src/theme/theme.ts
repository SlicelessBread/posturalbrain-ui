import { THEME_COLORS } from './colors.generated';

/** What the person picked. `auto` follows the device. */
export type ThemeChoice = 'auto' | 'light' | 'dark';
export type Theme = 'light' | 'dark';

/** localStorage key that remembers the choice on this device. */
export const THEME_STORAGE_KEY = 'pb-theme';
const LIGHT_QUERY = '(prefers-color-scheme: light)';

/** Reads a stored choice; anything unknown counts as `auto`. */
export function parseChoice(raw: unknown): ThemeChoice {
  return raw === 'light' || raw === 'dark' ? raw : 'auto';
}

/** The theme a choice leads to. Without a light preference from the device, dark (the first theme). */
export function resolveTheme(choice: ThemeChoice, systemPrefersLight: boolean): Theme {
  if (choice !== 'auto') return choice;
  return systemPrefersLight ? 'light' : 'dark';
}

/** Browser only: puts a choice on <html> (data-theme, data-theme-choice, color-scheme) and on the theme-color meta. */
export function applyThemeChoice(choice: ThemeChoice): Theme {
  const root = document.documentElement;
  const theme = resolveTheme(choice, window.matchMedia(LIGHT_QUERY).matches);
  root.dataset.themeChoice = choice;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
  }
  meta.content = THEME_COLORS[theme];
  return theme;
}

/**
 * Source of the script that applies the theme before the first paint and keeps following the device
 * while the choice is `auto`. Self-contained: it runs before any bundle. It does what applyThemeChoice
 * does, and holds only constants generated from tokens.json.
 */
export function themeScript(): string {
  return `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)},c=${JSON.stringify(THEME_COLORS)},q=window.matchMedia(${JSON.stringify(LIGHT_QUERY)}),d=document.documentElement;` +
    `function a(s){var t=s==="light"||s==="dark"?s:(q.matches?"light":"dark");d.dataset.themeChoice=s;d.dataset.theme=t;d.style.colorScheme=t;` +
    `var m=document.querySelector('meta[name="theme-color"]');if(!m){m=document.createElement("meta");m.name="theme-color";document.head.appendChild(m)}m.content=c[t]}` +
    `var s=null;try{s=window.localStorage.getItem(k)}catch(e){}a(s==="light"||s==="dark"?s:"auto");` +
    `q.addEventListener("change",function(){if(d.dataset.themeChoice==="auto")a("auto")})}catch(e){}})();`;
}
