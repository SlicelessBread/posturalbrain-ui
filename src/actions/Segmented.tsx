'use client';

import type { ReactNode } from 'react';
import { cx } from '../cx';

export type SegmentedProps<T extends string> = {
  options: { value: T; label: ReactNode }[];
  value: T;
  onChange?: (value: T) => void;
  /** Name of the group for assistive technology; or `labelledBy` with the id of a visible label. */
  label?: string;
  labelledBy?: string;
  className?: string;
};

/** One choice among two or three, all visible at once. */
export function Segmented<T extends string>({ options, value, onChange, label, labelledBy, className }: SegmentedProps<T>) {
  return (
    <div className={cx('pb-segmented', className)} role="group" aria-label={label} aria-labelledby={labelledBy}>
      {options.map((option) => (
        <button key={option.value} type="button" aria-pressed={option.value === value} data-value={option.value} onClick={() => onChange?.(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  );
}
