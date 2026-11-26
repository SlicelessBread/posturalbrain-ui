import type { ComponentProps } from 'react';
import { cx } from '../cx';

type RowProps = { between?: boolean; nowrap?: boolean; as?: 'div' | 'span' } & ComponentProps<'div'>;

/** Children side by side, wrapping onto more lines unless `nowrap`. */
export function Row({ between, nowrap, as: Tag = 'div', className, ...rest }: RowProps) {
  return <Tag className={cx('pb-row', between && 'pb-row--between', nowrap && 'pb-row--nowrap', className)} {...rest} />;
}
