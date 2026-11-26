# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

posturalbrain-ui is the POSTURALBRAIN design system as an installable package: one stylesheet, design tokens and
React components shared by the practice's apps (Client Manager, SociAll, the video app for clients). The apps are
Next.js 16 / React 19 phone PWAs; they install this repository straight from GitHub at a version tag and compile
its TypeScript source with `transpilePackages`. The repository is **public**: no real names of patients or of the
practice's people, no practice data, no secrets. User-facing text and guides are in Italian; code comments are in
English.

## Commands

```bash
npm run typecheck        # package source and examples
npm test                 # tokens, contrast, structure, render check of every preview, components, theme, release numbering
npm run test:example     # packs the package, installs it into example/, builds it with Next and drives it in Chromium
npm run build:package    # regenerates styles.css, src/icons.generated.ts, src/theme/colors.generated.ts
npm run build:previews   # regenerates the Design System page previews from examples/*.tsx
```

Single test file: `node --import tsx --test test/components.test.mjs` (add `--test-name-pattern "<name>"` for one
test). `npm test` and `npm run test:example` need Playwright with Chromium, which is not a dependency here.
After changing `tokens.json`, `bundle.css` or an icon run `build:package`; after changing a component or an example
run `build:previews`. `npm test` fails when a generated file is stale.

## Architecture

- **Single sources.** Values: `design-system/project/tokens.json`. Component styles:
  `design-system/project/components/bundle.css` (every colour is a variable; no `[data-theme]` selector; real
  `backdrop-filter` only on bars and overlays). `styles.css` at the root is generated: token variables for the
  dark and light themes followed by `bundle.css`. It is the only stylesheet an app imports.
- **Components** (`src/`, entry `src/index.ts`): thin functions that emit the markup the stylesheet expects
  (`pb-…` classes, BEM-like). The entry has no `"use client"` and uses named re-exports only. A file gets
  `"use client"` only if it holds state or creates handlers; a file without it passes handlers through unchanged,
  so it can be rendered from a Server Component (a test enforces this). Links take the app's link component through
  `as` / `linkAs`; the package does not depend on Next. Components never format money or dates.
- **Theme**: `data-theme` on `<html>` (`dark` or `light`), plus `data-theme-choice` (`auto`, `light`, `dark`).
  `ThemeScript` is an inline head script that applies the stored choice before paint and follows the device while
  the choice is auto; `useTheme` reads and changes it. `<html>` is the run-time source of truth.
- **Overlays**: `Sheet` and `ConfirmDialog` are real `<dialog>` elements driven by `useModalDialog` (showModal,
  a veil element instead of `::backdrop`, one dismissal callback per close made by the person).
- **The Design System page** (a Claude artifact, linked in the README) is published from
  `design-system/project/`. Its previews are generated: `examples/<Name>.tsx` rendered to static markup by
  `scripts/build-previews.mjs`. Only the cover is a hand-written fragment. Changing a component therefore changes
  the page: regenerate, then republish the changed files to the page.
- **Example app** (`example/`): a Next 16 app that installs the packed archive the way a real app does. It is the
  only place where the components are hydrated and driven in a browser.

## Releases

Tags are created by `.github/workflows/release.yml`, never by hand; the numbering rules are in
`scripts/release-version.mjs`.

- Every merge into `main` that touches what the package ships (`src/`, `styles.css`, `tokens.json`,
  `package.json`) gets a **pre-release** automatically: `v0.0.2-pre.1`, `v0.0.2-pre.2`, …
- A **release** is made only on request (the workflow's "Run workflow", kind `release`): it raises the number,
  writes it into `package.json` with a commit on `main`, tags it and publishes it.

**Always advise on the release.** At the end of any work that changes what the package ships, tell the owner, in
the pull request (the template has the section) and in the conversation:

1. **whether** a release is worth making now or the automatic pre-release is enough;
2. **which number** to raise (`patch`, `minor`, `major`);
3. **why**, in one or two sentences.

Then wait for the answer: a release is started only after the owner says so. Criteria, while the first number is 0:

| What changed | Raise |
|---|---|
| Fixes that ask nothing of the apps (a defect, an accessible name, a tweak that moves nothing) | `patch` |
| Compatible additions (a new component, an optional prop, an icon, a new token) | `patch` |
| Changes that make the apps edit code, or that visibly change the look (a prop, component, class or token renamed or removed; colour or type values) | `minor` |
| The system is adopted by the three apps and considered stable | `major` (1.0.0) |

Advise a **release**, not only the pre-release, when an app is about to go to production with these changes
(production apps point at releases, never at pre-releases), or when a set of changes is complete and has been seen
working in at least one app. Never advise one while a defect introduced by those changes is known. While a piece of
work is still in progress, the pre-releases are enough.
