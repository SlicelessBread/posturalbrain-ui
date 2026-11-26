import test from 'node:test';
import assert from 'node:assert/strict';
import { compileTokensCss } from '../scripts/tokens-css.mjs';

const T = {
  name: 'X',
  color: {
    themes: [{ id: 'dark', name: 'Scuro' }, { id: 'light', name: 'Chiaro' }],
    tokens: [
      { name: 'bg-0', value: { dark: '#040817', light: '#f4f7fc' }, usage: 'u' },
      { name: 'accent', value: { dark: '#6ea8ff', light: '#1f5fd6' }, usage: 'u' },
      { name: 'link', value: '{accent}', usage: 'u' },
      { name: 'only-dark', value: { dark: '#111111' }, usage: 'u' },
    ],
  },
  shadow: { tokens: [{ name: 'shadow-1', value: { dark: '0 8px 24px rgb(0 0 0 / 0.4)', light: '0 8px 24px rgb(20 40 80 / 0.12)' }, usage: 'u' }] },
  spacing: { tokens: [{ name: 'space-4', value: '16px', usage: 'u' }] },
  radius: { tokens: [{ name: 'radius-md', value: 14, usage: 'u' }] },
  blur: { tokens: [{ name: 'blur-bar', value: 'blur(22px) saturate(170%)', usage: 'u' }] },
  type: {
    fonts: [],
    families: { sans: 'system-ui, sans-serif' },
    groups: [{ name: 'Testo', family: 'sans', styles: [{ name: 'body', fontSize: '16px', lineHeight: 1.5, fontWeight: 400 }] }],
  },
};

test('layout matches the page compiler', () => {
  const css = compileTokensCss(T, 'X');
  assert.match(css, /^\/\* X — generated from tokens\.json \*\/\n/);
  assert.match(css, /:root, \[data-theme="dark"\] \{[^}]*--bg-0: #040817;[^}]*--shadow-1: 0 8px 24px rgb\(0 0 0 \/ 0\.4\);/s);
  assert.match(css, /\[data-theme="light"\] \{[^}]*--bg-0: #f4f7fc;[^}]*--link: var\(--accent\);/s);
  assert.doesNotMatch(css.split('[data-theme="light"]')[1].split('}')[0], /--only-dark/);
  assert.match(css, /\n:root \{[^}]*--space-4: 16px;[^}]*--radius-md: 14px;[^}]*--blur-bar: blur\(22px\) saturate\(170%\);[^}]*--font-sans: system-ui, sans-serif;/s);
  assert.match(css, /\.body \{[^}]*font-family: var\(--font-sans\);[^}]*font-size: 16px;[^}]*line-height: 1\.5;[^}]*font-weight: 400;/s);
});
