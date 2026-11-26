'use client';

import type { ReactNode } from 'react';
import { cx } from '../cx';
import type { EventKind } from './events';
import { EventTag } from './EventTag';

export type WeekDay = {
  id: string;
  /** Short name of the day ("Lun"). */
  weekday: string;
  /** Day of the month. */
  day: ReactNode;
  /** The whole day for assistive technology: date, whether it is today, how many events. */
  label: string;
  today?: boolean;
  events?: { kind: EventKind; text: string }[];
};

type WeekColumnsProps = {
  /** Seven days, Monday first. */
  days: WeekDay[];
  /** `id` of the day whose detail is shown below. */
  selected?: string;
  onSelect?: (id: string) => void;
  className?: string;
};

/** A week as seven columns with the events stacked in each. Show the chosen day's events under it with a `DayList`. */
export function WeekColumns({ days, selected, onSelect, className }: WeekColumnsProps) {
  return (
    <div className={cx('pb-week', className)}>
      <div className="pb-week__grid">
        {days.map((day) => (
          <button key={day.id} type="button" className={cx('pb-week__day', day.today && 'pb-week__day--today')} aria-pressed={day.id === selected} aria-label={day.label} onClick={() => onSelect?.(day.id)}>
            <span className="pb-week__dow">{day.weekday}</span>
            <span className="pb-week__num">{day.day}</span>
            {day.events?.map((event, index) => <EventTag key={index} kind={event.kind}>{event.text}</EventTag>)}
          </button>
        ))}
      </div>
    </div>
  );
}
