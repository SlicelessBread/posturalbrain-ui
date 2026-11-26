import type { ComponentProps } from 'react';
import { cx } from '../cx';

type StackProps = { gap?: 'tight' | 'loose'; as?: 'div' | 'section' } & ComponentProps<'div'>;

/** Children one under the other with the standard gap. */
export function Stack({ gap, as: Tag = 'div', className, ...rest }: StackProps) {
  return <Tag className={cx('pb-stack', gap && `pb-stack--${gap}`, className)} {...rest} />;
}
