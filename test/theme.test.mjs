import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parseChoice, resolveTheme, themeScript, THEME_COLORS, THEME_STORAGE_KEY, ThemeScript, ThemeSwitch } from '../src/index.ts';

const { chromium } = createRequire(import.meta.url)('playwright');
const ORIGIN = 'http://pb.test/';
let browser;
before(async () => { browser = await chromium.launch(); });
after(async () => { await browser?.close(); });

/** Opens a page that runs the theme script, with a stored value and a device preference. */
async function run({ stored, system = 'dark', blocked = false } = {}) {
  const context = await browser.newContext({ colorScheme: system });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.route(ORIGIN, (route) => route.fulfill({ contentType: 'text/html', body: `<!doctype html><html><head><script>${themeScript()}</script></head><body></body></html>` }));
  if (blocked) {
    await page.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } }));
  } else if (stored !== undefined) {
    await page.addInitScript(([key, value]) => window.localStorage.setItem(key, value), [THEME_STORAGE_KEY, stored]);
  }
  await page.goto(ORIGIN);
  const read = () => page.evaluate(() => ({
    theme: document.documentElement.dataset.theme,
    choice: document.documentElement.dataset.themeChoice,
    scheme: document.documentElement.style.colorScheme,
    meta: document.querySelector('meta[name="theme-color"]')?.content,
    metas: document.querySelectorAll('meta[name="theme-color"]').length,
  }));
  return { page, read, errors, close: () => context.close() };
}

test('parseChoice accepts the two themes and treats everything else as auto', () => {
  assert.equal(parseChoice('light'), 'light');
  assert.equal(parseChoice('dark'), 'dark');
  for (const raw of ['blue', '', null, undefined, 42, {}, 'AUTO']) assert.equal(parseChoice(raw), 'auto');
});

test('resolveTheme follows the device only when the choice is auto', () => {
  assert.equal(resolveTheme('auto', true), 'light');
  assert.equal(resolveTheme('auto', false), 'dark');
  assert.equal(resolveTheme('dark', true), 'dark');
  assert.equal(resolveTheme('light', false), 'light');
});

test('the script applies a stored choice before paint: theme, colour scheme and theme-color', async () => {
  const t = await run({ stored: 'light', system: 'dark' });
  assert.deepEqual(await t.read(), { theme: 'light', choice: 'light', scheme: 'light', meta: THEME_COLORS.light, metas: 1 });
  assert.deepEqual(t.errors, []);
  await t.close();
});

test('with nothing stored the script follows the device, and keeps following it', async () => {
  const t = await run({ system: 'light' });
  assert.deepEqual(await t.read(), { theme: 'light', choice: 'auto', scheme: 'light', meta: THEME_COLORS.light, metas: 1 });
  await t.page.emulateMedia({ colorScheme: 'dark' });
  // The browser reports a media change with the next frame, not at once.
  await t.page.waitForFunction(() => document.documentElement.dataset.theme === 'dark', null, { timeout: 5000 });
  assert.deepEqual(await t.read(), { theme: 'dark', choice: 'auto', scheme: 'dark', meta: THEME_COLORS.dark, metas: 1 });
  await t.close();
});

test('a fixed choice does not move when the device changes', async () => {
  const t = await run({ stored: 'dark', system: 'dark' });
  await t.page.emulateMedia({ colorScheme: 'light' });
  await t.page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))));
  assert.equal(await t.page.evaluate(() => window.matchMedia('(prefers-color-scheme: light)').matches), true);
  assert.equal((await t.read()).theme, 'dark');
  await t.close();
});

test('a corrupt stored value counts as auto', async () => {
  const t = await run({ stored: 'blue', system: 'light' });
  const state = await t.read();
  assert.equal(state.choice, 'auto');
  assert.equal(state.theme, 'light');
  assert.deepEqual(t.errors, []);
  await t.close();
});

test('with storage blocked the script still sets a theme and raises nothing', async () => {
  const t = await run({ blocked: true, system: 'light' });
  const state = await t.read();
  assert.equal(state.theme, 'light');
  assert.equal(state.choice, 'auto');
  assert.deepEqual(t.errors, []);
  await t.close();
});

test('the script holds only constants: no markup can close the <script> element early', () => {
  assert.doesNotMatch(themeScript(), /<\/script|<!--/i);
  assert.match(renderToStaticMarkup(h(ThemeScript, { nonce: 'abc' })), /^<script nonce="abc">\(function\(\)\{/);
});

test('ThemeSwitch renders on the server with Automatico chosen', () => {
  const html = renderToStaticMarkup(h(ThemeSwitch));
  assert.match(html, /<button type="button" aria-pressed="true" data-value="auto">Automatico<\/button>/);
  assert.match(html, /aria-pressed="false" data-value="light">Chiaro</);
  assert.match(html, /role="group" aria-labelledby="[^"]+"/);
});
