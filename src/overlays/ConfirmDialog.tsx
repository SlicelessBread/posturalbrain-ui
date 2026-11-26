'use client';

import { useId, type ReactNode } from 'react';
import { Button } from '../actions/Button';
import { cx } from '../cx';
import { useHeld } from '../motion/useHeld';
import type { IconInput } from '../types';
import { useModalDialog } from './useModalDialog';

type ConfirmDialogProps = {
  open: boolean;
  /** The person backed out: Esc, the back gesture or the cancel button. Set `open` to false. */
  onCancel: () => void;
  /** The person confirmed. Do the action, then set `open` to false. */
  onConfirm: () => void;
  /** The question, naming what is affected ("Eliminare Paolo Rinaldi?"). */
  title: ReactNode;
  /** What will happen, and whether it can be undone. */
  children: ReactNode;
  /** The verb of the action ("Elimina"), never "OK". */
  confirmLabel: ReactNode;
  cancelLabel?: ReactNode;
  tone?: 'danger' | 'primary';
  confirmIcon?: IconInput;
  /** The action is running: the confirm button shows it and cannot be pressed again. */
  pending?: boolean;
  /** false draws the dialog in place instead of over the page (documentation, tests). */
  modal?: boolean;
  className?: string;
};

/** Asks before an action that cannot be undone. A tap outside does not close it: the person must choose. */
export function ConfirmDialog({ open, onCancel, onConfirm, title, children, confirmLabel, cancelLabel = 'Annulla', tone = 'danger', confirmIcon, pending, modal = true, className }: ConfirmDialogProps) {
  const titleId = useId();
  const textId = useId();
  const { veil, dialogProps, close, rendered } = useModalDialog({ open, modal, onDismiss: onCancel, lightDismiss: false });
  // On its way out the dialog keeps what it showed, even if the app has already cleared it.
  const shown = useHeld({ title, children, confirmLabel, cancelLabel, tone, confirmIcon }, open);
  return (
    <>
      {veil}
      <dialog className={cx('pb-dialog', className)} role="alertdialog" aria-labelledby={titleId} aria-describedby={textId} {...dialogProps}>
        {rendered ? (
          <>
            <h2 id={titleId} className="text-section">{shown.title}</h2>
            <p id={textId} className="pb-muted">{shown.children}</p>
            <div className="pb-dialog__actions">
              {/* First in the dialog, so it takes the focus: the safe choice is the default one. */}
              <Button onClick={close}>{shown.cancelLabel}</Button>
              <Button variant={shown.tone} icon={shown.confirmIcon} loading={pending} onClick={onConfirm}>{shown.confirmLabel}</Button>
            </div>
          </>
        ) : null}
      </dialog>
    </>
  );
}
