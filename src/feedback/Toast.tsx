'use client';

import { useRef, type ReactNode } from 'react';
import { cx } from '../cx';
import { renderIcon } from '../Icon';
import { useHeld } from '../motion/useHeld';
import { usePresence } from '../motion/usePresence';
import type { IconName } from '../icons.generated';
import type { IconInput } from '../types';

type ToastTone = 'ok' | 'danger';

const ICONS: Record<ToastTone, IconName> = { ok: 'circle-check', danger: 'circle-alert' };

type ToastProps = {
  /** false makes the toast fade away and then leave the page. Without it the toast is simply there. */
  open?: boolean;
  tone?: ToastTone;
  /** Defaults to the icon of the tone; a neutral toast has none unless you give one. */
  icon?: IconInput;
  /** Usually a small ghost `Button` ("Riprova"). */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** A short confirmation that floats above the bottom bar. The app shows it and takes it away with `open`; an error stays until dismissed. */
export function Toast({ open = true, ...props }: ToastProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { rendered, closing } = usePresence(open, ref);
  // On its way out the toast keeps the text it showed.
  const shown = useHeld(props, open);
  const { tone, action, children, className } = shown;
  // As a default value would do: only `undefined` falls back to the icon of the tone; `null` means no icon.
  const icon = shown.icon === undefined ? tone && ICONS[tone] : shown.icon;
  if (!rendered) return null;
  return (
    <div ref={ref} className={cx('pb-toast', tone && `pb-toast--${tone}`, className)} role={tone === 'danger' ? 'alert' : 'status'} data-closing={closing ? '' : undefined} inert={closing ? true : undefined}>
      {renderIcon(icon)}
      <span className="pb-toast__text">{children}</span>
      {action}
    </div>
  );
}
