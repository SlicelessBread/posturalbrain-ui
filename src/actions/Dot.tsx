import { cx } from '../cx';

/** A small accent dot: something new is waiting. Its meaning must also be in the label of what it marks. */
export function Dot({ className }: { className?: string }) {
  return <span className={cx('pb-dot', className)} aria-hidden="true" />;
}
