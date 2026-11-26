import { ButtonOrLink, type ButtonOrLinkProps } from '../ButtonOrLink';
import { cx } from '../cx';
import { renderIcon } from '../Icon';
import type { IconInput } from '../types';

export type ButtonProps = {
  variant?: 'secondary' | 'primary' | 'ghost' | 'danger';
  size?: 'small';
  /** Takes the full width of its container. */
  block?: boolean;
  /**
   * An action is running: shows a spinner and cannot be activated again, by tap or by keyboard.
   * (A link is only marked busy: it has no disabled state.)
   */
  loading?: boolean;
  icon?: IconInput;
} & ButtonOrLinkProps;

export function Button({ variant = 'secondary', size, block, loading, icon, className, children, ...rest }: ButtonProps) {
  const shared = {
    className: cx('pb-btn', variant !== 'secondary' && `pb-btn--${variant}`, size && `pb-btn--${size}`, block && 'pb-btn--block', className),
    'aria-busy': loading || undefined,
  };
  const content = (
    <>
      {renderIcon(icon)}
      {children}
    </>
  );
  if (rest.href !== undefined) return <ButtonOrLink {...shared} {...rest}>{content}</ButtonOrLink>;
  return <ButtonOrLink {...shared} {...rest} disabled={loading || rest.disabled}>{content}</ButtonOrLink>;
}
