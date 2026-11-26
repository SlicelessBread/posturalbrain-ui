import type { ReactNode } from 'react';
import { cx } from '../cx';
import { renderIcon } from '../Icon';
import type { IconName } from '../icons.generated';
import type { IconInput } from '../types';

const ICONS: Record<'ok' | 'danger', IconName> = { ok: 'circle-check', danger: 'circle-alert' };

type ToastProps = {
  tone?: 'ok' | 'danger';
  /** Defaults to the icon of the tone; a neutral toast has none unless you give one. */
  icon?: IconInput;
  /** Usually a small ghost `Button` ("Riprova"). */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** A short confirmation that floats above the bottom bar. Show and remove it from the app; an error stays until dismissed. */
export function Toast({ tone, icon = tone && ICONS[tone], action, children, className }: ToastProps) {
  return (
    <div className={cx('pb-toast', tone && `pb-toast--${tone}`, className)} role={tone === 'danger' ? 'alert' : 'status'}>
      {renderIcon(icon)}
      <span className="pb-toast__text">{children}</span>
      {action}
    </div>
  );
}
