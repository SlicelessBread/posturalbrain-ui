import test from 'node:test';
import assert from 'node:assert/strict';
import { renderCheck } from '../scripts/render-check.mjs';

test('every preview renders cleanly in both themes at phone widths', { timeout: 600_000 }, async () => {
  const results = await renderCheck({ projectDir: 'design-system/project' });
  assert.ok(results.length > 0, 'no previews were rendered');
  const failed = results.filter((r) => r.errors.length).map((r) => `${r.component} [${r.theme} ${r.width}px]: ${r.errors.join('; ')}`);
  assert.deepEqual(failed, []);
});
