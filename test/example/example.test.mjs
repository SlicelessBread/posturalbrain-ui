// Runs against the built example app (npm run test:example builds it first): the one place where
// the package is installed, compiled by Next and hydrated in a real browser.
import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { settled } from '../settled.mjs';
import { startExample } from './server.mjs';

const { chromium } = createRequire(import.meta.url)('playwright');
let server;
let browser;

before(async () => {
  server = await startExample();
  browser = await chromium.launch();
  fs.mkdirSync('.render', { recursive: true });
});

after(async () => {
  await browser?.close();
  server?.stop();
});

async function open(options = {}) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, ...options });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(server.url, { waitUntil: 'networkidle' });
  return { page, errors, context };
}

test('the app compiles the package: styles and fonts reach the page', async () => {
  const { page, errors, context } = await open();
  const primary = page.locator('.pb-btn--primary').first();
  assert.match(await primary.evaluate((el) => getComputedStyle(el).backgroundImage), /gradient/);
  const fonts = await page.evaluate(async () => {
    await document.fonts.ready;
    const body = getComputedStyle(document.body);
    return {
      root: getComputedStyle(document.documentElement).getPropertyValue('--font-text').trim(),
      body: body.getPropertyValue('--font-text').trim(),
      loaded: [...document.fonts].filter((f) => f.status === 'loaded').length,
      usable: document.fonts.check(`16px ${body.fontFamily.split(',')[0]}`),
    };
  });
  assert.notEqual(fonts.body, fonts.root, 'next/font did not replace --font-text on <body>');
  assert.ok(fonts.loaded > 0 && fonts.usable, 'the hosted font did not load');
  await page.screenshot({ path: '.render/example-first.png' });
  assert.deepEqual(errors, []);
  await context.close();
});

test('the theme switch changes the theme, and the choice is back before the page paints after a reload', async () => {
  const { page, errors, context } = await open({ colorScheme: 'dark' });
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), 'dark');
  await page.getByRole('button', { name: 'Chiaro' }).click();
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), 'light');
  assert.equal(await page.getByRole('button', { name: 'Chiaro' }).getAttribute('aria-pressed'), 'true');
  // The hook applies a choice exactly as the head script does: same colour scheme, same theme-color.
  assert.deepEqual(await page.evaluate(() => [document.documentElement.style.colorScheme, document.querySelector('meta[name="theme-color"]').content, localStorage.getItem('pb-theme')]), ['light', '#f3f6fc', 'light']);
  await page.screenshot({ path: '.render/example-light.png' });

  // Record the theme when the document has been parsed, before the app's own scripts hydrate it.
  await page.addInitScript(() => document.addEventListener('DOMContentLoaded', () => { window.__themeWhenParsed = document.documentElement.dataset.theme; }));
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await page.evaluate(() => window.__themeWhenParsed), 'light');
  assert.equal(await page.getByRole('button', { name: 'Chiaro' }).getAttribute('aria-pressed'), 'true');

  await page.getByRole('button', { name: 'Automatico' }).click();
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), 'dark');
  // With the choice on auto the page follows the device while it is open.
  await page.emulateMedia({ colorScheme: 'light' });
  await page.waitForFunction(() => document.documentElement.dataset.theme === 'light', null, { timeout: 5000 });
  assert.equal(await page.getByRole('button', { name: 'Automatico' }).getAttribute('aria-pressed'), 'true');
  assert.deepEqual(errors, [], 'console errors (hydration included)');
  await context.close();
});

