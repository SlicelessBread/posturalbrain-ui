// Compiles design-system/project/tokens.json into CSS custom properties.
// The layout follows what the Design System page compiles ("tokens.css as compiled"),
// so the page and the package read the same variables from the same source.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const THEMED = new Set(['color', 'shadow']);
const RESERVED = new Set(['name', 'version', 'meta', 'type', 'color', 'shadow', 'spacing', 'radius']);

const cssName = (name) => String(name).replace(/^(--|\.)/, '').replace(/\./g, '\\.');
const length = (v) => (typeof v === 'number' ? (v === 0 ? '0' : `${v}px`) : String(v));
const alias = (v) => (typeof v === 'string' && /^\{[^{}]+\}$/.test(v) ? `var(--${cssName(v.slice(1, -1))})` : null);

/** Value of a themed token in one theme, or undefined when that theme does not set it. */
function themedValue(token, themeId, isFirst) {
  const raw = typeof token.value === 'string' ? (isFirst || alias(token.value) ? token.value : undefined) : token.value?.[themeId];
  if (raw === undefined) return undefined;
  return alias(raw) ?? raw;
}

function block(selector, lines) {
  return lines.length ? `${selector} {\n${lines.map((l) => `  ${l}`).join('\n')}\n}\n` : '';
}

export function compileTokensCss(tokens, title) {
  const themes = tokens.color?.themes ?? [];
  const themed = [...THEMED].flatMap((family) => tokens[family]?.tokens ?? []);
  let css = `/* ${title} — generated from tokens.json */\n`;

  themes.forEach((theme, i) => {
    const lines = themed
      .map((t) => [t.name, themedValue(t, theme.id, i === 0)])
      .filter(([, v]) => v !== undefined)
      .map(([name, v]) => `--${cssName(name)}: ${v};`);
    css += block(i === 0 ? `:root, [data-theme="${theme.id}"]` : `[data-theme="${theme.id}"]`, lines);
  });

  const plain = [];
  for (const family of ['spacing', 'radius']) {
    for (const t of tokens[family]?.tokens ?? []) plain.push(`--${cssName(t.name)}: ${length(t.value)};`);
  }
  for (const [family, body] of Object.entries(tokens)) {
    if (RESERVED.has(family) || !Array.isArray(body?.tokens)) continue;
    for (const t of body.tokens) plain.push(`--${cssName(t.name)}: ${t.value};`);
  }
  for (const [key, stack] of Object.entries(tokens.type?.families ?? {})) {
    plain.push(`--font-${key.toLowerCase()}: ${stack};`);
  }
  css += `\n${block(':root', plain)}`;

  for (const group of tokens.type?.groups ?? []) {
    for (const s of group.styles ?? []) {
      const family = (s.family ?? group.family ?? '').toLowerCase();
      const lines = [];
      if (family) lines.push(`font-family: var(--font-${family});`);
      lines.push(`font-size: ${length(s.fontSize)};`);
      if (s.lineHeight !== undefined) lines.push(`line-height: ${typeof s.lineHeight === 'number' && s.lineHeight < 10 ? s.lineHeight : length(s.lineHeight)};`);
      if (s.fontWeight !== undefined) lines.push(`font-weight: ${s.fontWeight};`);
      if (s.letterSpacing !== undefined) lines.push(`letter-spacing: ${length(s.letterSpacing)};`);
      if (s.fontStyle) lines.push(`font-style: ${s.fontStyle};`);
      css += block(`.${cssName(s.name)}`, lines);
    }
  }
  return css;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const file = process.argv[2] ?? 'design-system/project/tokens.json';
  const tokens = JSON.parse(fs.readFileSync(file, 'utf8'));
  process.stdout.write(compileTokensCss(tokens, tokens.name ?? 'Design system'));
}
