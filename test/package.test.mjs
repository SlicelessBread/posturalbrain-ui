import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { buildPackageFiles } from '../scripts/build-package.mjs';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

test('the generated files are up to date with tokens.json, bundle.css and the icons', () => {
  for (const [file, text] of Object.entries(buildPackageFiles())) {
    assert.equal(fs.readFileSync(file, 'utf8'), text, `${file}: run npm run build:package`);
  }
});

test('styles.css is the token variables of both themes followed by the page stylesheet, unchanged', () => {
  const styles = fs.readFileSync('styles.css', 'utf8');
  const bundle = fs.readFileSync('design-system/project/components/bundle.css', 'utf8');
  assert.ok(styles.endsWith(bundle), 'the component styles differ from the published bundle.css');
  const tokens = JSON.parse(fs.readFileSync('design-system/project/tokens.json', 'utf8'));
  for (const theme of tokens.color.themes) assert.match(styles, new RegExp(`\\[data-theme="${theme.id}"\\]`));
  for (const token of tokens.color.tokens) assert.match(styles, new RegExp(`--${token.name}:`), token.name);
});

test('the archive holds the source, the stylesheet and the tokens, and nothing from the workshop', () => {
  const [{ files }] = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }));
  const paths = files.map((f) => f.path);
  for (const needed of ['package.json', 'styles.css', 'src/index.ts', 'src/icons.generated.ts', 'design-system/project/tokens.json']) {
    assert.ok(paths.includes(needed), `missing from the archive: ${needed}`);
  }
  const stray = paths.filter((p) => /^(examples?|test|scripts|\.render|\.github)\//.test(p) || p === 'CLAUDE.md' || /^design-system\/(previews|project\/components)\//.test(p));
  assert.deepEqual(stray, []);
});

test('installing the package runs nothing and needs only React', () => {
  for (const script of ['prepare', 'preinstall', 'install', 'postinstall', 'prepack', 'build']) {
    assert.equal(pkg.scripts?.[script], undefined, `script "${script}" would make a git install build the package`);
  }
  assert.equal(pkg.dependencies, undefined);
  assert.deepEqual(Object.keys(pkg.peerDependencies).sort(), ['react', 'react-dom']);
  for (const target of Object.values(pkg.exports)) assert.ok(fs.existsSync(target), `exports points at a missing file: ${target}`);
});

test('source files import each other without extensions and re-export by name', () => {
  const files = fs.readdirSync('src', { recursive: true }).filter((f) => /\.tsx?$/.test(f));
  for (const file of files) {
    const text = fs.readFileSync(`src/${file}`, 'utf8');
    assert.doesNotMatch(text, /from '\.{1,2}\/[^']*\.(ts|tsx|js)'/, `${file}: relative imports carry no extension`);
    assert.doesNotMatch(text, /from '@\//, `${file}: no path aliases, they resolve inside the consuming app`);
  }
  const index = fs.readFileSync('src/index.ts', 'utf8');
  assert.doesNotMatch(index, /export \*/);
  assert.doesNotMatch(index, /^\s*['"]use client['"]/m, 'the entry point must not be a client module');
});

test('a file without "use client" stays usable from a Server Component', () => {
  const files = fs.readdirSync('src', { recursive: true }).filter((f) => /\.tsx?$/.test(f) && !/\.generated\.ts$/.test(f));
  for (const file of files) {
    const text = fs.readFileSync(`src/${file}`, 'utf8');
    if (/^\s*['"]use client['"]/.test(text)) continue;
    assert.doesNotMatch(text, /\buse(State|Effect|LayoutEffect|Ref|Reducer|SyncExternalStore|Transition|Optimistic)\s*\(/, `${file}: hooks with state or effects need "use client"`);
    assert.doesNotMatch(text, /\bon[A-Z]\w*=\{\s*(async\s*)?(\(|function\b)/, `${file}: creates an event handler; pass handlers through or add "use client"`);
  }
});

test('the release workflow runs only on main, writes only contents, and takes nothing from the event inline', () => {
  const workflow = fs.readFileSync('.github/workflows/release.yml', 'utf8');
  // Never on pull requests: it would run with write access on code nobody has merged.
  assert.doesNotMatch(workflow, /pull_request/);
  // Only on request: nothing is tagged by a merge.
  const triggers = /^on:\n((?:  .*\n)+)/m.exec(workflow)[1];
  assert.deepEqual([...triggers.matchAll(/^  (\w+):/gm)].map((m) => m[1]), ['workflow_dispatch']);
  assert.match(workflow, /^permissions:\n  contents: write\n\n/m);
  assert.equal(workflow.match(/^permissions:/gm).length, 1);
  assert.match(workflow, /^    if: github\.ref == 'refs\/heads\/main'$/m);
  // An expression is allowed in `if:` and in an environment variable, never inside a script.
  for (const line of workflow.split('\n').filter((l) => l.includes('${{'))) assert.match(line, /^\s*(if|[A-Z_]+):\s/, `expression inline in a command: ${line.trim()}`);
  // Third-party actions are pinned to a version.
  for (const [, action] of workflow.matchAll(/uses:\s*(\S+)/g)) assert.match(action, /^actions\/[a-z-]+@v\d+$/, action);
});
