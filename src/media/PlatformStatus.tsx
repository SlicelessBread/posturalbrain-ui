import type { ReactNode } from 'react';
import { cx } from '../cx';
import { Badge, type Tone } from '../feedback/Badge';
import type { IconName } from '../icons.generated';

export type PublishStatus = 'published' | 'processing' | 'pending' | 'failed';

const BADGES: Record<PublishStatus, { tone: Tone | 'neutral'; icon?: IconName; label: string }> = {
  published: { tone: 'ok', icon: 'check', label: 'Pubblicato' },
  processing: { tone: 'warn', icon: 'clock', label: 'In pubblicazione' },
  pending: { tone: 'neutral', label: 'In coda' },
  failed: { tone: 'danger', icon: 'circle-alert', label: 'Non riuscito' },
};

type PlatformStatusProps = {
  /** Two letters that stand for the platform ("YT"). */
  mark: string;
  name: ReactNode;
  status: PublishStatus;
  /** When it went out, or why it did not. */
  detail?: ReactNode;
  /** Usually a small `Button` ("Riprova"). */
  action?: ReactNode;
  /** Replaces the word of the status. */
  statusLabel?: string;
  className?: string;
};

/** How a post is doing on one platform. One row of a `List`: it draws its own `<li>`. */
export function PlatformStatus({ mark, name, status, detail, action, statusLabel, className }: PlatformStatusProps) {
  const badge = BADGES[status];
  return (
    <li className={cx('pb-platform', `pb-platform--${status}`, className)}>
      <span className="pb-platform__mark" aria-hidden="true">{mark}</span>
      <span className="pb-platform__body">
        <span className="pb-platform__head">
          <span className="text-body-strong">{name}</span>
          <Badge tone={badge.tone} icon={badge.icon}>{statusLabel ?? badge.label}</Badge>
        </span>
        {detail ? <span className="text-label pb-muted">{detail}</span> : null}
        {action ? <span className="pb-platform__action">{action}</span> : null}
      </span>
    </li>
  );
}
