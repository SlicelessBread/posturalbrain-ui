'use client';

import type { KeyboardEvent, ReactNode } from 'react';
import { cx } from '../cx';

export type TabsProps<T extends string> = {
  tabs: { value: T; label: ReactNode }[];
  value: T;
  onChange?: (value: T) => void;
  /** Name of the set of tabs for assistive technology. */
  label: string;
  className?: string;
};

const STEP: Record<string, (index: number, count: number) => number> = {
  ArrowRight: (i, n) => (i + 1) % n,
  ArrowLeft: (i, n) => (i - 1 + n) % n,
  Home: () => 0,
  End: (_, n) => n - 1,
};

/** Views of the same content. Only the chosen tab is in the Tab order; the arrow keys move between tabs. */
export function Tabs<T extends string>({ tabs, value, onChange, label, className }: TabsProps<T>) {
  const chosen = tabs.findIndex((tab) => tab.value === value);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const step = STEP[event.key];
    const next = step && tabs[step(index, tabs.length)];
    if (!next) return;
    event.preventDefault();
    onChange?.(next.value);
    event.currentTarget.parentElement?.querySelectorAll<HTMLElement>('[role="tab"]')[tabs.indexOf(next)]?.focus();
  }

  return (
    <div className={cx('pb-tabs', className)} role="tablist" aria-label={label}>
      {tabs.map((tab, index) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={tab.value === value}
          // When no tab matches `value` the first one stays reachable.
          tabIndex={index === Math.max(chosen, 0) ? 0 : -1}
          onClick={() => onChange?.(tab.value)}
          onKeyDown={(event) => onKeyDown(event, index)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
