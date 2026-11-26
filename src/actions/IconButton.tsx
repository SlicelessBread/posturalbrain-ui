import type { ComponentProps } from 'react';
import { cx } from '../cx';
import { renderIcon } from '../Icon';
import type { IconInput, LinkAs } from '../types';
import { Dot } from './Dot';

export type IconButtonProps = {
  /** What the button does, for people who do not see the icon. */
  label: string;
  icon: IconInput;
  variant?: 'default' | 'primary' | 'ghost';
  /** Shows the notification dot; say it in `label` too ("Notifiche, 2 non lette"). */
  dot?: boolean;
  /** With `href` the button is a link, drawn with `as` (a plain `<a>` by default). */
  href?: string;
  as?: LinkAs;
} & Omit<ComponentProps<'button'>, 'children' | 'aria-label'>;

export function IconButton({ label, icon, variant = 'default', dot, href, as, className, type, ...rest }: IconButtonProps) {
  const classes = cx('pb-icon-btn', variant !== 'default' && `pb-icon-btn--${variant}`, className);
  const content = (
    <>
      {renderIcon(icon)}
      {dot ? <Dot /> : null}
    </>
  );
  if (href !== undefined) {
    const Link = as ?? 'a';
    return <Link href={href} className={classes} aria-label={label} {...(rest as object)}>{content}</Link>;
  }
  return <button type={type ?? 'button'} className={classes} aria-label={label} {...rest}>{content}</button>;
}
