import type { ComponentProps } from 'react';
import type { LinkAs } from './types';

type AsLink = {
  /** With `href` the control is a link, drawn with `as` (a plain `<a>` by default). */
  href: string;
  as?: LinkAs;
} & Omit<ComponentProps<'a'>, 'href'>;

type AsButton = { href?: undefined; as?: undefined } & ComponentProps<'button'>;

export type ButtonOrLinkProps = AsLink | AsButton;

/** Internal: a `<button type="button">`, or a link when it has somewhere to go. */
export function ButtonOrLink(props: ButtonOrLinkProps) {
  if (props.href !== undefined) {
    const { as: Link = 'a', ...rest } = props;
    return <Link {...rest} />;
  }
  const { href: _href, as: _as, type = 'button', ...rest } = props;
  return <button type={type} {...rest} />;
}
