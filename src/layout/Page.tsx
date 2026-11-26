import type { ComponentProps } from 'react';
import { cx } from '../cx';

/** The scrolling content of a screen: side margins and room for the bottom bar. */
export function Page({ className, ...rest }: ComponentProps<'main'>) {
  return <main className={cx('pb-page', className)} {...rest} />;
}
