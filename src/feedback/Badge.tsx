import type { ComponentProps } from 'react';
import { cx } from '../cx';
import { renderIcon } from '../Icon';
import type { IconInput } from '../types';

export type Tone = 'ok' | 'warn' | 'danger' | 'info';
type BadgeProps = { tone?: Tone | 'neutral'; icon?: IconInput } & ComponentProps<'span'>;

/** A short status word. The colour repeats what the word and the icon already say. */
export function Badge({ tone = 'neutral', icon, className, children, ...rest }: BadgeProps) {
  return (
    <span className={cx('pb-badge', `pb-badge--${tone}`, className)} {...rest}>
      {renderIcon(icon, 'sm')}
      {children}
    </span>
  );
}
