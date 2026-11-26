import type { ComponentProps } from 'react';
import { cx } from '../cx';

/** Two columns when each can be at least 150px wide, otherwise one. */
export function Grid2({ className, ...rest }: ComponentProps<'div'>) {
  return <div className={cx('pb-grid-2', className)} {...rest} />;
}
