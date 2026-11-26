'use client';

import { useEffect, useState, type RefObject } from 'react';
import { settle } from './settle';

/**
 * Keeps something on the page while it animates out. `rendered` stays true after `open` has become
 * false, with `closing` true, until the transitions on the element have ended.
 */
export function usePresence(open: boolean, ref: RefObject<Element | null>) {
  const [rendered, setRendered] = useState(open);
  // Opening needs no effect: it is drawn in this same pass.
  if (open && !rendered) setRendered(true);
  const closing = rendered && !open;

  useEffect(() => {
    if (!closing) return;
    let cancelled = false;
    void settle(ref.current).then(() => {
      if (!cancelled) setRendered(false);
    });
    return () => {
      cancelled = true;
    };
  }, [closing, ref]);

  return { rendered: rendered || open, closing };
}
