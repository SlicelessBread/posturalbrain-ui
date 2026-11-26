'use client';

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Options = {
  open: boolean;
  /** false: the dialog is drawn in place with the `open` attribute (documentation, tests). */
  modal: boolean;
  /** The person closed the dialog (Esc, back gesture, a tap outside, its own close button). */
  onDismiss: () => void;
  /** A tap outside closes the dialog. */
  lightDismiss: boolean;
};

/**
 * Drives a <dialog> from an `open` prop: showModal/close, the veil behind it, and one `onDismiss`
 * call per close made by the person (none when the app itself sets `open` to false).
 */
export function useModalDialog({ open, modal, onDismiss, lightDismiss }: Options) {
  const ref = useRef<HTMLDialogElement>(null);
  const closedByProp = useRef(false);
  // Whether the modal dialog is really showing: Esc closes it before the app updates `open`.
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!modal || !dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      setShowing(true);
    } else if (!open && dialog.open) {
      closedByProp.current = true;
      dialog.close();
    }
  }, [open, modal]);

  function onClose() {
    setShowing(false);
    if (closedByProp.current) closedByProp.current = false;
    else onDismiss();
  }

  function onClick(event: MouseEvent<HTMLDialogElement>) {
    // Where closedby="any" is not supported: a click on the dialog element itself, outside its box, is on the backdrop.
    if (!modal || !lightDismiss || 'closedBy' in HTMLDialogElement.prototype) return;
    if (event.target !== event.currentTarget) return;
    const box = event.currentTarget.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.currentTarget.close();
  }

  // The veil is a plain element, because ::backdrop cannot read the theme variables on older iOS.
  // Behind a modal dialog it goes on <body>: an ancestor with a transform or a blur would confine it.
  const backdrop = <div className="pb-sheet-backdrop" />;
  let veil: ReactNode = null;
  if (modal && showing) veil = createPortal(backdrop, document.body);
  else if (!modal && open) veil = backdrop;

  const dialogProps = {
    ref,
    onClose,
    onClick,
    open: modal ? undefined : open,
    // Spread, so that it also compiles against React types that do not know `closedby` yet.
    ...(lightDismiss ? { closedby: 'any' as const } : {}),
  };
  // For the dialog's own buttons: over the page the browser closes it and reports the close; in place the app is told directly.
  const close = () => (modal ? ref.current?.close() : onDismiss());
  return { veil, dialogProps, close };
}
