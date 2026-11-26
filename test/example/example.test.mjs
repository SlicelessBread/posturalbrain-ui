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