test('the server sends the theme script in the head of the document', async () => {
  const html = await (await fetch(server.url)).text();
  const head = html.slice(0, html.indexOf('</head>'));
  assert.match(head, /<script>\(function\(\)\{try\{var k="pb-theme"/);
});

const state = (page) => page.locator('#state').evaluate((el) => ({ ...el.dataset }));

test('one component of every family is on the page, in both themes, with no console error', async () => {
  const { page, errors, context } = await open({ colorScheme: 'dark' });
  for (const id of ['azioni', 'navigazione', 'superfici', 'cifre', 'moduli', 'avvisi', 'calendario', 'video']) {
    assert.ok(await page.locator(`#${id}`).isVisible(), `section ${id}`);
  }
  for (const selector of ['.pb-topbar', '.pb-bottomnav', '.pb-toast', '.pb-stat', '.pb-list-row', '.pb-bars', '.pb-field', '.pb-banner', '.pb-month', '.pb-video-card', '.pb-player', '.pb-platform', '.pb-week', '.pb-upload', '.pb-theme-switch']) {
    assert.ok(await page.locator(selector).first().isVisible(), selector);
  }
  // Links drawn with Next's Link keep the classes and go where they are told.
  assert.equal(await page.locator('.pb-bottomnav a[aria-current="page"]').getAttribute('href'), '/');
  // Next's Link navigates without loading a new document: a mark left on window survives.
  await page.evaluate(() => { window.__sameDocument = true; });
  await page.locator('.pb-bottomnav').getByRole('link', { name: 'Pazienti' }).click();
  await page.getByRole('heading', { name: 'Altra pagina' }).waitFor();
  assert.equal(await page.evaluate(() => window.__sameDocument), true);
  for (const selector of ['.pb-login', '.pb-login__form', '.pb-login__or', 'label.pb-upload--idle', '.pb-event--compact', '.pb-empty']) {
    assert.ok(await page.locator(selector).first().isVisible(), selector);
  }
  // On a real page the sign-in screen is as tall as the screen.
  assert.ok(await page.locator('.pb-login').evaluate((el) => el.getBoundingClientRect().height >= window.innerHeight));
  await page.getByRole('link', { name: 'Torna alla prova', exact: true }).first().click();
  await page.getByRole('heading', { name: 'Prova del pacchetto' }).waitFor();
  assert.equal(await page.locator('a.pb-list-row').first().getAttribute('href'), '/');
  await page.screenshot({ path: '.render/example-dark.png', fullPage: true });
  await page.getByRole('button', { name: 'Chiaro' }).click();
  await page.screenshot({ path: '.render/example-light.png', fullPage: true });
  assert.deepEqual(errors, []);
  await context.close();
});

test('the stateful components report what the person does', async () => {
  const { page, errors, context } = await open();

  await page.getByRole('group', { name: 'Vista dei post' }).getByRole('button', { name: 'Calendario' }).click();
  assert.equal((await state(page)).view, 'calendario');

  const tabs = page.getByRole('tablist', { name: 'Scheda paziente' });
  await tabs.getByRole('tab', { name: 'Dati' }).focus();
  await page.keyboard.press('ArrowRight');
  assert.equal((await state(page)).tab, 'percorsi');
  assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Percorsi');
  await page.keyboard.press('End');
  assert.equal((await state(page)).tab, 'rate');
  await page.keyboard.press('ArrowRight');
  assert.equal((await state(page)).tab, 'dati', 'the arrows wrap around');

  const toggle = page.getByRole('switch', { name: /Notifiche sul telefono/ });
  await toggle.click();
  assert.equal(await toggle.getAttribute('aria-checked'), 'true');
  assert.equal((await state(page)).notify, 'true');

  const search = page.getByRole('searchbox', { name: 'Cerca un paziente' });
  assert.equal(await page.getByRole('button', { name: 'Cancella la ricerca' }).count(), 0);
  await search.fill('colom');
  await page.getByRole('button', { name: 'Cancella la ricerca' }).click();
  assert.equal((await state(page)).query, '');
  assert.equal(await search.inputValue(), '');

  const wednesday = page.getByRole('button', { name: 'Mercoledì 2 dicembre, 1 evento' });
  await wednesday.click();
  assert.equal(await wednesday.getAttribute('aria-pressed'), 'true');
  assert.equal((await state(page)).day, 'mer');
  assert.ok(await page.locator('.pb-daylist__empty').isVisible(), 'a day without events says so');

  await page.locator('.pb-upload input[type="file"]').setInputFiles({ name: 'esercizi.mp4', mimeType: 'video/mp4', buffer: Buffer.from('video') });
  assert.equal((await state(page)).file, 'esercizi.mp4');
  assert.ok(await page.locator('.pb-upload--done').isVisible());
  await page.getByRole('button', { name: 'Sostituisci' }).click();
  assert.ok(await page.locator('label.pb-upload--idle').isVisible());

  assert.deepEqual(errors, []);
  await context.close();
});

test('the sheet: Esc and a tap outside close it once each, the veil follows it, and removing it frees the page', async () => {
  const { page, errors, context } = await open();
  const sheet = page.locator('dialog.pb-sheet');
  const veils = () => page.locator('body > .pb-sheet-backdrop').count();
  // The veil leaves with the dialog's close event, one task after close(): wait for it.
  const veilGone = () => page.waitForFunction(() => document.querySelectorAll('body > .pb-sheet-backdrop').length === 0, null, { timeout: 5000 });
  const openSheet = async () => {
    await page.getByRole('button', { name: 'Apri il foglio' }).click();
    await sheet.getByRole('heading', { name: 'Aggiungi collaboratore' }).waitFor();
  };

  assert.equal(await sheet.evaluate((d) => d.open), false);
  await openSheet();
  assert.equal(await sheet.evaluate((d) => d.matches(':modal')), true);
  assert.equal(await veils(), 1);

  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.querySelector('#state').dataset.closes === '1');
  assert.equal(await sheet.evaluate((d) => d.open), false);
  await veilGone();
  assert.equal(await sheet.locator('*').count(), 0, 'a closed sheet holds nothing');

  await openSheet();
  await page.mouse.click(20, 20); // above the sheet: outside it
  await page.waitForFunction(() => document.querySelector('#state').dataset.closes === '2');
  await veilGone();

  // The app closes it after its own action: that is not a dismissal.
  await openSheet();
  await sheet.getByRole('button', { name: 'Aggiungi collaboratore' }).click();
  await page.waitForFunction(() => !document.querySelector('dialog.pb-sheet').open);
  assert.equal((await state(page)).closes, '2');
  await veilGone();

  await openSheet();
  await sheet.getByRole('button', { name: 'Chiudi', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('#state').dataset.closes === '3');

  // Removed from the page while open: nothing stays in the way.
  await openSheet();
  await sheet.getByRole('button', { name: 'Togli il foglio dalla pagina' }).click();
  await page.waitForFunction(() => !document.querySelector('dialog.pb-sheet'));
  await veilGone();
  await page.getByRole('group', { name: 'Vista dei post' }).getByRole('button', { name: 'Calendario' }).click();
  assert.equal((await state(page)).view, 'calendario');

  assert.deepEqual(errors, []);
  await context.close();
});

test('the confirmation: it must be answered, the safe button has the focus, and confirming is not a cancel', async () => {
  const { page, errors, context } = await open();
  const dialog = page.getByRole('alertdialog', { name: 'Eliminare Paolo Rinaldi?' });
  const ask = async () => {
    await page.getByRole('button', { name: 'Elimina paziente' }).click();
    await dialog.waitFor();
  };

  await ask();
  assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Annulla');
  await page.mouse.click(20, 20);
  assert.ok(await dialog.isVisible(), 'a tap outside must not close a confirmation');
  await dialog.getByRole('button', { name: 'Elimina' }).click();
  await page.waitForFunction(() => document.querySelector('#state').dataset.outcome === 'confermato');
  await page.waitForFunction(() => !document.querySelector('dialog.pb-dialog').open);
  assert.equal((await state(page)).outcome, 'confermato');

  await ask();
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.querySelector('#state').dataset.outcome === 'annullato');

  await ask();
  await dialog.getByRole('button', { name: 'Annulla' }).click();
  await page.waitForFunction(() => !document.querySelector('dialog.pb-dialog').open);
  await page.waitForFunction(() => document.querySelectorAll('body > .pb-sheet-backdrop').length === 0, null, { timeout: 5000 });

  assert.deepEqual(errors, []);
  await context.close();
});

// ---------- Motion ----------

const sheetNow = (page) => page.locator('dialog.pb-sheet').evaluate((d) => ({
  open: d.open,
  closing: d.hasAttribute('data-closing'),
  inert: d.inert,
  translate: getComputedStyle(d).translate,
  opacity: getComputedStyle(d).opacity,
  note: Boolean(d.querySelector('#sheet-note')),
}));
const noVeil = (page) => page.waitForFunction(() => document.querySelectorAll('body > .pb-sheet-backdrop').length === 0, null, { timeout: 5000 });
const closes = async (page) => Number((await state(page)).closes);
const showSheet = async (page) => {
  await page.getByRole('button', { name: 'Apri il foglio' }).click();
  await page.locator('dialog.pb-sheet').getByRole('heading', { name: 'Aggiungi collaboratore' }).waitFor();
};

test('the sheet slides in, and stays on screen with what it showed while it slides out', async () => {
  const { page, errors, context } = await open();
  const sheet = page.locator('dialog.pb-sheet');

  await page.getByRole('button', { name: 'Apri il foglio' }).click();
  await page.waitForFunction(() => document.querySelector('dialog.pb-sheet').open);
  assert.notEqual((await sheetNow(page)).translate, 'none', 'just opened, the sheet is still on its way up');
  assert.ok(Number(await page.locator('body > .pb-sheet-backdrop').evaluate((el) => getComputedStyle(el).opacity)) < 1, 'the veil is still darkening');
  await settled(page);
  assert.deepEqual(await sheetNow(page), { open: true, closing: false, inert: false, translate: 'none', opacity: '1', note: true });

  // The app closes it and clears part of its content at the same time.
  await sheet.getByRole('button', { name: 'Aggiungi collaboratore' }).click();
  await page.waitForFunction(() => document.querySelector('#state').dataset.sheet === 'false');
  const leaving = await sheetNow(page);
  assert.equal(leaving.open, true, 'the dialog closes only when the exit has ended');
  assert.equal(leaving.closing, true);
  assert.equal(leaving.inert, true, 'on its way out the sheet no longer answers: a second tap cannot repeat the action');
  assert.equal(leaving.note, true, 'what the sheet showed stays until it is gone');
  assert.equal(await page.locator('body > .pb-sheet-backdrop').getAttribute('data-closing'), '');
  await page.waitForFunction(() => !document.querySelector('dialog.pb-sheet').open);
  await noVeil(page);
  assert.equal(await closes(page), 0, 'a close made by the app is not a dismissal');
  assert.equal(await sheet.locator('*').count(), 0);

  // Its own button: the dismissal is reported when the sheet is gone, once.
  await showSheet(page);
  await sheet.getByRole('button', { name: 'Chiudi', exact: true }).click();
  const dismissed = await sheetNow(page);
  assert.equal(dismissed.open && dismissed.closing, true);
  assert.equal(await closes(page), 0);
  await page.waitForFunction(() => document.querySelector('#state').dataset.closes === '1');
  await noVeil(page);

  assert.deepEqual(errors, []);
  await context.close();
});

test('the sheet survives haste: reopened while leaving, Esc while arriving, Esc twice', async () => {
  const { page, errors, context } = await open();
  const sheet = page.locator('dialog.pb-sheet');

  // The app closes it and opens it again before the exit has ended: it stays.
  await showSheet(page);
  await sheet.getByRole('button', { name: 'Chiudi e riapri' }).click();
  await page.waitForTimeout(700);
  await settled(page);
  assert.deepEqual(await sheetNow(page), { open: true, closing: false, inert: false, translate: 'none', opacity: '1', note: true });
  assert.equal(await page.locator('body > .pb-sheet-backdrop').count(), 1);
  assert.equal(await page.locator('body > .pb-sheet-backdrop').getAttribute('data-closing'), null);
  assert.equal(await closes(page), 0);

  // Esc twice in a row: one dismissal, no sheet left half way, no veil left behind.
  await page.keyboard.press('Escape');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.querySelector('#state').dataset.closes === '1');
  await noVeil(page);
  await page.waitForTimeout(400);
  assert.equal(await closes(page), 1);
  assert.equal((await sheetNow(page)).open, false);

  // Esc while it is still arriving.
  await page.getByRole('button', { name: 'Apri il foglio' }).click();
  await page.waitForFunction(() => document.querySelector('dialog.pb-sheet').open);
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.querySelector('#state').dataset.closes === '2');
  await noVeil(page);
  assert.equal((await sheetNow(page)).open, false);

  // The browser closes it on its own while the app's exit is running: no dismissal, nothing left behind.
  await showSheet(page);
  await sheet.getByRole('button', { name: 'Aggiungi collaboratore' }).click();
  await sheet.evaluate((d) => d.close());
  await page.waitForFunction(() => !document.querySelector('dialog.pb-sheet').open);
  await noVeil(page);
  await page.waitForTimeout(400);
  assert.equal(await closes(page), 2);

  // And it still opens afterwards.
  await showSheet(page);
  await settled(page);
  assert.equal((await sheetNow(page)).translate, 'none');

  assert.deepEqual(errors, []);
  await context.close();
});

