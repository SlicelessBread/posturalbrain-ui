'use client';

import { useEffect, useRef } from 'react';

/**
 * While `live`, returns `value`. Afterwards it keeps returning the last live value: the content of
 * something that is on its way out stays as the person last saw it, even if the app has already emptied it.
 */
export function useHeld<T>(value: T, live: boolean): T {
  const last = useRef(value);
  useEffect(() => {
    if (live) last.current = value;
  });
  return live ? value : last.current;
}
