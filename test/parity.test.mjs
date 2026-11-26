// Temporary, for the move from hand-written fragments to React examples: while a component has both,
// the preview built from the example must look and read exactly like the approved one built from the
// fragment. Removed, with the fragments, once every preview comes from React.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { buildFromExample, buildPreview, componentNames, fragmentPath, hasExample, loadIcon } from '../scripts/build-previews.mjs';
import { compileTokensCss } from '../scripts/tokens-css.mjs';

const { chromium } = createRequire(import.meta.url)('playwright');
const OUT = '.render/parity';

// Differences that are meant. `pixels` / `aria` say which comparison may differ; an entry that no longer
// differs fails the test, so the list stays true.
export const EXPECTED = {
  Button: { aria: true, reason: 'a loading button is now also disabled, so the keyboard cannot fire it twice' },
  ScreenVideo: { pixels: true, aria: true, reason: 'its search field is the SearchField component: see SearchField' },
  UploadZone: { aria: true, reason: 'while a file is dragged over it the zone stays the same label with its file input, so the drop target is still a control' },
  SearchField: { pixels: true, aria: true, reason: 'one markup for the empty and the filled field: the input is named by aria-label instead of a hidden label text, and the placeholder now starts where typed text starts (it sat 8px further right)' },
};

const names = componentNames().filter((name) => hasExample(name) && fs.existsSync(fragmentPath(name)));

/** Renders one preview the way render-check does and returns what a person sees and what a screen reader reads. */
async function capture(browser, html, css, theme) {
  const page = await browser.newPage({ viewport: { width: 390, height: 800 }, reducedMotion: 'reduce' });
  await page.route('**/*', (route) => (route.request().url().startsWith('http') ? route.abort() : route.continue()));
  await page.setContent(html.replace('<html lang="it">', `<html lang="it" data-theme="${theme}">`).replace('<head>', `<head><style>${css}</style>`), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const result = {
    png: await page.screenshot({ fullPage: true, animations: 'disabled' }),
    aria: await page.locator('body').ariaSnapshot(),
    dom: await page.evaluate(() => document.body.innerHTML.replace(/<script[\s\S]*?<\/script>/g, '').replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim()),
  };
  await page.close();
  return result;
}

const firstDifference = (a, b) => {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i += 1;
  return `…${a.slice(Math.max(0, i - 80), i + 120)}\n   vs\n…${b.slice(Math.max(0, i - 80), i + 120)}`;
};

test('every React example looks and reads like the approved fragment it replaces', { timeout: 600_000 }, async () => {
  const tokens = JSON.parse(fs.readFileSync('design-system/project/tokens.json', 'utf8'));
  const css = compileTokensCss(tokens, tokens.name) + fs.readFileSync('design-system/project/components/bundle.css', 'utf8');
  fs.rmSync(OUT, { recursive: true, force: true });
  const browser = await chromium.launch();
  const problems = [];
  try {
    for (const name of names) {
      const approved = buildPreview(fs.readFileSync(fragmentPath(name), 'utf8'), name, loadIcon);
      const react = await buildFromExample(name);
      const differs = { pixels: false, aria: false };
      for (const theme of tokens.color.themes.map((t) => t.id)) {
        const a = await capture(browser, approved, css, theme);
        const b = await capture(browser, react, css, theme);
        if (!a.png.equals(b.png)) {
          differs.pixels = true;
          fs.mkdirSync(OUT, { recursive: true });
          fs.writeFileSync(path.join(OUT, `${name}-${theme}-approved.png`), a.png);
          fs.writeFileSync(path.join(OUT, `${name}-${theme}-react.png`), b.png);
          if (!EXPECTED[name]?.pixels) problems.push(`${name} [${theme}]: the image differs (see ${OUT}/). Markup:\n   ${firstDifference(a.dom, b.dom)}`);
        }
        if (a.aria !== b.aria) {
          differs.aria = true;
          if (!EXPECTED[name]?.aria) problems.push(`${name} [${theme}]: the accessibility tree differs:\n   ${firstDifference(a.aria, b.aria)}`);
        }
      }
      for (const kind of ['pixels', 'aria']) {
        if (EXPECTED[name]?.[kind] && !differs[kind]) problems.push(`${name}: EXPECTED allows a ${kind} difference that no longer exists; remove it`);
      }
    }
  } finally {
    await browser.close();
  }
  assert.deepEqual(problems, []);
});

test('every expected difference names a component under comparison and says why', () => {
  for (const [name, entry] of Object.entries(EXPECTED)) {
    assert.ok(names.includes(name), `${name} is not compared`);
    assert.ok(entry.reason && (entry.pixels || entry.aria), `${name}: needs a reason and what differs`);
  }
});
