import { ButtonOrLink, type ButtonOrLinkProps } from '../ButtonOrLink';
import { cx } from '../cx';
import { renderIcon } from '../Icon';
import type { DistributiveOmit, IconInput } from '../types';
import { Dot } from './Dot';

export type IconButtonProps = {
  /** What the button does, for people who do not see the icon. */
  label: string;
  icon: IconInput;
  variant?: 'default' | 'primary' | 'ghost';
  /** Shows the notification dot; say it in `label` too ("Notifiche, 2 non lette"). */
  dot?: boolean;
} & DistributiveOmit<ButtonOrLinkProps, 'children' | 'aria-label'>;

export function IconButton({ label, icon, variant = 'default', dot, className, ...rest }: IconButtonProps) {
  return (
    <ButtonOrLink className={cx('pb-icon-btn', variant !== 'default' && `pb-icon-btn--${variant}`, className)} aria-label={label} {...rest}>
      {renderIcon(icon)}
      {dot ? <Dot /> : null}
    </ButtonOrLink>
  );
}
