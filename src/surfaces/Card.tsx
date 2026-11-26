import type { ComponentProps } from 'react';
import { cx } from '../cx';
import type { LinkAs } from '../types';

type CardProps = { /** Lifts the card above the others: one per screen at most. */ raised?: boolean } & (
  | ({ /** With `href` the whole card is a link, drawn with `as`. */ href: string; as?: LinkAs } & Omit<ComponentProps<'a'>, 'href'>)
  | ({ href?: undefined; as?: undefined } & ComponentProps<'section'>)
);

/** A glass panel for one subject. */
export function Card({ raised, className, ...rest }: CardProps) {
  const classes = cx('pb-card', raised && 'pb-card--raised', rest.href !== undefined && 'pb-card--interactive', className);
  if (rest.href !== undefined) {
    const { as: Link = 'a', ...link } = rest;
    return <Link className={classes} {...link} />;
  }
  const { href: _href, as: _as, ...section } = rest;
  return <section className={classes} {...section} />;
}
