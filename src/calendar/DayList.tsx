import { Children, type ComponentProps, type ReactNode } from 'react';
import { cx } from '../cx';

/** Events grouped by day, one `DayListDay` per day. */
export function DayList({ className, ...rest }: ComponentProps<'div'>) {
  return <div className={cx('pb-daylist', className)} {...rest} />;
}

type DayListDayProps = {
  /** The day, written out ("Lunedì 30 novembre · oggi"). */
  date: ReactNode;
  /** What to say for a day with nothing in it. */
  emptyLabel?: string;
  /** The `EventChip`s of the day. */
  children?: ReactNode;
  className?: string;
};

export function DayListDay({ date, emptyLabel = 'Nessun evento', children, className }: DayListDayProps) {
  return (
    <section className={cx('pb-daylist__day', className)}>
      <h3 className="pb-daylist__date text-caption">{date}</h3>
      {Children.count(children) > 0 ? children : <p className="pb-daylist__empty text-label">{emptyLabel}</p>}
    </section>
  );
}
