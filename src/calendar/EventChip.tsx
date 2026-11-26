import type { ReactNode } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon';
import { LinkOr } from '../LinkOr';
import type { LinkAs } from '../types';
import { EVENT_ICONS, type EventKind } from './events';

type EventChipProps = {
  kind: EventKind;
  title: ReactNode;
  meta?: ReactNode;
  /** The meta line holds figures: line them up with tabular digits. */
  numeric?: boolean;
  /** A `Badge` at the end of the row. */
  badge?: ReactNode;
  /** With `href` the whole row is a link, drawn with `as`. */
  href?: string;
  as?: LinkAs;
  className?: string;
};

/** One event written out: what it is and the detail that matters. */
export function EventChip({ kind, title, meta, numeric, badge, href, as, className }: EventChipProps) {
  return (
    <LinkOr className={cx('pb-event', `pb-event--${kind}`, className)} href={href} as={as}>
      <span className="pb-event__icon" aria-hidden="true"><Icon name={EVENT_ICONS[kind]} size="sm" /></span>
      <span className="pb-event__body">
        <span className="pb-event__title text-body-strong">{title}</span>
        {meta ? <span className={cx('pb-event__meta', 'text-label', numeric && 'pb-num')}>{meta}</span> : null}
      </span>
      {badge}
    </LinkOr>
  );
}
