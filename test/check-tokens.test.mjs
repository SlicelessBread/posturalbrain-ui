import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validateTokens, contrast, checkPairs } from '../scripts/check-tokens.mjs';

const colors = (tokens) => ({ themes: [{ id: 'dark', name: 'S' }], tokens });
const ok = (extra = {}) => ({
  name: 'X',
  color: colors([{ name: 'a', value: '#000000', usage: 'u' }]),
  type: { fonts: [], families: { sans: 'system-ui' }, groups: [] },
  ...extra,
});

test('contrast: black on white is 21, translucent colours are blended first', () => {
  assert.equal(Math.round(contrast('#000000', '#ffffff')), 21);
  assert.ok(contrast('rgb(255 255 255 / 0.5)', '#000000') < 6);
  assert.ok(contrast('#ffffff', 'rgb(255 255 255 / 0.1)', '#000000') > 15);
});

test('contrast: a ground can sit on a stack of translucent layers', () => {
  const direct = contrast('#ff0000', 'rgb(255 255 255 / 0.2)', '#000000');
  const stacked = contrast('#ff0000', 'rgb(255 255 255 / 0.2)', ['rgb(255 255 255 / 0.5)', '#000000']);
  assert.ok(stacked < direct, 'a lighter stack under the ground must lower the contrast of red text');
});

test('validateTokens rejects a composite value in a plain family', () => {
  assert.match(validateTokens(ok({ blur: { tokens: [{ name: 'b', value: 'blur(22px) saturate(170%)', usage: 'u' }] } })).join(), /composite|single/i);
  assert.deepEqual(validateTokens(ok({ blur: { tokens: [{ name: 'b', value: 'blur(22px)', usage: 'u' }] } })), []);
});

test('validateTokens accepts a minimal valid file', () => {
  assert.deepEqual(validateTokens(ok()), []);
});

test('validateTokens rejects a name-to-value map', () => {
  assert.match(validateTokens(ok({ spacing: { 'space-1': '4px' } })).join(), /spacing.*list/i);
});

test('validateTokens rejects a name used in two families', () => {
  assert.match(validateTokens(ok({ radius: { tokens: [{ name: 'a', value: '4px', usage: 'u' }] } })).join(), /duplicate.*a/i);
});

test('validateTokens rejects colour values the page drops', () => {
  for (const bad of ['var(--x)', 'red', 'color-mix(in srgb, #000, #fff)', '{missing}']) {
    assert.notDeepEqual(validateTokens({ ...ok(), color: colors([{ name: 'a', value: bad, usage: 'u' }]) }), [], bad);
  }
});

test('validateTokens requires a usage note and a valid name', () => {
  assert.match(validateTokens({ ...ok(), color: colors([{ name: 'a', value: '#000' }]) }).join(), /usage/i);
  assert.match(validateTokens({ ...ok(), color: colors([{ name: 'bad name', value: '#000', usage: 'u' }]) }).join(), /name/i);
});

test('the real tokens are valid and every declared pair is legible in both themes', () => {
  const tokens = JSON.parse(fs.readFileSync('design-system/project/tokens.json', 'utf8'));
  const pairs = JSON.parse(fs.readFileSync('design-system/contrast-pairs.json', 'utf8'));
  assert.deepEqual(validateTokens(tokens), []);
  assert.deepEqual(tokens.color.themes.map((t) => t.id), ['dark', 'light']);
  assert.ok(pairs.length >= 20);
  assert.ok(pairs.some((p) => Array.isArray(p.over)), 'tinted grounds on glass must be declared as stacks');
  assert.deepEqual(checkPairs(tokens, pairs), []);
});
