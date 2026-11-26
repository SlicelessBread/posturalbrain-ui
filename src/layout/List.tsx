import type { ComponentProps } from 'react';
import { cx } from '../cx';

type ListProps = { as?: 'ul' | 'div' } & ComponentProps<'ul'>;

/** A glass panel that separates its rows with hairlines. */
export function List({ as = 'ul', className, ...rest }: ListProps) {
  if (as === 'div') return <div className={cx('pb-list', className)} {...(rest as ComponentProps<'div'>)} />;
  return <ul className={cx('pb-list', className)} {...rest} />;
}
