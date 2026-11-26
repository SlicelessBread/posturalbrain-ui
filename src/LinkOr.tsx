import type { ReactNode } from 'react';
import type { LinkAs } from './types';

type LinkOrProps = {
  /** With `href` this is a link, drawn with `as` (a plain `<a>` by default). */
  href?: string;
  as?: LinkAs;
  /** What it is when it goes nowhere. */
  element?: 'div' | 'section';
  className?: string;
  children?: ReactNode;
};

/** Internal: a link when there is somewhere to go, a plain element otherwise. */
export function LinkOr({ as: Link = 'a', element: Element = 'div', href, ...rest }: LinkOrProps) {
  return href !== undefined ? <Link {...rest} href={href} /> : <Element {...rest} />;
}
