// Validates tokens.json against the Design System page's grammar (values the page
// would silently drop) and checks text/ground contrast in every theme.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const NAME = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,63}$/;
const HEX = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const COLOR_FN = /^(rgba?|hsla?|oklch|oklab|lab|lch|color)\(([a-z0-9.\s,%/+-]*)\)$/i;
const ALIAS = /^\{([^{}]+)\}$/;
const LENGTH = /^-?\d*\.?\d+(px|rem|em|%)?$/;
const PLAIN = /^[A-Za-z0-9 #%(),./+_-]{1,200}$/;
const CAPS = { color: 600, other: 60, styles: 80, themes: 8, families: 12 };

const isList = (family) => family && Array.isArray(family.tokens);
const values = (value) => (typeof value === 'string' || typeof value === 'number' ? [value] : Object.values(value ?? {}));

export function validateTokens(tokens) {
  const problems = [];
  const seen = new Map();
  const colorNames = new Set((tokens.color?.tokens ?? []).map((t) => t.name));

  for (const [family, body] of Object.entries(tokens)) {
    if (['name', 'version', 'meta', 'type'].includes(family)) continue;
    if (!isList(body)) {
      problems.push(`${family}: must be a list {"tokens":[{name,value,usage}]}, not a name-to-value map`);
      continue;
    }
    if (body.tokens.length > (family === 'color' ? CAPS.color : CAPS.other)) problems.push(`${family}: too many tokens`);
    for (const t of body.tokens) {
      const where = `${family}.${t.name}`;
      if (!NAME.test(t.name ?? '')) problems.push(`${where}: invalid name`);
      if (seen.has(t.name)) problems.push(`${where}: duplicate name ${t.name} (also in ${seen.get(t.name)})`);
      seen.set(t.name, family);
      if (!t.usage || !String(t.usage).trim()) problems.push(`${where}: missing usage note`);
      const vals = values(t.value);
      if (!vals.length) problems.push(`${where}: no value`);
      for (const v of vals) {
        if (family === 'color') {
          const a = ALIAS.exec(String(v));
          if (a) {
            if (a[1] === t.name || !colorNames.has(a[1])) problems.push(`${where}: alias of a missing token or of itself (${v})`);
          } else if (!HEX.test(v) && !COLOR_FN.test(v)) problems.push(`${where}: colour value the page drops (${v})`);
        } else if (family === 'shadow') {
          if (/var\(|url\(/.test(v) || String(v).length > 400) problems.push(`${where}: invalid shadow (${v})`);
        } else if (family === 'spacing' || family === 'radius') {
          if (typeof v !== 'number' && !LENGTH.test(v)) problems.push(`${where}: invalid length (${v})`);
        } else if (!PLAIN.test(String(v)) || /var\(|url\(/.test(String(v))) {
          problems.push(`${where}: invalid value (${v})`);
        }
      }
    }
  }

  const themes = tokens.color?.themes ?? [];
  if (!themes.length) problems.push('color.themes: at least one theme is required');
  if (themes.length > CAPS.themes) problems.push('color.themes: too many themes');

  const type = tokens.type ?? {};
  for (const [key, stack] of Object.entries(type.families ?? {})) {
    if (!NAME.test(key) || String(stack).length > 200 || /[;{}<>\\()]/.test(stack)) problems.push(`type.families.${key}: invalid font stack`);
  }
  const styleNames = new Set();
  let styles = 0;
  for (const group of type.groups ?? []) {
    for (const s of group.styles ?? []) {
      styles += 1;
      const where = `type.${group.name}.${s.name}`;
      if (!NAME.test(s.name ?? '')) problems.push(`${where}: invalid name`);
      if (styleNames.has(s.name)) problems.push(`${where}: duplicate name ${s.name}`);
      styleNames.add(s.name);
      if (typeof s.fontSize !== 'number' && !LENGTH.test(s.fontSize ?? '')) problems.push(`${where}: invalid fontSize`);
      const family = s.family ?? group.family;
      if (family && !(family in (type.families ?? {}))) problems.push(`${where}: unknown family ${family}`);
    }
  }
  if (styles > CAPS.styles) problems.push('type: too many styles');
  return problems;
}

/** Parses a hex or rgb()/rgba() colour into [r, g, b, alpha] with channels 0-255. */
export function parseColor(value) {
  const v = String(value).trim().toLowerCase();
  if (HEX.test(v)) {
    let h = v.slice(1);
    if (h.length <= 4) h = [...h].map((c) => c + c).join('');
    const n = (i) => parseInt(h.slice(i, i + 2), 16);
    return [n(0), n(2), n(4), h.length === 8 ? n(6) / 255 : 1];
  }
  const m = /^rgba?\(([^)]*)\)$/.exec(v);
  if (!m) throw new Error(`cannot compute contrast for ${value}`);
  const parts = m[1].split(/[\s,/]+/).filter(Boolean);
  const channel = (p) => (p.endsWith('%') ? (parseFloat(p) / 100) * 255 : parseFloat(p));
  const alpha = parts[3] === undefined ? 1 : parts[3].endsWith('%') ? parseFloat(parts[3]) / 100 : parseFloat(parts[3]);
  return [channel(parts[0]), channel(parts[1]), channel(parts[2]), alpha];
}

const blend = (top, under) => {
  const a = top[3];
  return [0, 1, 2].map((i) => top[i] * a + under[i] * (1 - a)).concat(1);
};

const luminance = ([r, g, b]) => {
  const lin = (c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

/** WCAG 2 contrast ratio. A translucent ground is blended over `over`, translucent text over the ground. */
export function contrast(fg, bg, over = '#ffffff') {
  const ground = blend(parseColor(bg), blend(parseColor(over), [255, 255, 255, 1]));
  const ink = blend(parseColor(fg), ground);
  const [hi, lo] = [luminance(ink), luminance(ground)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}

function resolve(tokens, name, theme, depth = 0) {
  const token = tokens.color.tokens.find((t) => t.name === name);
  if (!token) throw new Error(`unknown colour token ${name}`);
  const first = tokens.color.themes[0].id;
  const raw = typeof token.value === 'string' ? token.value : (token.value[theme] ?? token.value[first]);
  const a = ALIAS.exec(raw);
  if (a && depth < 16) return resolve(tokens, a[1], theme, depth + 1);
  return raw;
}

/** Returns the pairs that miss their minimum ratio, in any theme. */
export function checkPairs(tokens, pairs) {
  const failures = [];
  for (const theme of tokens.color.themes) {
    for (const pair of pairs) {
      const fg = resolve(tokens, pair.fg, theme.id);
      const bg = resolve(tokens, pair.bg, theme.id);
      const over = pair.over ? resolve(tokens, pair.over, theme.id) : undefined;
      const ratio = contrast(fg, bg, over);
      if (ratio < pair.min) failures.push({ ...pair, theme: theme.id, ratio: Math.round(ratio * 100) / 100 });
    }
  }
  return failures;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const tokens = JSON.parse(fs.readFileSync('design-system/project/tokens.json', 'utf8'));
  const pairs = JSON.parse(fs.readFileSync('design-system/contrast-pairs.json', 'utf8'));
  const problems = validateTokens(tokens);
  const failures = checkPairs(tokens, pairs);
  for (const p of problems) console.log(`token: ${p}`);
  for (const f of failures) console.log(`contrast: ${f.fg} on ${f.bg}${f.over ? ` over ${f.over}` : ''} [${f.theme}] ${f.ratio} < ${f.min}`);
  console.log(`${problems.length} token problem(s), ${failures.length} contrast failure(s) in ${pairs.length} pairs`);
  process.exit(problems.length || failures.length ? 1 : 0);
}
