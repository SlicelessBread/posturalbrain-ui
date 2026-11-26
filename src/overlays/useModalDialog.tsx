'use client';

import { useEffect, useRef, useState, type MouseEvent, type ReactNode, type SyntheticEvent } from 'react';
import { createPortal } from 'react-dom';
import { settle } from '../motion/settle';

type Options = {
  open: boolean;
  /** false: the dialog is drawn in place with the `open` attribute (documentation, tests). */
  modal: boolean;
  /** The person closed the dialog (Esc, back gesture, a tap outside, its own close button). */
  onDismiss: () => void;
  /** A tap outside closes the dialog. */
  lightDismiss: boolean;
};

/** Who asked for the exit that is running: the app (`open` became false) or the person. */
type Closing = 'app' | 'person' | null;

/**
 * Drives a <dialog> from an `open` prop: showModal/close, the veil behind it, the exit animation, and
 * one `onDismiss` call per close made by the person (none when the app itself sets `open` to false).
 *
 * Closing takes two steps: `data-closing` goes on the dialog and on the veil, the stylesheet animates
 * them out, and the dialog is really closed when that has ended. `onDismiss` is called then.
 */
export function useModalDialog({ open, modal, onDismiss, lightDismiss }: Options) {
  const ref = useRef<HTMLDialogElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  // Whether the modal dialog is really showing: it stays so during its exit, and the browser can close it on its own.
  const [showing, setShowing] = useState(false);
  const [closing, setClosing] = useState<Closing>(null);

  // `showing` is a dependency on purpose: when the person dismisses the dialog and the app keeps
  // `open` true (it vetoed the close), the dialog is shown again instead of staying closed for good.
  useEffect(() => {
    const dialog = ref.current;
    if (!modal || !dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      setShowing(true);
    } else if (open && closing === 'app') {
      // Opened again while it was on its way out: it stays.
      setClosing(null);
    } else if (!open && dialog.open && !closing) {
      setClosing('app');
    }
  }, [open, modal, showing, closing]);

  useEffect(() => {
    const dialog = ref.current;
    if (!closing || !dialog) return;
    let cancelled = false;
    void Promise.all([settle(dialog), veilRef.current ? settle(veilRef.current) : null]).then(() => {
      if (!cancelled && dialog.open) dialog.close();
    });
    return () => {
      cancelled = true;
    };
  }, [closing]);

  function onClose() {
    // A close event can arrive after the dialog was opened again: trust the element, not the event.
    setShowing(ref.current?.open ?? false);
    setClosing(null);
    // No exit was running when the browser closed it by itself (a back gesture it does not let pages hold back).
    if (closing !== 'app') onDismiss();
  }

  // Esc, the back gesture and a tap outside (closedby="any") ask first: hold the close back and animate it.
  function onCancel(event: SyntheticEvent<HTMLDialogElement>) {
    if (!modal) return;
    event.preventDefault();
    if (!closing) setClosing('person');
  }

  function onClick(event: MouseEvent<HTMLDialogElement>) {
    // Where closedby="any" is not supported: a click on the dialog element itself, outside its box, is on the backdrop.
    if (!modal || !lightDismiss || closing || 'closedBy' in HTMLDialogElement.prototype) return;
    if (event.target !== event.currentTarget) return;
    const box = event.currentTarget.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) setClosing('person');
  }

  // The veil is a plain element, because ::backdrop cannot read the theme variables on older iOS.
  // Behind a modal dialog it goes on <body>: an ancestor with a transform or a blur would confine it.
  const marker = closing ? '' : undefined;
  const backdrop = <div ref={veilRef} className="pb-sheet-backdrop" data-closing={marker} />;
  let veil: ReactNode = null;
  if (modal && showing) veil = createPortal(backdrop, document.body);
  else if (!modal && open) veil = backdrop;

  const dialogProps = {
    ref,
    onClose,
    onCancel,
    onClick,
    open: modal ? undefined : open,
    'data-closing': marker,
    // Spread, so that it also compiles against React types that do not know `closedby` yet.
    ...(lightDismiss ? { closedby: 'any' as const } : {}),
  };
  // For the dialog's own buttons: over the page the exit starts and the close is reported at its end; in place the app is told directly.
  const close = () => {
    if (!modal) onDismiss();
    else if (!closing) setClosing('person');
  };
  /** Whether the content is drawn: also during the exit, after the app has set `open` to false. */
  const rendered = open || (modal && showing);
  return { veil, dialogProps, close, rendered };
}
