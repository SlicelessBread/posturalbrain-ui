/** How long an exit is waited for at most: a stuck animation must never keep a panel on screen. */
const LIMIT = 600;

/**
 * Resolves when the animations and transitions running on the elements and inside them have ended.
 * At once when there are none (reduced motion, an old browser) and never later than the limit.
 * Animations that loop, like a spinner, are not waited for.
 */
export function settle(...elements: (Element | null)[]): Promise<void> {
  const running = elements
    .flatMap((element) => element?.getAnimations?.({ subtree: true }) ?? [])
    .filter((animation) => animation.effect?.getComputedTiming().endTime !== Infinity);
  if (running.length === 0) return Promise.resolve();
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, LIMIT);
    void Promise.allSettled(running.map((animation) => animation.finished)).then(() => {
      clearTimeout(timer);
      resolve();
    });
  });
}
