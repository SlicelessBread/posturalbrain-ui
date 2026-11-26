import { cx } from '../cx';
import { EVENT_KINDS, EVENT_LABELS, type EventKind } from './events';
import { EventTag } from './EventTag';

type EventLegendProps = {
  /** The kinds this calendar can show, in order. All five by default. */
  kinds?: readonly EventKind[];
  labels?: Partial<Record<EventKind, string>>;
  className?: string;
};

/** Says what each icon and colour of a calendar stands for. */
export function EventLegend({ kinds = EVENT_KINDS, labels, className }: EventLegendProps) {
  return (
    <ul className={cx('pb-legend', className)}>
      {kinds.map((kind) => (
        <li key={kind}><EventTag kind={kind}>{labels?.[kind] ?? EVENT_LABELS[kind]}</EventTag></li>
      ))}
    </ul>
  );
}
