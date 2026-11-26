'use client';

import type { ReactNode } from 'react';
import { cx } from '../cx';
import type { EventKind } from './events';

export type MonthCell = {
  id: string;
  /** Day of the month. */
  day: ReactNode;
  /** The whole day for assistive technology: date, whether it is today or chosen, how many events. */
  label: string;
  /** The day belongs to the month before or after. */
  outside?: boolean;
  today?: boolean;
  /** One dot per event, three at most; say the real number in `label`. */
  events?: EventKind[];
};

type MonthGridProps = {
  /** The month, for assistive technology ("Dicembre 2026"). */
  label: string;
  /** Whole weeks, Monday first. */
  cells: MonthCell[];
  weekdays?: string[];
  /** `id` of the chosen day. */
  selected?: string;
  onSelect?: (id: string) => void;
  className?: string;
};

const WEEKDAYS = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];
const MAX_DOTS = 3;

/** A month at a glance: which days have something. Pair it with an `EventLegend`, and show the chosen day in a `DayList`. */
export function MonthGrid({ label, cells, weekdays = WEEKDAYS, selected, onSelect, className }: MonthGridProps) {
  return (
    <div className={cx('pb-month', className)}>
      <div className="pb-month__grid" role="group" aria-label={label}>
        {weekdays.map((weekday, index) => <span key={index} className="pb-month__dow" aria-hidden="true">{weekday}</span>)}
        {cells.map((cell) => (
          <button
            key={cell.id}
            type="button"
            className={cx('pb-month__cell', cell.outside && 'pb-month__cell--out', cell.today && 'pb-month__cell--today')}
            aria-pressed={cell.id === selected}
            aria-label={cell.label}
            onClick={() => onSelect?.(cell.id)}
          >
            <span className="pb-month__num">{cell.day}</span>
            <span className="pb-month__dots" aria-hidden="true">
              {cell.events?.slice(0, MAX_DOTS).map((kind, index) => <i key={index} className={`pb-month__dot pb-month__dot--${kind}`} />)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
