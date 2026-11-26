import { cx } from '../cx';

type SpinnerProps = { label?: string; size?: 'lg'; className?: string };

/** Something is loading and there is no measure of how much. The label is read, not shown. */
export function Spinner({ label = 'Caricamento', size, className }: SpinnerProps) {
  return (
    <span className={cx('pb-spinner', size && `pb-spinner--${size}`, className)} role="status">
      <span className="pb-sr-only">{label}</span>
    </span>
  );
}