test('with reduced motion the sheet does not travel: it fades, and still closes', async () => {
  const { page, errors, context } = await open({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: 'Apri il foglio' }).click();
  await page.waitForFunction(() => document.querySelector('dialog.pb-sheet').open);
  assert.equal((await sheetNow(page)).translate, 'none');
  await settled(page);
  assert.equal((await sheetNow(page)).opacity, '1');
  await page.locator('dialog.pb-sheet').getByRole('button', { name: 'Chiudi', exact: true }).click();
  assert.equal((await sheetNow(page)).translate, 'none');
  await page.waitForFunction(() => document.querySelector('#state').dataset.closes === '1');
  await noVeil(page);
  // The blocks of the page are simply there.
  assert.equal(await page.evaluate(() => document.getAnimations().length), 0);
  assert.deepEqual(errors, []);
  await context.close();
});

test('the toast arrives, and fades away before it leaves the page', async () => {
  const { page, errors, context } = await open();
  const toast = page.locator('.pb-toast', { hasText: 'Collaboratore salvato' });
  assert.equal(await toast.count(), 0, 'a toast that is not open draws nothing');
  await page.getByRole('button', { name: "Mostra l'avviso" }).click();
  await toast.waitFor();
  assert.ok(Number(await toast.evaluate((el) => getComputedStyle(el).opacity)) < 1, 'it is still arriving');
  await settled(page);
  assert.deepEqual(await toast.evaluate((el) => [getComputedStyle(el).opacity, getComputedStyle(el).translate]), ['1', 'none']);

  await page.getByRole('button', { name: "Nascondi l'avviso" }).click();
  assert.equal(await toast.getAttribute('data-closing'), '', 'it is still there, on its way out');
  await toast.waitFor({ state: 'detached' });

  // Shown again while leaving: it stays.
  await page.getByRole('button', { name: "Mostra l'avviso" }).click();
  await toast.waitFor();
  await page.getByRole('button', { name: "Nascondi l'avviso" }).click();
  await page.getByRole('button', { name: "Mostra l'avviso" }).click();
  await page.waitForTimeout(500);
  assert.equal(await toast.count(), 1);
  assert.equal(await toast.getAttribute('data-closing'), null);

  assert.deepEqual(errors, []);
  await context.close();
});

