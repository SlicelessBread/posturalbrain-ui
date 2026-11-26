import test from 'node:test';
import assert from 'node:assert/strict';
import { renderCheck } from '../scripts/render-check.mjs';

test('every preview renders cleanly in both themes at phone widths', { timeout: 600_000 }, async () => {
  const results = await renderCheck({ projectDir: 'design-system/project' });
  assert.ok(results.length > 0, 'no previews were rendered');
  const failed = results.filter((r) => r.errors.length).map((r) => `${r.component} [${r.theme} ${r.width}px]: ${r.errors.join('; ')}`);
  assert.deepEqual(failed, []);
});

test('a closed <dialog> sheet or confirm takes no space, and an open one shows', { timeout: 60_000 }, async () => {
  const { createRequire } = await import('node:module');
  const fs = await import('node:fs');
  const { chromium } = createRequire(import.meta.url)('playwright');
  const { compileTokensCss } = await import('../scripts/tokens-css.mjs');
  const tokens = JSON.parse(fs.readFileSync('design-system/project/tokens.json', 'utf8'));
  const css = compileTokensCss(tokens, tokens.name) + fs.readFileSync('design-system/project/components/bundle.css', 'utf8');
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 700 } });
    await page.setContent(`<html data-theme="dark"><head><style>${css}</style></head><body class="pb-app">
      <dialog class="pb-sheet" id="s"><div class="pb-sheet__body">Foglio</div></dialog>
      <dialog class="pb-dialog" id="d">Conferma</dialog></body></html>`);
    const box = (id) => page.evaluate((i) => { const r = document.getElementById(i).getBoundingClientRect(); return r.width * r.height; }, id);
    assert.equal(await box('s'), 0, 'closed sheet is visible');
    assert.equal(await box('d'), 0, 'closed confirm is visible');
    await page.evaluate(() => document.getElementById('s').showModal());
    assert.ok((await box('s')) > 0, 'open sheet is not visible');
  } finally {
    await browser.close();
  }
});
