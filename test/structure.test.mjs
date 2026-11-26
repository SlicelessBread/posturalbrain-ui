import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { buildPreview, loadIcon } from '../scripts/build-previews.mjs';

const PROJECT = 'design-system/project';
const COMPONENTS = path.join(PROJECT, 'components');
const SOURCES = 'design-system/previews';
const dirs = fs.readdirSync(COMPONENTS, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
const read = (...p) => fs.readFileSync(path.join(...p), 'utf8');
const bundle = read(COMPONENTS, 'bundle.css');
const MARKER = /^<!-- @dsCard( group="[^"]+")?( height=\d+)?( width=\d+)?( subtitle="[^"]*")?( page)? -->$/;
const BLUR_ALLOWED = ['.pb-topbar', '.pb-bottomnav', '.pb-sheet', '.pb-sheet-backdrop', '.pb-toast'];

test('there is at least one component', () => {
  assert.ok(dirs.length >= 1);
});

test('every component folder is an identifier with a preview and, except the cover, a guide', () => {
  for (const d of dirs) {
    assert.match(d, /^[A-Za-z][A-Za-z0-9]*$/, d);
    const files = fs.readdirSync(path.join(COMPONENTS, d)).sort();
    if (d === 'Cover') assert.deepEqual(files, ['preview.html'], 'Cover must stay bare');
    else assert.deepEqual(files, ['README.md', 'preview.html'], d);
  }
});

test('every preview starts with the card marker and uses no forbidden element', () => {
  for (const d of dirs) {
    const html = read(COMPONENTS, d, 'preview.html');
    assert.match(html.split('\n')[0], MARKER, d);
    assert.doesNotMatch(html, /<(iframe|frame|object|embed|portal|noscript)\b/i, d);
  }
});

test('every preview is generated from its source fragment and is up to date', () => {
  for (const d of dirs) {
    const source = read(SOURCES, `${d}.html`);
    assert.equal(read(COMPONENTS, d, 'preview.html'), buildPreview(source, d, loadIcon), `${d}: run npm run build:previews`);
  }
});

test('colours come only from tokens: no literal colour, no theme selector, no recent colour function', () => {
  const sources = [['bundle.css', bundle], ...dirs.map((d) => [d, read(SOURCES, `${d}.html`)])];
  for (const [name, text] of sources) {
    assert.doesNotMatch(text, /#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(|light-dark\(|color-mix\(/i, name);
    assert.doesNotMatch(text, /\[data-theme/, name);
  }
});

test('backdrop-filter is used only on bars and overlays', () => {
  for (const rule of bundle.match(/[^{}]+\{[^{}]*backdrop-filter[^{}]*\}/g) ?? []) {
    const selectors = rule.split('{')[0].replace(/\/\*[\s\S]*?\*\//g, '').split(',').map((x) => x.trim()).filter(Boolean);
    for (const selector of selectors) assert.ok(BLUR_ALLOWED.includes(selector), `blur on ${selector}`);
  }
});

test('keyboard focus is visible and reduced motion is honoured', () => {
  assert.match(bundle, /:focus-visible\s*\{[^}]*outline:[^}]*var\(--focus\)/);
  const reduced = /@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?\})\s*\}/.exec(bundle);
  assert.ok(reduced, 'missing reduced-motion block');
  assert.match(reduced[1], /animation:\s*none\s*!important/);
  assert.match(reduced[1], /transition:\s*none\s*!important/);
});

test('every pb- class and text style used in a preview is defined', () => {
  const defined = new Set([...bundle.matchAll(/\.(pb-[a-z0-9_-]+)/g)].map((m) => m[1]));
  const tokens = JSON.parse(read(PROJECT, 'tokens.json'));
  const styles = new Set(tokens.type.groups.flatMap((g) => g.styles.map((s) => s.name)));
  const missing = [];
  for (const d of dirs) {
    for (const [, list] of read(SOURCES, `${d}.html`).matchAll(/class="([^"]*)"/g)) {
      for (const c of list.split(/\s+/).filter(Boolean)) {
        if (c.startsWith('pb-') && !defined.has(c)) missing.push(`${d}: .${c}`);
        if (c.startsWith('text-') && !styles.has(c)) missing.push(`${d}: .${c}`);
      }
    }
  }
  assert.deepEqual([...new Set(missing)], []);
});

test('the brand book is usage rules: no title, and it names tokens and classes', () => {
  const readme = read(PROJECT, 'README.md');
  assert.doesNotMatch(readme.trimStart(), /^# /);
  assert.match(readme, /`--accent`/);
  assert.match(readme, /`\.?pb-btn/);
  assert.match(readme, /## Aggiunte volute/);
});

test('every icon in assets/Icone is used by a preview, and the brand assets are present', () => {
  const used = new Set(dirs.flatMap((d) => [...read(SOURCES, `${d}.html`).matchAll(/\{\{icon:([a-z0-9-]+)/g)].map((m) => m[1])));
  const icons = fs.readdirSync(path.join(PROJECT, 'assets/Icone')).filter((f) => f.endsWith('.svg')).map((f) => f.replace(/\.svg$/, ''));
  assert.deepEqual(icons.filter((i) => !used.has(i)), []);
  for (const f of ['assets/Icone/README.md', 'assets/Marchio/README.md', 'assets/Marchio/icon.svg', 'assets/Marchio/icon-512.png']) {
    assert.ok(fs.existsSync(path.join(PROJECT, f)), f);
  }
});

test('the three sample screens and the cover exist', () => {
  for (const d of ['ScreenClientManager', 'ScreenSociAll', 'ScreenVideo', 'Cover']) assert.ok(dirs.includes(d), d);
  for (const d of ['ScreenClientManager', 'ScreenSociAll', 'ScreenVideo']) assert.match(read(SOURCES, `${d}.html`).split('\n')[0], / page -->$/, d);
});

test('every component class in the stylesheet is shown in at least one preview', () => {
  const used = new Set(dirs.flatMap((d) => [...read(COMPONENTS, d, 'preview.html').matchAll(/class="([^"]*)"/g)].flatMap((m) => m[1].split(/\s+/))));
  const defined = [...new Set([...bundle.matchAll(/\.(pb-[a-z0-9_-]+)/g)].map((m) => m[1]))];
  assert.deepEqual(defined.filter((c) => !used.has(c)), []);
});

test('the public previews use invented names only', () => {
  for (const d of dirs) assert.doesNotMatch(read(SOURCES, `${d}.html`), /Rugarli/i, d);
  assert.doesNotMatch(read(PROJECT, 'tokens.json') + read(PROJECT, 'README.md'), /Rugarli/i);
});
