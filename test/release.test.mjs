import test from 'node:test';
import assert from 'node:assert/strict';
import { nextTag } from '../scripts/release-version.mjs';

const next = (tags, kind, bump, packageVersion = '0.0.1') => nextTag({ tags, packageVersion, kind, bump });

test('the first release is the version written in package.json; pre-releases before it prepare that version', () => {
  assert.equal(next([], 'release'), 'v0.0.1');
  assert.equal(next([], 'release', 'major'), 'v0.0.1', 'there is nothing to raise yet');
  assert.equal(next([], 'prerelease'), 'v0.0.1-pre.1');
  assert.equal(next(['v0.0.1-pre.1'], 'prerelease'), 'v0.0.1-pre.2');
  assert.equal(next(['v0.0.1-pre.1', 'v0.0.1-pre.2'], 'release'), 'v0.0.1');
});

test('a release raises the number; pre-releases count on their own and start again after each release', () => {
  const tags = [];
  const publish = (kind, bump) => { const tag = next(tags, kind, bump); tags.push(tag); return tag; };
  assert.equal(publish('release'), 'v0.0.1');
  assert.equal(publish('prerelease'), 'v0.0.2-pre.1');
  assert.equal(publish('prerelease'), 'v0.0.2-pre.2');
  assert.equal(publish('release'), 'v0.0.2');
  assert.equal(publish('prerelease'), 'v0.0.3-pre.1');
  assert.equal(publish('release', 'minor'), 'v0.1.0');
  assert.equal(publish('prerelease'), 'v0.1.1-pre.1');
  assert.equal(publish('release', 'major'), 'v1.0.0');
  assert.equal(publish('release'), 'v1.0.1');
});

test('the highest release counts, whatever the order and whatever else is tagged', () => {
  const tags = ['v0.0.9', 'v0.0.10', 'v0.0.2', 'pre-3', 'latest', 'v0.0.11-pre.4', 'v0.0.11-pre.x', 'v0.0.11-pre.2', 'v1', 'v0.0.10-rc.1'];
  assert.equal(next(tags, 'release'), 'v0.0.11');
  assert.equal(next(tags, 'prerelease'), 'v0.0.11-pre.5', 'the counter follows the highest one, even with gaps');
});

test('counters are numbers, not text: 10 comes after 9, and odd hand-made tags do not count', () => {
  assert.equal(next(['v0.0.1', 'v0.0.2-pre.9', 'v0.0.2-pre.10'], 'prerelease'), 'v0.0.2-pre.11');
  assert.equal(next(['v0.0.1', 'v0.0.2-pre.10', 'v0.0.2-pre.9'], 'prerelease'), 'v0.0.2-pre.11');
  assert.equal(next(['v0.0.1', 'v0.0.2-pre.', 'v0.0.2-pre.1e3', 'v0.0.2-pre.0x10', 'v0.0.2-pre.3'], 'prerelease'), 'v0.0.2-pre.4');
  assert.equal(next(['v0.0.9', 'v0.0.10'], 'release'), 'v0.0.11');
});

test('right after a release, when package.json holds the released version, the next step is still one up', () => {
  assert.equal(next(['v0.0.3'], 'prerelease', 'patch', '0.0.3'), 'v0.0.4-pre.1');
  assert.equal(next(['v0.0.3', 'v0.0.4-pre.1'], 'prerelease', 'patch', '0.0.3'), 'v0.0.4-pre.2');
  assert.equal(next(['v0.0.3', 'v0.0.4-pre.2'], 'release', 'minor', '0.0.3'), 'v0.1.0');
});

test('a version already moved ahead in package.json is the next release', () => {
  assert.equal(next(['v0.0.3'], 'release', 'patch', '0.1.0'), 'v0.1.0');
  assert.equal(next(['v0.0.3'], 'prerelease', 'patch', '0.1.0'), 'v0.1.0-pre.1');
  assert.equal(next(['v0.0.3'], 'release', 'patch', '0.0.3'), 'v0.0.4');
  assert.equal(next(['v0.0.3'], 'release', 'patch', '0.0.2'), 'v0.0.4', 'a version behind the last release is ignored');
});

test('a malformed version or an unknown choice is refused, not guessed', () => {
  for (const bad of ['1.0', 'v1.0.0', '1.0.0-beta', '', '1.0.0; rm -rf /', 'latest']) assert.throws(() => next([], 'release', 'patch', bad), /not number\.number\.number/, bad);
  assert.throws(() => next([], 'pre-release'), /unknown kind/);
  assert.throws(() => next([], 'release', 'huge'), /unknown bump/);
});
