import { cx } from '../cx';
import { fraction } from '../fraction';
import type { StyleWithVars } from '../types';

type ProgressProps = {
  /** What is progressing, for assistive technology. */
  label: string;
  /** Leave it out when the amount of work is unknown: the bar then shows activity, not a measure. */
  value?: number;
  max?: number;
  className?: string;
};

export function Progress({ label, value, max = 100, className }: ProgressProps) {
  if (value === undefined) {
    return (
      <div className={cx('pb-progress', 'pb-progress--indeterminate', className)} role="progressbar" aria-label={label}>
        <span />
      </div>
    );
  }
  const filled = fraction(value, max);
  const top = Number.isFinite(max) && max > 0 ? max : 100;
  const style: StyleWithVars = { '--value': filled };
  return (
    <div className={cx('pb-progress', className)} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={top} aria-valuenow={Math.round(filled * top * 100) / 100} style={style}>
      <span />
    </div>
  );
}
