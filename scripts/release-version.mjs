// Works out the tag of the next release or pre-release from the tags that already exist.
//
//   v0.0.1 → v0.0.2-pre.1 → v0.0.2-pre.2 → v0.0.2 → v0.0.3-pre.1
//
// A release raises the number. A pre-release prepares the next release and has its own counter,
// which starts again after every release.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const VERSION = /^(\d+)\.(\d+)\.(\d+)$/;
const RELEASE_TAG = /^v(\d+)\.(\d+)\.(\d+)$/;
const KINDS = ['release', 'prerelease'];
const BUMPS = ['patch', 'minor', 'major'];

const numbers = (match) => match.slice(1, 4).map(Number);
const compare = (a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2];

function raise([major, minor, patch], bump) {
  if (bump === 'major') return [major + 1, 0, 0];
  if (bump === 'minor') return [major, minor + 1, 0];
  return [major, minor, patch + 1];
}

/**
 * @param {{ tags: string[], packageVersion: string, kind: 'release' | 'prerelease', bump?: 'patch' | 'minor' | 'major' }} input
 * @returns {string} the tag to create, for example "v0.0.2" or "v0.0.2-pre.1"
 */
export function nextTag({ tags, packageVersion, kind, bump = 'patch' }) {
  if (!KINDS.includes(kind)) throw new Error(`unknown kind "${kind}": use release or prerelease`);
  if (!BUMPS.includes(bump)) throw new Error(`unknown bump "${bump}": use patch, minor or major`);
  const written = VERSION.exec(packageVersion);
  if (!written) throw new Error(`package.json version "${packageVersion}" is not number.number.number`);
  const inPackage = numbers(written);

  const last = tags.map((tag) => RELEASE_TAG.exec(tag)).filter(Boolean).map(numbers).sort(compare).at(-1);
  let next;
  // Nothing released yet, or package.json was already moved ahead by hand: that version is the next release.
  if (!last || compare(inPackage, last) > 0) next = inPackage;
  // A pre-release cannot know how far the release will jump: it prepares the smallest step.
  else next = raise(last, kind === 'release' ? bump : 'patch');

  const release = `v${next.join('.')}`;
  if (kind === 'release') return release;
  const counters = tags.filter((tag) => tag.startsWith(`${release}-pre.`)).map((tag) => Number(tag.slice(release.length + 5))).filter(Number.isInteger);
  return `${release}-pre.${Math.max(0, ...counters) + 1}`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [kind, bump = 'patch'] = process.argv.slice(2);
  const tags = execFileSync('git', ['tag', '--list'], { encoding: 'utf8' }).split('\n').filter(Boolean);
  const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  try {
    console.log(nextTag({ tags, packageVersion: version, kind, bump }));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
