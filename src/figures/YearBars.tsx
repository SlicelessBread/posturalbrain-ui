import type { ReactNode } from 'react';
import { cx } from '../cx';
import { fraction } from '../fraction';
import type { StyleWithVars } from '../types';

export type YearBar = {
  /** The letter under the bar. */
  label: string;
  /** The amount as a number; a loss or a missing value draws no bar. */
  value: number;
  /** What a screen reader reads for this bar: the month and its amount ("Marzo 4.000,00 €"). */
  description: string;
  state?: 'current' | 'future';
};

type YearBarsProps = {
  title: ReactNode;
  /** The total of the period, already formatted. */
  total?: ReactNode;
  bars: YearBar[];
  /** The amount a full-height bar stands for. By default the highest value. */
  max?: number;
  className?: string;
};

/** A year at a glance, one bar per month. The amounts are read, not printed: keep the exact figures elsewhere on the screen. */
export function YearBars({ title, total, bars, max, className }: YearBarsProps) {
  const top = max ?? Math.max(0, ...bars.map((bar) => (Number.isFinite(bar.value) ? bar.value : 0)));
  return (
    <figure className={cx('pb-bars', className)}>
      <figcaption className="pb-row pb-row--between">
        <span className="text-body-strong">{title}</span>
        {total ? <span className="text-label pb-muted pb-num">{total}</span> : null}
      </figcaption>
      <ol className="pb-bars__plot">
        {bars.map((bar, index) => {
          const style: StyleWithVars = { '--value': fraction(bar.value, top) };
          return (
            <li key={index} className={cx('pb-bars__col', bar.state && `pb-bars__col--${bar.state}`)}>
              <span className="pb-bars__bar" style={style} />
              <span className="pb-bars__label">{bar.label}</span>
              <span className="pb-sr-only">{bar.description}</span>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
