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

test('layout details: sign-in fills a real screen, a still unmeasured bar is not a measure, the row card keeps disc and duration apart', { timeout: 60_000 }, async () => {
  const { createRequire } = await import('node:module');
  const fs = await import('node:fs');
  const { chromium } = createRequire(import.meta.url)('playwright');
  const css = fs.readFileSync('styles.css', 'utf8');
  const body = (name) => /<body[^>]*>([\s\S]*)<\/body>/.exec(fs.readFileSync(`design-system/project/components/${name}/preview.html`, 'utf8'))[1];
  const doc = (inner) => `<html data-theme="dark"><head><style>${css}</style></head><body class="pb-app">${inner}</body></html>`;
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 700 } });

    await page.setContent(doc('<main class="pb-login"><h1 class="text-display">PosturalBrain</h1></main>'));
    assert.equal(await page.evaluate(() => document.querySelector('.pb-login').getBoundingClientRect().height), 700);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setContent(doc(body('Progress')));
    const bar = await page.evaluate(() => {
      const track = document.querySelector('.pb-progress--indeterminate');
      return { track: track.getBoundingClientRect().width, fill: track.firstElementChild.getBoundingClientRect().width };
    });
    assert.equal(bar.fill, bar.track, 'with reduced motion the unmeasured bar must not stop at a part of the track');
    await page.emulateMedia({ reducedMotion: 'no-preference' });

    // The widest duration in every card, at the phone widths where the grid has two narrow columns.
    for (const width of [390, 375, 360, 320]) {
      await page.setViewportSize({ width, height: 700 });
      await page.setContent(doc(`<main class="pb-page">${body('VideoCard')}</main>`));
      const apart = await page.evaluate(() => [...document.querySelectorAll('.pb-video-card')].map((card) => {
        card.querySelector('.pb-video-card__duration').textContent = '1:08:40';
        const a = card.querySelector('.pb-video-card__play').getBoundingClientRect();
        const b = card.querySelector('.pb-video-card__duration').getBoundingClientRect();
        return a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top;
      }));
      assert.deepEqual(apart, apart.map(() => true), `disc and duration overlap at ${width}px`);
    }
  } finally {
    await browser.close();
  }
});