test('the highlight of a real segmented control slides, and another one on the page does not move', async () => {
  const { page, errors, context } = await open();
  const shift = (label) => page.getByRole('group', { name: label }).evaluate((el) => getComputedStyle(el, '::before').translate);
  const theme = await shift('Tema');
  const from = await shift('Vista dei post');
  await page.getByRole('group', { name: 'Vista dei post' }).getByRole('button', { name: 'Calendario' }).click();
  await page.waitForTimeout(60);
  const midway = await shift('Vista dei post');
  await settled(page);
  const to = await shift('Vista dei post');
  assert.notEqual(from, to);
  assert.ok(midway !== from && midway !== to, `it travels: ${from} → ${midway} → ${to}`);
  assert.equal(await shift('Tema'), theme);
  assert.equal(await page.getByRole('group', { name: 'Vista dei post' }).evaluate((el) => el.style.getPropertyValue('--pb-index')), '1');
  assert.deepEqual(errors, []);
  await context.close();
});

test('what happens inside the sheet does not close it, and a refused dismissal brings it back', async () => {
  const { page, errors, context } = await open();
  const sheet = page.locator('dialog.pb-sheet');
  await showSheet(page);
  await settled(page);

  // A file picker cancelled inside the sheet sends a `cancel` that bubbles; a dialog nested in it sends a `close`
  // that React hands up. Neither is about this sheet.
  for (const type of ['cancel', 'close']) {
    await sheet.locator('input').first().evaluate((input, name) => input.dispatchEvent(new Event(name, { bubbles: true, cancelable: true })), type);
    await page.waitForTimeout(350);
    assert.equal((await sheetNow(page)).open, true, `a ${type} event from inside`);
    assert.equal((await sheetNow(page)).closing, false);
    assert.equal(await closes(page), 0);
  }

  // The app refuses the dismissal (it keeps \`open\` true): the sheet leaves and comes back, whole.
  await sheet.getByRole('button', { name: 'Rifiuta la chiusura' }).click();
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.querySelector('#state').dataset.refusals === '1');
  await page.waitForFunction(() => { const d = document.querySelector('dialog.pb-sheet'); return d.open && !d.hasAttribute('data-closing'); });
  await settled(page);
  assert.deepEqual(await sheetNow(page), { open: true, closing: false, inert: false, translate: 'none', opacity: '1', note: true });
  assert.equal(await page.locator('body > .pb-sheet-backdrop').count(), 1);
  assert.equal(await closes(page), 0);

  // Once the app agrees again it closes as usual.
  await sheet.getByRole('button', { name: 'Rifiuta la chiusura' }).click();
  await sheet.getByRole('button', { name: 'Chiudi', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('#state').dataset.closes === '1');
  await noVeil(page);

  // A confirmation on its way out cannot be confirmed a second time.
  await page.getByRole('button', { name: 'Elimina paziente' }).click();
  const dialog = page.locator('dialog.pb-dialog');
  await dialog.getByRole('button', { name: 'Elimina' }).click();
  assert.deepEqual(await dialog.evaluate((d) => [d.open, d.inert]), [true, true]);
  await page.waitForFunction(() => !document.querySelector('dialog.pb-dialog').open);
  assert.equal(await dialog.evaluate((d) => d.inert), false);

  assert.deepEqual(errors, []);
  await context.close();
});
