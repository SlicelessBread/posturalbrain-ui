// Motion, checked in Chromium on the generated previews with the package stylesheet:
// what moves ends where it should, and with reduced motion nothing travels or stays hidden.
import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)('playwright');
const css = fs.readFileSync('styles.css', 'utf8');
const body = (name) => /<body[^>]*>([\s\S]*)<\/body>/.exec(fs.readFileSync(`design-system/project/components/${name}/preview.html`, 'utf8'))[1];
const doc = (inner, theme = 'dark') => `<html data-theme="${theme}"><head><style>${css}</style></head><body class="pb-app">${inner}</body></html>`;

let browser;
before(async () => { browser = await chromium.launch(); });
after(async () => { await browser?.close(); });

async function page(html, { width = 390, reducedMotion = 'no-preference' } = {}) {
  const p = await browser.newPage({ viewport: { width, height: 800 }, reducedMotion });
  await p.setContent(html);
  return p;
}

// Finite animations only: a spinner never ends.
const settled = (p) => p.evaluate(() => Promise.all(document.getAnimations().filter((a) => a.effect.getComputedTiming().endTime !== Infinity).map((a) => a.finished.catch(() => {}))).then(() => {}));

// Where the ::before highlight of a container is: its box, moved by its `translate`.
const highlight = (p, selector) => p.evaluate((sel) => {
  const host = document.querySelector(sel);
  const s = getComputedStyle(host, '::before');
  if (s.display === 'none' || s.content === 'none') return null;
  const box = host.getBoundingClientRect();
  const width = parseFloat(s.width);
  const [x = '0px'] = s.translate === 'none' ? [] : s.translate.split(/\s+(?![^(]*\))/);
  const percent = /(-?[\d.]+)%/.exec(x);
  const pixels = /(-?[\d.]+)px/.exec(x);
  const shift = (percent ? (parseFloat(percent[1]) / 100) * width : 0) + (pixels ? parseFloat(pixels[1]) : 0);
  const left = box.left + host.clientLeft + parseFloat(s.left) + shift;
  return { left, right: left + width, width };
}, selector);

const rect = (p, selector) => p.locator(selector).first().evaluate((el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, width: r.width, bottom: r.bottom }; });
const close = (a, b, message) => assert.ok(Math.abs(a - b) <= 1, `${message}: ${a} vs ${b}`);

test('with reduced motion colours still fade, nothing else is transitioned and nothing loops', async () => {
  const p = await page(doc(body('Chip') + body('Spinner') + body('Switch')), { reducedMotion: 'reduce' });
  const chip = await p.locator('.pb-chip').first().evaluate((el) => { const s = getComputedStyle(el); return { property: s.transitionProperty, duration: s.transitionDuration }; });
  assert.equal(chip.property, 'color, background-color, border-color, opacity');
  assert.ok(chip.duration.split(', ').every((d) => parseFloat(d) > 0), chip.duration);
  assert.doesNotMatch(await p.locator('.pb-switch').first().evaluate((el) => getComputedStyle(el, '::after').transitionProperty), /transform|translate|scale/);
  assert.equal(await p.evaluate(() => document.getAnimations().length), 0);
  await p.close();
});

test('the highlight of a segmented control sits exactly under the chosen option, and slides to another', async () => {
  for (const theme of ['dark', 'light']) {
    for (const width of [390, 320]) {
      const p = await page(doc(`<main style="padding:16px">${body('Segmented')}</main>`, theme), { width });
      const where = await highlight(p, '.pb-segmented');
      const chosen = await rect(p, '.pb-segmented > [aria-pressed="true"]');
      close(where.left, chosen.left, `left ${theme} ${width}`);
      close(where.right, chosen.right, `right ${theme} ${width}`);
      await p.close();
    }
  }

  const p = await page(doc(`<main style="padding:16px">${body('Segmented')}</main>`));
  const from = await highlight(p, '.pb-segmented');
  // What the component does when the choice changes: the pressed state and the index.
  await p.evaluate(() => {
    const group = document.querySelector('.pb-segmented');
    const buttons = [...group.children];
    const next = buttons.findIndex((b) => b.getAttribute('aria-pressed') !== 'true');
    buttons.forEach((b, i) => b.setAttribute('aria-pressed', String(i === next)));
    group.style.setProperty('--pb-index', next);
  });
  await p.waitForTimeout(60);
  const midway = await highlight(p, '.pb-segmented');
  await settled(p);
  const to = await highlight(p, '.pb-segmented');
  const chosen = await rect(p, '.pb-segmented > [aria-pressed="true"]');
  close(to.left, chosen.left, 'left after the change');
  assert.notEqual(Math.round(to.left), Math.round(from.left));
  assert.ok(midway.left > Math.min(from.left, to.left) && midway.left < Math.max(from.left, to.left), `it travels: ${from.left} → ${midway.left} → ${to.left}`);

  // Nothing chosen: no highlight at all.
  await p.evaluate(() => {
    const group = document.querySelector('.pb-segmented');
    [...group.children].forEach((b) => b.setAttribute('aria-pressed', 'false'));
    group.style.removeProperty('--pb-index');
  });
  assert.equal(await highlight(p, '.pb-segmented'), null);
  await p.close();
});

