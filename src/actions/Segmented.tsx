'use client';

import type { ComponentProps, ReactNode } from 'react';
import { cx } from '../cx';
import { selectionVars } from '../selection';

export type SegmentedProps<T extends string> = {
  options: { value: T; label: ReactNode }[];
  value: T;
  onChange?: (value: T) => void;
} & Omit<ComponentProps<'div'>, 'onChange' | 'children' | 'role' | 'aria-label' | 'aria-labelledby'> &
  // The group needs a name: either its own, or the id of a visible label.
  ({ label: string; labelledBy?: undefined } | { labelledBy: string; label?: undefined });

/** One choice among two or three, all visible at once. */
export function Segmented<T extends string>({ options, value, onChange, label, labelledBy, className, style, ...rest }: SegmentedProps<T>) {
  const chosen = options.findIndex((option) => option.value === value);
  return (
    <div className={cx('pb-segmented', className)} role="group" aria-label={label} aria-labelledby={labelledBy} style={selectionVars(chosen, options.length, style)} {...rest}>
      {options.map((option) => (
        <button key={option.value} type="button" aria-pressed={option.value === value} data-value={option.value} onClick={() => onChange?.(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  );
}
