import type { ComponentProps } from 'react';
import { cx } from '../cx';
import { renderIcon } from '../Icon';
import type { IconInput, LinkAs } from '../types';

export type ButtonProps = {
  variant?: 'secondary' | 'primary' | 'ghost' | 'danger';
  size?: 'small';
  /** Takes the full width of its container. */
  block?: boolean;
  /** Shows a spinner and ignores taps while an action is running. */
  loading?: boolean;
  icon?: IconInput;
  /** With `href` the button is a link, drawn with `as` (a plain `<a>` by default). */
  href?: string;
  as?: LinkAs;
} & ComponentProps<'button'>;

export function Button({ variant = 'secondary', size, block, loading, icon, href, as, className, children, type, ...rest }: ButtonProps) {
  const classes = cx('pb-btn', variant !== 'secondary' && `pb-btn--${variant}`, size && `pb-btn--${size}`, block && 'pb-btn--block', className);
  const busy = loading ? true : undefined;
  if (href !== undefined) {
    const Link = as ?? 'a';
    return (
      <Link href={href} className={classes} aria-busy={busy} {...(rest as object)}>
        {renderIcon(icon)}
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? 'button'} className={classes} aria-busy={busy} {...rest}>
      {renderIcon(icon)}
      {children}
    </button>
  );
}
