import type { ReactNode } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon';

type MoneyFigureProps = {
  label: ReactNode;
  /** The amount, already formatted. */
  value: ReactNode;
  /** The comparison or the note under the amount. */
  delta?: ReactNode;
  /** Colours the comparison and adds the arrow. */
  trend?: 'up' | 'down';
  /** The amount itself is a loss. */
  negative?: boolean;
  className?: string;
};

/** The main amount of a screen with how it compares. */
export function MoneyFigure({ label, value, delta, trend, negative, className }: MoneyFigureProps) {
  return (
    <div className={cx('pb-money', negative && 'pb-money--negative', className)}>
      <span className="pb-money__label text-label">{label}</span>
      <strong className="pb-money__value text-figure-lg pb-num">{value}</strong>
      {delta ? (
        <span className={cx('pb-money__delta', trend && `pb-money__delta--${trend}`, 'text-label')}>
          {trend ? <Icon name={trend === 'up' ? 'trending-up' : 'trending-down'} size="sm" /> : null}
          {delta}
        </span>
      ) : null}
    </div>
  );
}
