import type { ComponentProps } from 'react';
import { cx } from '../cx';
import { renderIcon } from '../Icon';
import type { IconInput } from '../types';

export type ChipProps = { pressed: boolean; icon?: IconInput } & Omit<ComponentProps<'button'>, 'aria-pressed'>;

/** One of several choices that can be on together. Put the chips of a set in a `Row` with `role="group"` and a label. */
export function Chip({ pressed, icon, className, children, type, ...rest }: ChipProps) {
  return (
    <button type={type ?? 'button'} className={cx('pb-chip', className)} aria-pressed={pressed} {...rest}>
      {renderIcon(icon, 'sm')}
      {children}
    </button>
  );
}
