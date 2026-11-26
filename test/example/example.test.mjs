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
  await page.screenshot({ path: '.render/example-light.png' });

  // Record the theme when the document has been parsed, before the app's own scripts hydrate it.
  await page.addInitScript(() => document.addEventListener('DOMContentLoaded', () => { window.__themeWhenParsed = document.documentElement.dataset.theme; }));
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await page.evaluate(() => window.__themeWhenParsed), 'light');
  assert.equal(await page.getByRole('button', { name: 'Chiaro' }).getAttribute('aria-pressed'), 'true');

  await page.getByRole('button', { name: 'Automatico' }).click();
  assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), 'dark');
  assert.deepEqual(errors, [], 'console errors (hydration included)');
  await context.close();
});

test('the server sends the theme script in the head of the document', async () => {
  const html = await (await fetch(server.url)).text();
  const head = html.slice(0, html.indexOf('</head>'));
  assert.match(head, /<script>\(function\(\)\{try\{var k="pb-theme"/);
});
