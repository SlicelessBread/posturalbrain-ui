import { cx } from '../cx';

/** Initials in a disc. Decorative: the name is always written next to it. */
export function Avatar({ children, size, className }: { children: string; size?: 'lg'; className?: string }) {
  return <span className={cx('pb-avatar', size && `pb-avatar--${size}`, className)} aria-hidden="true">{children}</span>;
}
