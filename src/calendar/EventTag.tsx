import type { ReactNode } from 'react';
import { cx } from '../cx';
import { Icon } from '../Icon';
import { EVENT_ICONS, type EventKind } from './events';

/** An event in a few characters (initials, a time), for a calendar column or a legend. */
export function EventTag({ kind, children, className }: { kind: EventKind; children: ReactNode; className?: string }) {
  return (
    <span className={cx('pb-event', 'pb-event--compact', `pb-event--${kind}`, className)}>
      <Icon name={EVENT_ICONS[kind]} size="sm" />
      {children}
    </span>
  );
}
