import type { ReactNode } from 'react';
import { cx } from '../cx';
import { renderIcon } from '../Icon';
import type { IconName } from '../icons.generated';
import type { IconInput } from '../types';
import type { Tone } from './Badge';

const ICONS: Record<Tone, IconName> = { info: 'info', ok: 'circle-check', warn: 'triangle-alert', danger: 'circle-alert' };

type BannerProps = {
  tone: Tone;
  title: ReactNode;
  /** One or two sentences under the title. */
  children?: ReactNode;
  /** Usually a small `Button`. */
  action?: ReactNode;
  icon?: IconInput;
  className?: string;
};

/** A message that stays in the page until its cause is gone. An error is announced at once (`role="alert"`). */
export function Banner({ tone, title, children, action, icon = ICONS[tone], className }: BannerProps) {
  return (
    <div className={cx('pb-banner', `pb-banner--${tone}`, className)} role={tone === 'danger' ? 'alert' : 'status'}>
      {renderIcon(icon)}
      <div className="pb-banner__body">
        <strong>{title}</strong>
        {children ? <p>{children}</p> : null}
        {action}
      </div>
    </div>
  );
}
