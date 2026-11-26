// Runs against the built example app (npm run test:example builds it first): the one place where
// the package is installed, compiled by Next and hydrated in a real browser.
import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
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
  await sheet.getByRole('button', { name: 'Chiudi' }).click();
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
