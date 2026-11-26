'use client';

import { useId, type ReactNode } from 'react';
import { IconButton } from '../actions/IconButton';
import { cx } from '../cx';
import { useModalDialog } from './useModalDialog';

type SheetProps = {
  open: boolean;
  /** The person closed the sheet: Esc, the back gesture, a tap outside or the close button. Set `open` to false. */
  onClose: () => void;
  title: ReactNode;
  /** The content; it is drawn only while the sheet is open, so a form starts fresh each time. */
  children: ReactNode;
  /** The buttons that stay at the bottom, usually one primary block `Button`. */
  actions?: ReactNode;
  closeLabel?: string;
  /** false draws the sheet in place instead of over the page (documentation, tests). */
  modal?: boolean;
  className?: string;
};

/** A panel that rises from the bottom for one short task. Focus stays inside it while it is open. */
export function Sheet({ open, onClose, title, children, actions, closeLabel = 'Chiudi', modal = true, className }: SheetProps) {
  const titleId = useId();
  const { veil, dialogProps, close } = useModalDialog({ open, modal, onDismiss: onClose, lightDismiss: true });
  return (
    <>
      {veil}
      <dialog className={cx('pb-sheet', className)} aria-labelledby={titleId} {...dialogProps}>
        {open ? (
          <>
            <span className="pb-sheet__grabber" aria-hidden="true" />
            <header className="pb-sheet__head">
              <h2 id={titleId} className="text-section">{title}</h2>
              <IconButton variant="ghost" icon="x" label={closeLabel} onClick={modal ? close : onClose} />
            </header>
            <div className="pb-sheet__body pb-stack">{children}</div>
            {actions ? <footer className="pb-sheet__actions">{actions}</footer> : null}
          </>
        ) : null}
      </dialog>
    </>
  );
}
