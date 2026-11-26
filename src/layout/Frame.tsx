import type { ComponentProps } from 'react';
import { cx } from '../cx';

/** A screen-shaped box: fixed bars and overlays inside it stay inside it. */
export function Frame({ className, ...rest }: ComponentProps<'div'>) {
  return <div className={cx('pb-frame', className)} {...rest} />;
}
