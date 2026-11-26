// Shared by the browser tests. Not a test file: the `test/*.test.mjs` pattern leaves it out.

/** Resolves in the page when every animation that can end has ended. A spinner never does: it is not waited for. */
export const settled = (page) => page.evaluate(() => Promise.all(document.getAnimations().filter((a) => a.effect.getComputedTiming().endTime !== Infinity).map((a) => a.finished.catch(() => {}))).then(() => {}));
