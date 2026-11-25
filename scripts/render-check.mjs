// Opens every component preview in Chromium the way the Design System page frames it
// (tokens.css + bundle.css preloaded, data-theme on <html>) and reports what a person
// would notice: errors, sideways scrolling, blank cards, small tap targets, no focus ring.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { compileTokensCss } from './tokens-css.mjs';

const require = createRequire(import.meta.url);
const FONT_HOSTS = /^https:\/\/fonts\.(googleapis|gstatic)\.com\//;

const inspect = () => {
  const errors = [];
  const doc = document.documentElement;
  if (doc.scrollWidth > window.innerWidth + 1) errors.push(`page scrolls sideways (${doc.scrollWidth}px > ${window.innerWidth}px)`);
  if (document.body.getBoundingClientRect().height < 24) errors.push('preview is blank');
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
  };
  for (const el of document.querySelectorAll('button, a[href], input, select, textarea, [role="switch"], [role="tab"]')) {
    if (!visible(el)) continue;
    const target = el.closest('[data-pb-compact]') ? (el.closest('label, [data-pb-target]') ?? el) : el;
    const r = target.getBoundingClientRect();
    if (Math.min(r.width, r.height) < 43.5) {
      errors.push(`tap target ${Math.round(r.width)}x${Math.round(r.height)}: ${(el.className || el.tagName).toString().slice(0, 40)}`);
    }
  }
  return errors;
};

const focusRing = () => {
  const el = document.activeElement;
  if (!el || el === document.body) return null;
  const s = getComputedStyle(el);
  const ring = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== 'none';
  return ring ? null : `no visible focus ring on ${(el.className || el.tagName).toString().slice(0, 40)}`;
};

export async function renderCheck({ projectDir, widths = [390, 320], only, outDir = '.render' }) {
  const { chromium } = require('playwright');
  const tokens = JSON.parse(fs.readFileSync(path.join(projectDir, 'tokens.json'), 'utf8'));
  const css = compileTokensCss(tokens, tokens.name) + fs.readFileSync(path.join(projectDir, 'components/bundle.css'), 'utf8');
  const componentsDir = path.join(projectDir, 'components');
  const components = fs.readdirSync(componentsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(componentsDir, d.name, 'preview.html')))
    .map((d) => d.name)
    .filter((name) => !only || only.includes(name));
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const results = [];
  try {
    for (const component of components) {
      const raw = fs.readFileSync(path.join(componentsDir, component, 'preview.html'), 'utf8');
      // The cover is laid out at 960px and scaled by the page; everything else is checked at phone widths.
      const sizes = component === 'Cover' ? [960] : widths;
      for (const theme of tokens.color.themes.map((t) => t.id)) {
        for (const width of sizes) {
          const errors = [];
          const page = await browser.newPage({ viewport: { width, height: 800 } });
          page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text().slice(0, 120)}`); });
          page.on('pageerror', (e) => errors.push(`script: ${String(e).slice(0, 120)}`));
          await page.route('**/*', (route) => {
            const url = route.request().url();
            if (url.startsWith('http') && !FONT_HOSTS.test(url)) errors.push(`external request: ${url.slice(0, 80)}`);
            return url.startsWith('http') ? route.abort() : route.continue();
          });
          const html = raw
            .replace('<html lang="it">', `<html lang="it" data-theme="${theme}">`)
            .replace('<head>', `<head><style>${css}</style>`);
          await page.setContent(html, { waitUntil: 'load' });
          errors.push(...(await page.evaluate(inspect)));
          const screenshot = path.join(outDir, `${component}-${theme}-${width}.png`);
          await page.screenshot({ path: screenshot, fullPage: true });
          await page.keyboard.press('Tab');
          const ring = await page.evaluate(focusRing);
          if (ring) errors.push(ring);
          await page.close();
          results.push({ component, theme, width, errors: errors.filter((e) => !/^console: Failed to load resource/.test(e)), screenshot });
        }
      }
    }
  } finally {
    await browser.close();
  }
  return results;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const only = process.argv.slice(2);
  const results = await renderCheck({ projectDir: 'design-system/project', only: only.length ? only : undefined });
  const failed = results.filter((r) => r.errors.length);
  for (const r of failed) console.log(`${r.component} [${r.theme} ${r.width}px]: ${r.errors.join('; ')}`);
  console.log(`${results.length} render(s), ${failed.length} with problems`);
  process.exit(failed.length ? 1 : 0);
}