test('the pill of the bottom bar is centred behind the current icon at every position', async () => {
  for (const width of [390, 320]) {
    const p = await page(doc(body('ScreenClientManager')), { width });
    const count = await p.locator('.pb-bottomnav > a').count();
    for (let index = 0; index < count; index += 1) {
      await p.evaluate((i) => {
        const nav = document.querySelector('.pb-bottomnav');
        [...nav.children].forEach((a, n) => (n === i ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
        nav.style.setProperty('--pb-index', i);
      }, index);
      await settled(p);
      const column = await highlight(p, '.pb-bottomnav');
      const icon = await rect(p, '.pb-bottomnav > [aria-current="page"] > .pb-icon');
      close((column.left + column.right) / 2, (icon.left + icon.right) / 2, `centre of item ${index} at ${width}`);
      const top = await p.evaluate(() => {
        const nav = document.querySelector('.pb-bottomnav');
        return nav.getBoundingClientRect().top + nav.clientTop + parseFloat(getComputedStyle(nav, '::before').top);
      });
      close(top, await p.locator('.pb-bottomnav > [aria-current="page"] > .pb-icon').evaluate((el) => el.getBoundingClientRect().top), `top of item ${index} at ${width}`);
    }
    await p.close();
  }
});

test('the line under the tabs is under the chosen tab', async () => {
  const p = await page(doc(`<main style="padding:16px">${body('Tabs')}</main>`));
  if (!(await p.evaluate(() => CSS.supports('position-anchor: --a') && CSS.supports('anchor-scope: --a')))) {
    // The fallback: the chosen tab draws its own border.
    assert.notEqual(await p.locator('[role="tab"][aria-selected="true"]').first().evaluate((el) => getComputedStyle(el).borderBottomColor), 'rgba(0, 0, 0, 0)');
    await p.close();
    return;
  }
  const line = () => p.evaluate(() => {
    const tabs = document.querySelector('.pb-tabs');
    const s = getComputedStyle(tabs, '::before');
    const box = tabs.getBoundingClientRect();
    return { left: box.left + parseFloat(s.left), right: box.right - parseFloat(s.right), bottom: box.top + parseFloat(s.top) + parseFloat(s.borderBottomWidth) };
  });
  const check = async (message) => {
    const at = await line();
    const tab = await rect(p, '.pb-tabs > [aria-selected="true"]');
    close(at.left, tab.left, `${message}: left`);
    close(at.right, tab.right, `${message}: right`);
    close(at.bottom, tab.bottom, `${message}: bottom`);
  };
  await check('at first');
  const before = await line();
  await p.evaluate(() => {
    const tabs = [...document.querySelectorAll('.pb-tabs')[0].children];
    tabs.forEach((t, i) => t.setAttribute('aria-selected', String(i === tabs.length - 1)));
  });
  await p.waitForTimeout(60);
  const midway = await line();
  await settled(p);
  await check('after the change');
  const after = await line();
  assert.ok(midway.left > before.left && midway.left < after.left, `it travels: ${before.left} → ${midway.left} → ${after.left}`);
  await p.close();
});

test('the blocks of a page rise in and end exactly in place; with reduced motion they are simply there', async () => {
  const screen = doc(body('ScreenClientManager'));
  const p = await page(screen);
  const blocks = () => p.evaluate(() => [...document.querySelectorAll('.pb-page > *')].map((el) => { const s = getComputedStyle(el); return { opacity: s.opacity, translate: s.translate, transform: s.transform }; }));
  const early = await blocks();
  assert.ok(early.some((b) => Number(b.opacity) < 1), 'at the start some block is still arriving');
  await settled(p);
  for (const b of await blocks()) assert.deepEqual(b, { opacity: '1', translate: 'none', transform: 'none' });
  // Nothing is left that would trap a fixed element inside a block.
  assert.equal(await p.evaluate(() => document.getAnimations().filter((a) => a.effect.target?.parentElement?.classList.contains('pb-page')).length), 0);
  await p.close();

  const still = await page(screen, { reducedMotion: 'reduce' });
  for (const b of await still.evaluate(() => [...document.querySelectorAll('.pb-page > *')].map((el) => ({ opacity: getComputedStyle(el).opacity, translate: getComputedStyle(el).translate })))) {
    assert.deepEqual(b, { opacity: '1', translate: 'none' });
  }
  await still.close();
});

test('the bars of the year grow to their full height', async () => {
  const p = await page(doc(`<main style="padding:16px">${body('YearBars')}</main>`));
  const heights = () => p.evaluate(() => [...document.querySelectorAll('.pb-bars__bar')].map((el) => ({ drawn: el.getBoundingClientRect().height, laid: el.offsetHeight })));
  assert.ok((await heights()).some((b) => b.drawn < b.laid - 1), 'at the start a bar is still growing');
  await settled(p);
  for (const b of await heights()) close(b.drawn, b.laid, 'bar height');
  await p.close();
});

test('a sheet, a dialog and a toast drawn in place arrive and end fully visible', async () => {
  for (const reducedMotion of ['no-preference', 'reduce']) {
    const p = await page(doc(body('Sheet') + body('ConfirmDialog') + body('Toast')), { reducedMotion });
    await settled(p);
    for (const selector of ['.pb-sheet', '.pb-dialog', '.pb-toast', '.pb-sheet-backdrop']) {
      const end = await p.locator(selector).first().evaluate((el) => { const s = getComputedStyle(el); return { opacity: s.opacity, scale: s.scale }; });
      assert.deepEqual(end, { opacity: '1', scale: 'none' }, `${selector} with ${reducedMotion}`);
    }
    assert.equal(await p.locator('.pb-sheet').first().evaluate((el) => getComputedStyle(el).translate), 'none');
    await p.close();
  }
});
